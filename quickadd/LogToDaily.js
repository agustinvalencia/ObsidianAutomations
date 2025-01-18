module.exports = async (params) => {
	const {
		quickAddApi: { inputPrompt, infoDialog },
		app,
	} = params;

	// Get the current date and format it for the daily note
	const date = window.moment().format('gggg-MM-DD');
	const dailyPath = `Journal/Daily/${date}.md`;
	const file = app.vault.getAbstractFileByPath(dailyPath);

	// Check if the daily note exists
	if (!file) {
		await infoDialog(`Daily note not found: ${dailyPath}`);
		return;
	}

	// Get the current time and prompt
	const time = window.moment().format('HH:mm');
	const prompt = await inputPrompt('Log');
	if (!prompt) {
		await infoDialog('No log entry was provided.');
		return;
	}

	// Construct the log entry
	const log = `- **${time}** : ${prompt}\n`;

	// Read the daily note content
	const content = await app.vault.read(file);

	// Check if the ## Logs section exists
	const logsHeader = '## Logs';
	const logsIndex = content.indexOf(logsHeader);
	if (logsIndex === -1) {
		await infoDialog(`The "## Logs" section was not found in the daily note.`);
		return;
	}

	// Find the end of the ## Logs section
	let logsEndIndex = content.indexOf('\n## ', logsIndex + logsHeader.length); // Look for the next header
	if (logsEndIndex === -1) logsEndIndex = content.length; // If no next header, append to the end of the file

	// Insert the new log at the end of the ## Logs section
	const beforeLogs = content.slice(0, logsEndIndex).trimEnd(); // Content up to the end of logs
	const afterLogs = content.slice(logsEndIndex); // Content after the logs section
	const updatedContent = `${beforeLogs}\n${log}${afterLogs}`;

	// Write the updated content back to the file
	await app.vault.modify(file, updatedContent);
};
