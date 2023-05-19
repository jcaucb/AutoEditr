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
 * Read the contents of a file.
 * @param {string} relativePath - The relative path of the file to read.
 * @returns {Object} An object containing the result or an error message.
 */
function readFile(req) {
  const relativePath = req.query.path;
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'File does not exist.' };
  }
  let contents = fs.readFileSync(targetPath, 'utf8').split('\n');
    // If a range is provided, return only the specified lines
  const range = req.query.range;
  if (range) {
    const [start, end] = range.split('-').map(Number);
    contents = contents.slice(start, end + 1);
  }
  return { result: contents };
}

module.exports = readFile;