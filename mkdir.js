const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

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