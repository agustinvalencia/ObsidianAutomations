---
type: daily
date: <% tp.file.title %> 
week: <% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>
created: <% tp.date.now() %>
workplace: home
---
[[ <% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>  | Week <% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %> ]]

 [[ <% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD" ) %>  | <--  <% tp.date.now("dddd", -1, tp.file.title, "YYYY-MM-DD") %> ]] | <% tp.date.now("dddd", 0, tp.file.title, "YYYY-MM-DD") %>  |  [[ <% tp.date.now("YYYY-MM-DD", +1, tp.file.title, "YYYY-MM-DD" ) %>  | <% tp.date.now("dddd", +1, tp.file.title, "YYYY-MM-DD") %> --> ]]

# {{date: dddd DD, MMMM}}
- [ ] Yesterday's time report
- [ ] Medicines
- [ ] Check today's meetings
- [ ] Work emails
- [ ] Personal emails
- [ ] Exercise
## Meetings
## Tasks
---
## Notes

### Linked Files
```dataview
TABLE
	type as "File Type"
FROM [[]]
```
---
## Logs
