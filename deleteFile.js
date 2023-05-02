const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * Delete a file.
 * @param {string} relativePath - The relative path of the file to delete.
 * @returns {Object} An object containing the result or an error message.
 */
function deleteFile(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'File does not exist.' };
  }
  fs.unlinkSync(targetPath);
  return { result: 'File deleted successfully.' };
}

module.exports = deleteFile;