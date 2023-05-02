const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

const list = (relativePath) => {
  try {
    // Input validation
    if (!relativePath) {
      return { status: 'error', message: 'Path is required.' };
    }

    const fullPath = path.join(playgroundDir, relativePath);
    if (!fs.existsSync(fullPath)) {
      return { status: 'error', message: 'Directory does not exist.' };
    }

    const contents = fs.readdirSync(fullPath);
    return { status: 'success', data: contents };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = list;