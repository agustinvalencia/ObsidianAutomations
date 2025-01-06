---
type: weekly
date: <% tp.date.now()%>
week: <% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-[W]ww") %>
---
# {{title}}

## Plan
```dataviewjs
const notes = dv.pages('"Tasks" | "Projects" | "Zettelkasten"')
				.where(n => n['task-status'] !== 'completed' && n.dates.deadline)
				.map(n => {
					return {
						"name": n.file.link,
						"dates": n.dates,
						"type": n.type,
						"tags": n.tags, 
						"context": n.context
					}
				})
const thisWeekNotes = notes
	.filter( n => n.dates.deadline?.toFormat("yyyy-'W'WW") === dv.current().week)
	.sort(n => n.dates.deadline)

dv.table(
	['Name', 'Deadline', 'Type', 'Tags', 'Context'],
	thisWeekNotes.map( n => [
			n.name,
			n.dates.deadline.toFormat('dd-MMM'),
			n.type,
			n.tags, 
			n.context
		]))
```

## Closed this week
```dataviewjs
const notes = dv.pages('"Tasks"')
				.where(n => n['task-status'] === 'completed')
				.map(n => {
					return {
						"name": n.file.link,
						"dates": n.dates,
						"type": n.type,
						"tags": n.tags
					}
				})
const thisWeekNotes = notes
	.filter( n => n.dates.deadline?.toFormat("yyyy-'W'WW") === dv.current().week)
	.sort(n => n.dates.completed)

dv.table([
		'Name',
		'Created',
		'Deadline',
		'Completed'
	],
	thisWeekNotes.map( n => [
			n.name,
			n.dates.created?.toFormat('dd-MMM'),
			n.dates.deadline?.toFormat('dd-MMM'),
			n.dates.completed?.toFormat('dd-MMM'),
		]))
```

## Created this week
```dataviewjs
const notes = dv.pages('"Tasks" | "Projects" | "Zettelkasten"')
				.where(n => n.dates.created)
				.map(n => {
					return {
						"name": n.file.link,
						"dates": n.dates,
						"type": n.type,
						"tags": n.tags
					}
				})
const thisWeekNotes = notes.filter(n => n.dates.created?.toFormat("yyyy-'W'WW") === dv.current().week)
dv.table(
	['Name', 'Creation', 'Type', 'Tags'],
	thisWeekNotes.map(
		n => [
			n.name,
			n.dates.created.toFormat('dd-MMM'),
			n.type,
			n.tags
			]
		))
````

## Closing week

### Weekly routine
- [ ] Archive completed tasks
- [ ] Finances
- [ ] Plan next week
- [ ] Process fleeting notes

### Evaluation


## Backlinks
```dataview
TABLE WITHOUT ID file.link as "Backlinks"
FROM outgoing([[#]])
```