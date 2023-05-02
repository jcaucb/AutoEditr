const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Define the playground directory using environment variable
const playgroundDir = process.env.PLAYGROUND_DIR;

const mkdir = (relativePath) => {
  try {
    // Input validation
    if (!relativePath) {
      return { status: 'error', message: 'Path is required.' };
    }

    const fullPath = path.join(playgroundDir, relativePath);
    if (fs.existsSync(fullPath)) {
      return { status: 'error', message: 'Directory already exists.' };
    }

    fs.mkdirSync(fullPath, { recursive: true });
    return { status: 'success', message: 'Directory created successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = mkdir;