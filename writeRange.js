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
 * Replace a range of lines in a file.
 * @param {string} relativePath - The relative path of the file to write.
 * @param {Array} lines - The lines to replace in the file.
 * @param {string} range - The range of lines to replace.
 * @returns {Object} An object containing the result or an error message.
 */
function writeRange(relativePath, lines, range) {
  try {
    // Input validation
    if (!relativePath) {
      return { status: 'error', message: 'Path is required.' };
    }
    if (lines === undefined) {
      return { status: 'error', message: 'Lines are required.' };
    }
    if (range === undefined) {
      return { status: 'error', message: 'Range is required.' };
    }

    if (!isPathInPlayground(relativePath)) {
      return { status: 'error', message: 'Path is outside of the playground directory.' };
    }

    const targetPath = path.join(playgroundDir, relativePath);
    let content = fs.readFileSync(targetPath, 'utf8').split('\n');

    // Replace the specified lines
    const [start, end] = range.split('-').map(Number);
    content.splice(start, end - start + 1, ...lines);

    // Write the modified content back to the file
    fs.writeFileSync(targetPath, content.join('\n'));

    return { status: 'success', message: 'Lines replaced successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = writeRange;