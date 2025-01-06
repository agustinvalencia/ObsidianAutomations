---
type: task
project: {{field:project}}
context: {{field:context}}
link: {{value:link}}
task-status: backlog # options: backlog, in-progress, completed
time-estimation:
time-spent:
dates:
  created: {{date}}
  started:
  deadline: {{vdate:deadline, YYYY-MM-DD}}
  completed:
tags: []
---
# {{value:taskName}}

> [!goal] Goal
> {{value:Goal}}

```dataviewjs
const subtasks = dv.current().file.tasks; // Get subtasks from the file
const totalSubtasks = subtasks.length || 1; // Avoid division by zero
const completedSubtasks = subtasks.filter(t => t.completed).length;
const progressPercent = Math.round((completedSubtasks / totalSubtasks) * 100);

// Task progress bar
const container = dv.el("div", "", { cls: "custom-task-progress-container" });

// Add parent project link
const parentProjectId = dv.current().project;// Get parent project from metadata
const parentProject = dv.pages('"Projects"').where(p => p.project === parentProjectId)
if (parentProject) {
    const projectLinkContainer = container.createEl("div", { cls: "custom-task-project-link" });
    projectLinkContainer.createEl("span", { text: "Project: " });
    projectLinkContainer.createEl("a", {
        text: String(parentProject.file.name).replace("[","").replace("]",""),
        href: String(parentProject.file.path).replace("[","").replace("]",""),
        cls: "internal-link"
    });
}

// Add label and Task Progress Bar
const taskProgressContainer = container.createEl("div", { cls: "custom-task-progress-item" });
taskProgressContainer.createEl("div", {
    text: "Progress",
    cls: "custom-task-progress-label"
});
const taskProgressBar = taskProgressContainer.createEl("progress", {
    cls: "custom-task-progress-bar"
});
Object.assign(taskProgressBar, { max: 100, value: progressPercent });
taskProgressContainer.createEl("div", {
    text: `${progressPercent}%`,
    cls: "custom-task-progress-percentage"
});

// Time progress bar
const creationDate = dv.current().dates.created ? new Date(dv.current().created) : null;
const deadline = dv.current().dates.deadline ? new Date(dv.current().deadline) : null;
let timeProgressPercent = 0;

if (creationDate && deadline) {
    const totalTime = deadline - creationDate;
    const elapsedTime = new Date() - creationDate;
    timeProgressPercent = totalTime > 0 ? Math.min(Math.round((elapsedTime / totalTime) * 100), 100) : 0;

    // Add label and Time Progress Bar
    const timeProgressContainer = container.createEl("div", { cls: "custom-task-progress-item" });
    timeProgressContainer.createEl("div", {
        text: "To the deadline",
        cls: "custom-task-progress-label"
    });
    const timeProgressBar = timeProgressContainer.createEl("progress", {
        cls: "custom-task-progress-bar"
    });
    Object.assign(timeProgressBar, { max: 100, value: timeProgressPercent });
    timeProgressContainer.createEl("div", {
        text: `${timeProgressPercent}%`,
        cls: "custom-task-progress-percentage"
    });
} else {
    container.createEl("div", {
        text: "No deadline",
        cls: "custom-task-progress-no-deadline"
    });
}

// Button for the link (if present)
const link = dv.current().link;
if (link && String(link).startsWith("http")) {
    const button = container.createEl("button", { text: "Open Link", cls: "custom-task-progress-button" });
    button.addEventListener("click", () => window.open(link, "_blank"));
}
```

## Subtasks

- [ ]

## Progress notes

## Logs
