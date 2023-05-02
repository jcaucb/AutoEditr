const fs = require('fs');
const path = require('path');

const searchReplace = (filePath, searchPattern, replacementText) => {
  try {
    // Resolve the file path
    const resolvedPath = path.resolve(__dirname, '..', filePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
      return { status: 'error', message: 'File not found.' };
    }

    // Read the file content
    const fileContent = fs.readFileSync(resolvedPath, 'utf8');

    // Perform the search and replace operation
    const newContent = fileContent.split(searchPattern).join(replacementText);

    // Write the updated content back to the file
    fs.writeFileSync(resolvedPath, newContent, 'utf8');

    // Count the number of occurrences replaced
    const occurrencesReplaced = (fileContent.match(new RegExp(searchPattern, 'g')) || []).length;

    return { status: 'success', message: `Replaced ${occurrencesReplaced} occurrence(s).` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = searchReplace;