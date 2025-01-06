---
type: project
project: {{value:project-id}}
context: {{field:context}}
dates:
  created: {{date}}
  start:
  completed: 
  deadline: {{vdate:deadline, YYYY-MM-DD}}
status: not-started # Options: not-started, active, on-hold, completed
tags: []
---
# {{value:title}}

> [!goal]
> {{value:Goal}}

```dataviewjs

const projectId = dv.current().project;

// Fetch all tasks linked to this project
const tasks = dv.pages('"Tasks/Open"').where(t => t.project === projectId);

// Calculate task statistics
const totalTasks = tasks.length || 1; // Avoid division by 0
const completedTasks = tasks.filter(t => t["task-status"] === "completed").length;
const pendingTasks = totalTasks - completedTasks;
const progressPercent = Math.round((completedTasks / totalTasks) * 100);

// Fetch project dates
const startDate = dv.current().dates.start ? new Date(dv.current().dates.start) : null;
const deadline = dv.current().dates.deadline ? new Date(dv.current().dates.deadline) : null;
const today = new Date();

// Time progress calculations
let elapsedDays = 0;
let timeProgressPercent = 0;
if (startDate) {
    elapsedDays = Math.round((today - startDate) / (1000 * 60 * 60 * 24));
}
if (startDate && deadline) {
    const elapsedTime = today - startDate;
    const totalTime = deadline - startDate;
    timeProgressPercent = totalTime > 0 ? Math.min(Math.round((elapsedTime / totalTime) * 100), 100) : 0;
}

// Create container for two columns
const container = dv.el("div", "", { cls: "custom-two-column-layout" });

// Reusable function to render progress bars
async function createProgressBar(container, label, value, max) {
    const progressBarContainer = container.createEl("div", { cls: "custom-progress-bar-container" });

    // Progress bar element
    const bar = progressBarContainer.createEl("progress");
    Object.assign(bar, { max, value }); // Ensure proper rendering of progress bar

    // Label and numeric text below the bar
    const labelContainer = progressBarContainer.createEl("div", { cls: "custom-progress-label-container" });
    labelContainer.createEl("div", { text: label, cls: "custom-progress-label" });
    labelContainer.createEl("div", { text: `${value}%`, cls: "custom-progress-value" });
}

// Left column: Progress bars
const progressContainer = container.createEl("div", { cls: "custom-progress-container" });
progressContainer.createEl("h3", { text: "Progress" });

// Tasks progress bar
await createProgressBar(progressContainer, "Tasks Completed", progressPercent, 100);

// Time progress bar
if (startDate && deadline) {
    await createProgressBar(progressContainer, "Time Progress", timeProgressPercent, 100);
} else {
    progressContainer.createEl("div", { text: "No time data available", cls: "custom-no-time-data" });
}

// Right column: Statistics
const statsContainer = container.createEl("div", { cls: "custom-stats-container" });
statsContainer.createEl("h3", { text: "Statistics" });

// Create rows for statistics
const upperRow = statsContainer.createEl("div", { cls: "custom-stats-row" });
const lowerRow = statsContainer.createEl("div", { cls: "custom-stats-row" });

// Upper row: Task-related statistics
const taskStats = [
    { label: "Pending Tasks", value: pendingTasks },
    { label: "Completed Tasks", value: completedTasks },
    { label: "Total Tasks", value: totalTasks },
];
taskStats.forEach(stat => {
    const statBlock = upperRow.createEl("div", { cls: "custom-stat-block" });
    statBlock.createEl("small", { text: stat.label });
    statBlock.createEl("h4", { text: stat.value });
});

// Lower row: Time-related statistics
const timeStats = [
    { label: "Elapsed Days", value: elapsedDays || "N/A" },
    {
        label: "Deadline",
        value: deadline
            ? deadline.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            : "N/A"
    },
];
timeStats.forEach(stat => {
    const statBlock = lowerRow.createEl("div", { cls: "custom-stat-block" });
    statBlock.createEl("small", { text: stat.label });
    statBlock.createEl("h4", { text: stat.value });
});

```

## Deliverables

| Deliverable | Status | Location |
| ----------- | ------ | -------- |
|             |        |          |

## Related Zettelkasten Notes
-

## Tasks

```dataviewjs

const projectId = dv.current().project;

// Fetch all tasks linked to this project
const tasks = dv.pages('"Tasks"').where(t => t.project === projectId);

// Define the desired column order
const columnOrder = ["backlog", "in-progress", "completed"];

// Group tasks by `task-status` and sort by last modified time (latest first), handling empty lists
const groupedTasks = columnOrder.map(status => ({
    key: status,
    rows: tasks
        .filter(t => t["task-status"] === status)
        .sort((a, b) => {
            if (!a.file || !b.file) return 0; // Skip sorting if file metadata is missing
            const mtimeA = a.file.mtime ?? new Date(0); // Default to epoch time if undefined
            const mtimeB = b.file.mtime ?? new Date(0); // Default to epoch time if undefined
            return mtimeB - mtimeA; // Sort descending
        }),
}));

// Render the Kanban dynamically
const kanbanContainer = dv.el("div", "", { cls: "dynamic-kanban" });

// Iterate over grouped tasks to create columns in the specified order
groupedTasks.forEach(group => {
    const column = kanbanContainer.createEl("div", { cls: "custom-kanban-column" });

    // Column Header
    column.createEl("h3", { text: group.key.replace("-", " ") });

    // Task List
    const taskList = column.createEl("ul", { cls: "custom-kanban-task-list" });

    if (group.rows.length === 0) {
        // Handle empty columns
        const emptyMessage = taskList.createEl("li", { cls: "custom-kanban-empty" });
        emptyMessage.textContent = "No tasks";
        return;
    }

    group.rows.forEach(task => {
        const taskItem = taskList.createEl("li", { cls: "custom-kanban-task" });

        // Create an anchor element with the internal-link class
        const taskLink = taskItem.createEl("a", {
            href: task.file.path,
            text: task.file.name,
            cls: "internal-link"
        });

        // Optional Metadata (e.g., deadline)
        if (task.deadline) {
            const deadlineDate = new Date(task.deadline);
            const isValidDate = !isNaN(deadlineDate.getTime());
            taskItem.createEl("span", {
                text: `Deadline: ${
                    isValidDate
                        ? deadlineDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                          })
                        : "No deadline"
                }`,
                cls: "custom-kanban-task-deadline",
            });
        }
    });
});

```
