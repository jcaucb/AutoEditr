const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * Rename a file or directory.
 * @param {string} oldPath - The current relative path of the file or directory.
 * @param {string} newPath - The new relative path of the file or directory.
 * @returns {Object} An object containing the result or an error message.
 */
function rename(oldPath, newPath) {
  if (!isPathInPlayground(oldPath) || !isPathInPlayground(newPath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetOldPath = path.join(playgroundDir, oldPath);
  const targetNewPath = path.join(playgroundDir, newPath);
  if (!fs.existsSync(targetOldPath)) {
    return { error: 'File or directory does not exist.' };
  }
  fs.renameSync(targetOldPath, targetNewPath);
  return { result: 'File or directory renamed successfully.' };
}

module.exports = rename;