const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

/**
 * List the contents of a directory.
 * @param {string} relativePath - The relative path of the directory to list.
 * @returns {Object} An object containing the result or an error message.
 */
function list(relativePath) {
  // Log the requested path
  console.log(`Listing contents for path: ${relativePath}`);

  // Construct the absolute path to the playground directory
  const fullPath = path.join(playgroundDir, relativePath);

  // Check if the directory exists
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory does not exist: ${fullPath}`);
    return { error: "Directory does not exist." };
  }

  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }

  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'Directory does not exist.' };
  }
  const contents = fs.readdirSync(targetPath);
  return { result: contents };
}

module.exports = list;