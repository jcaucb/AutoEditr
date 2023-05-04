const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Define the playground directory using environment variable
const playgroundDir = process.env.PLAYGROUND_DIR;

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
  try {
    // Input validation
    if (!oldPath || !newPath) {
      return { status: 'error', message: 'Both oldPath and newPath are required.' };
    }

    if (!isPathInPlayground(oldPath) || !isPathInPlayground(newPath)) {
      return { status: 'error', message: 'Path is outside of the playground directory.' };
    }

    const targetOldPath = path.join(playgroundDir, oldPath);
    const targetNewPath = path.join(playgroundDir, newPath);
    if (!fs.existsSync(targetOldPath)) {
      return { status: 'error', message: 'File or directory does not exist.' };
    }

    fs.renameSync(targetOldPath, targetNewPath);

    // Verification step
    if (!fs.existsSync(targetNewPath)) {
      throw new Error('Rename operation failed. New file or directory does not exist.');
    }

    return { status: 'success', message: 'File or directory renamed successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = rename;