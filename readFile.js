const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * Read the contents of a file.
 * @param {string} relativePath - The relative path of the file to read.
 * @returns {Object} An object containing the result or an error message.
 */
function readFile(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'File does not exist.' };
  }
  const contents = fs.readFileSync(targetPath, 'utf8');
  return { result: contents };
}

module.exports = readFile;