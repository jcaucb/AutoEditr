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
 * Delete a file.
 * @param {string} relativePath - The relative path of the file to delete.
 * @returns {Object} An object containing the result or an error message.
 */
function deleteFile(relativePath) {
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
      return { status: 'error', message: 'File does not exist.' };
    }

    fs.unlinkSync(targetPath);
    return { status: 'success', message: 'File deleted successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = deleteFile;