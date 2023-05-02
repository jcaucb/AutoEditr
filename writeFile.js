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
 * Write content to a file.
 * @param {string} relativePath - The relative path of the file to write.
 * @param {string} content - The content to write to the file.
 * @returns {Object} An object containing the result or an error message.
 */
function writeFile(relativePath, content) {
  try {
    // Input validation
    if (!relativePath) {
      return { status: 'error', message: 'Path is required.' };
    }
    if (content === undefined) {
      return { status: 'error', message: 'Content is required.' };
    }

    if (!isPathInPlayground(relativePath)) {
      return { status: 'error', message: 'Path is outside of the playground directory.' };
    }

    const targetPath = path.join(playgroundDir, relativePath);
    fs.writeFileSync(targetPath, content);
    return { status: 'success', message: 'File written successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = writeFile;