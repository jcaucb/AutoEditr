const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Define the playground directory using environment variable
const playgroundDir = process.env.PLAYGROUND_DIR;

function appendFile(relativePath, data) {
  try {
    // Input validation
    if (!relativePath) {
      return { status: 'error', message: 'Path is required.' };
    }
    if (data === undefined) {
      return { status: 'error', message: 'Data is required.' };
    }

    const targetPath = path.join(playgroundDir, relativePath);
    fs.appendFileSync(targetPath, data);

    // Verification step
    const fileContent = fs.readFileSync(targetPath, 'utf8');
    if (!fileContent.endsWith(data)) {
      throw new Error('Append operation failed. File content does not end with the appended data.');
    }

    return { status: 'success', message: 'Data appended successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = appendFile;