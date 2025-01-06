class TaskStatusBtn {
	async btnCallback() {
		const status = ['backlog', 'in-progress', 'completed'];
		const { quickadd, metaedit } = app.plugins.plugins;
		const newStatus = await quickadd.api.suggester(status, status);
		const file = app.workspace.getActiveFile().path;
		await metaedit.api.update('task-status', newStatus, file);
	}

	render({ container }) {
		const btn = container.createEl('button');
		btn.textContent = 'Status';
		btn.addEventListener('click', () => this.btnCallback());
	}
}
