const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * Delete a directory.
 * @param {string} relativePath - The relative path of the directory to delete.
 * @returns {Object} An object containing the result or an error message.
 */
function rmdir(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'Directory does not exist.' };
  }
  fs.rmdirSync(targetPath, { recursive: true });
  return { result: 'Directory deleted successfully.' };
}

module.exports = rmdir;