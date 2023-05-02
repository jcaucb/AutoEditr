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
 * Delete a directory.
 * @param {string} relativePath - The relative path of the directory to delete.
 * @returns {Object} An object containing the result or an error message.
 */
function rmdir(relativePath) {
  try {
    // Input validation
    if (!relativePath) {
      return { status: 'error', message: 'Path is required.' };
    }

    if (!isPathInPlayground(relativePath)) {
      return { status: 'error', message: 'Path is outside of the playground directory.' };
    }

    const targetPath = path.join(playgroundDir, relativePath);
    if (!fs.existsSync(targetPath)) {
      return { status: 'error', message: 'Directory does not exist.' };
    }

    fs.rmSync(targetPath, { recursive: true, force: true });
    return { status: 'success', message: 'Directory deleted successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = rmdir;