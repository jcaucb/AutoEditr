const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * Write content to a file.
 * @param {string} relativePath - The relative path of the file to write.
 * @param {string} content - The content to write to the file.
 * @returns {Object} An object containing the result or an error message.
 */
function writeFile(relativePath, content) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  fs.writeFileSync(targetPath, content);
  return { result: 'File written successfully.' };
}

module.exports = writeFile;