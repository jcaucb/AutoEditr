const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Define the playground directory using environment variable
const playgroundDir = process.env.PLAYGROUND_DIR;

const copyFile = (source, destination) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);
    readStream.pipe(writeStream);
  });
};

const copyDirectory = async (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
    }
  }
};

const copy = async (sourcePath, destinationPath) => {
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
      await copyDirectory(resolvedSourcePath, resolvedDestinationPath);
    } else {
      await copyFile(resolvedSourcePath, resolvedDestinationPath);
    }

    // Verification step
    if (!fs.existsSync(resolvedDestinationPath)) {
      throw new Error('Copy operation failed. Destination does not exist.');
    }

    return { status: 'success', message: 'Copy operation successful.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = copy;