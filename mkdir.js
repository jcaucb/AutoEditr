const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * Create a directory.
 * @param {string} relativePath - The relative path within the directory to create.
 * @returns {Object} An object containing the result or an error message.
 */
function mkdir(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (fs.existsSync(targetPath)) {
    return { error: 'Directory already exists.' };
  }
  fs.mkdirSync(targetPath, { recursive: true });
  return { result: 'Directory created successfully.' };
}

module.exports = mkdir;