const fs = require('fs');
const path = require('path');

// Define the playground directory
const playgroundDir = path.join(__dirname, 'playground');

const searchReplace = (filePath, searchPattern, replacementText) => {
  try {
    // Construct the full path to the target file
    const targetPath = path.join(playgroundDir, filePath);

    // Check if the file exists
    if (!fs.existsSync(targetPath)) {
      return { status: 'error', message: 'File not found.' };
    }

    // Read the file content
    const fileContent = fs.readFileSync(targetPath, 'utf8');

    // Perform the search and replace operation
    const newContent = fileContent.split(searchPattern).join(replacementText);

    // Write the updated content back to the file
    fs.writeFileSync(targetPath, newContent, 'utf8');

    // Count the number of occurrences replaced
    const occurrencesReplaced = (fileContent.match(new RegExp(searchPattern, 'g')) || []).length;

    return { status: 'success', message: `Replaced ${occurrencesReplaced} occurrence(s).` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = searchReplace;