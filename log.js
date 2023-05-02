const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Define the path to the log file
const logDirPath = path.join(__dirname, 'log');
const logFilePath = path.join(logDirPath, 'log.json');

// Initialize the log file if it does not exist
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '[]');
}

// Function to append a log entry
function appendLogEntry(actionType, details, reversible) {
  // Read the existing log entries
  const logEntries = JSON.parse(fs.readFileSync(logFilePath));

  // Create a new log entry
  const logEntry = {
    actionId: Date.now(),
    timestamp: new Date().toISOString(),
    actionType,
    details,
    reversible
  };

  // Append the new log entry to the log
  logEntries.push(logEntry);

  // Write the updated log entries back to the log file
  fs.writeFileSync(logFilePath, JSON.stringify(logEntries));
}

// Function to undo an action based on action ID
function undo(actionId) {
  // Read the existing log entries
  const logEntries = JSON.parse(fs.readFileSync(logFilePath));

  // Find the log entry with the specified action ID
  const logEntryIndex = logEntries.findIndex(entry => entry.actionId === actionId);

  if (logEntryIndex === -1) {
    return { status: 'error', message: 'Action ID not found.' };
  }

  const logEntry = logEntries[logEntryIndex];

  // Check if the action is reversible
  if (!logEntry.reversible) {
    return { status: 'error', message: 'Action is not reversible.' };
  }

  // Perform the undo operation based on the action type
  switch (logEntry.actionType) {
    case 'file_write':
      // Get the file path and original content from the log entry details
      const { filePath, content } = logEntry.details;
      // Construct the full path to the target file
      const targetPath = path.join(playgroundDir, filePath);
      // Write the original content back to the file
      fs.writeFileSync(targetPath, content);
      break;
    case 'search_replace':
      // Get the file path, search pattern, and replacement text from the log entry details
      const { filePath: srFilePath, searchPattern, replacementText } = logEntry.details;
      // Construct the full path to the target file
      const srTargetPath = path.join(playgroundDir, srFilePath);
      // Read the file content
      const fileContent = fs.readFileSync(srTargetPath, 'utf8');
      // Perform the reverse search and replace operation
      const newContent = fileContent.split(replacementText).join(searchPattern);
      // Write the updated content back to the file
      fs.writeFileSync(srTargetPath, newContent);
      break;
    case 'rename':
      // Get the old and new paths from the log entry details
      const { oldPath, newPath } = logEntry.details;
      // Construct the full paths to the target files/directories
      const targetOldPath = path.join(playgroundDir, oldPath);
      const targetNewPath = path.join(playgroundDir, newPath);
      // Rename the file/directory back to its original name
      fs.renameSync(targetNewPath, targetOldPath);
      break;
    case 'mkdir':
      // Get the directory path from the log entry details
      const { dirPath } = logEntry.details;
      // Construct the full path to the target directory
      const targetDirPath = path.join(playgroundDir, dirPath);
      // Remove the created directory
      fs.rmdirSync(targetDirPath);
      break;
    // TODO: Add cases for other action types
    default:
      return { status: 'error', message: 'Unknown action type.' };
  }

  // Remove the log entry from the log
  logEntries.splice(logEntryIndex, 1);

  // Write the updated log entries back to the log file
  fs.writeFileSync(logFilePath, JSON.stringify(logEntries));

  return { status: 'success', message: 'Action undone successfully.' };
}

module.exports = {
  appendLogEntry,
  undo
};