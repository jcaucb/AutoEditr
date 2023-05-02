const fs = require('fs');
const path = require('path');
const playgroundDir = path.join(__dirname, 'playground');

const copyFile = (source, destination) => {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);
  readStream.pipe(writeStream);
};

const copyDirectory = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      copyFile(sourcePath, destinationPath);
    }
  });
};

const copy = (sourcePath, destinationPath) => {
  try {
    // Resolve the source and destination paths
    const resolvedSourcePath = path.join(playgroundDir, sourcePath);
    const resolvedDestinationPath = path.join(playgroundDir, destinationPath);

    // Check if the source exists
    if (!fs.existsSync(resolvedSourcePath)) {
      return { status: 'error', message: 'Source not found.' };
    }

    // Check if the source is a file or directory
    const stat = fs.statSync(resolvedSourcePath);
    if (stat.isDirectory()) {
      copyDirectory(resolvedSourcePath, resolvedDestinationPath);
    } else {
      copyFile(resolvedSourcePath, resolvedDestinationPath);
    }

    return { status: 'success', message: 'Copy operation successful.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = copy;