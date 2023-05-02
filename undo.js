const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');
const logFilePath = './log.json';

// Function to undo a specific action based on its actionId
function undoAction(actionId) {
  try {
    // Read the log entries from the log file
    const logEntries = JSON.parse(fs.readFileSync(logFilePath));

    // Find the log entry with the specified actionId
    const logEntry = logEntries.find(entry => entry.actionId === actionId);
    if (!logEntry) {
      return { status: 'error', message: 'Action not found in the log.' };
    }

    // Check if the action is reversible
    if (!logEntry.reversible) {
      return { status: 'error', message: 'The specified action is not reversible.' };
    }

    // Perform the undo operation based on the action type
    switch (logEntry.actionType) {
      case 'file_write':
        // Undo a file write action by restoring the previous content
        const targetPath = path.join(playgroundDir, logEntry.details.filePath);
        fs.writeFileSync(targetPath, logEntry.details.content);
        break;
      // Additional cases for other action types (e.g., file_delete, rename, etc.)
      case 'rename':
        // Undo a rename action by renaming the item back to its original name
        const oldPath = path.join(playgroundDir, logEntry.details.newPath);
        const newPath = path.join(playgroundDir, logEntry.details.oldPath);
        fs.renameSync(oldPath, newPath);
        break;
      case 'mkdir':
        // Undo a mkdir action by removing the created directory
        const dirPath = path.join(playgroundDir, logEntry.details.path);
        fs.rmdirSync(dirPath);
        break;
      default:
        return { status: 'error', message: 'Unsupported action type for undo.' };
    }

    return { status: 'success', message: 'Action successfully undone.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = undoAction;