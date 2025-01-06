# My obsidian automations

This repo is a subset of my obsidian vault, which for obvious reason is not public.

Keeping it public in case somebody could benefit of them as well

In order to make use of them it is needed to have installed `Dataview`, `CustomJS` and `metaedit` plugins. 

## Task status button

Has a `task-status` metadata field. 

Then to instantiate the button

```dataviewjs
const {TaskStatusBtn} = await cJS()
await TaskStatusBtn.render({container: this.container})
```



