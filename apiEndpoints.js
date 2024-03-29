const list = require('./list');
const mkdir = require('./mkdir');
const rmdir = require('./rmdir');
const readFile = require('./readFile');
const writeFile = require('./writeFile');
const deleteFile = require('./deleteFile');
const rename = require('./rename');
const searchReplace = require('./searchReplace');
const copy = require('./copy');
const appendFile = require('./append');
const writeRange = require('./writeRange');
const testPython = require('./testPython');

module.exports = (app) => {
  // Define the API endpoints for the plugin

  // List directory contents
  app.get('/api/list', (req, res) => {
    const relativePath = req.query.path;
    const result = list(relativePath);
    res.json(result);
  });

  // Create a directory
  app.post('/api/mkdir', (req, res) => {
    const relativePath = req.body.path;
    const result = mkdir(relativePath);
    res.json(result);
  });

  // Delete a directory
  app.delete('/api/rmdir', (req, res) => {
    const relativePath = req.query.path;
    const result = rmdir(relativePath);
    res.json(result);
  });

  // Read a file
  app.get('/api/readFile', (req, res) => {
    const relativePath = req.query.path;
    const result = readFile(req);
    res.json(result);
  });

  // Write a file
  app.post('/api/writeFile', (req, res) => {
    const relativePath = req.body.path;
    const content = req.body.content;
    const result = writeFile(relativePath, content);
    res.json(result);
  });

  // Delete a file
  app.delete('/api/deleteFile', (req, res) => {
    const relativePath = req.query.path;
    const result = deleteFile(relativePath);
    res.json(result);
  });

  // Rename a file or directory
  app.post('/api/rename', (req, res) => {
    const oldPath = req.body.oldPath;
    const newPath = req.body.newPath;
    const result = rename(oldPath, newPath);
    res.json(result);
  });

  // Search and replace text in a file
  app.post('/api/searchReplace', (req, res) => {
    const filePath = req.body.filePath;
    const searchPattern = req.body.searchPattern;
    const replacementText = req.body.replacementText;
    const result = searchReplace(filePath, searchPattern, replacementText);
    res.json(result);
  });

  // Test a Python project with pytest
  app.post('/api/testPython', (req, res) => {
    const relativePath = req.body.path;
    testPython(relativePath).then(result => res.json(result));
  });

  // Copy a file or directory
  app.post('/api/copy', (req, res) => {
    const sourcePath = req.body.sourcePath;
    const destinationPath = req.body.destinationPath;
    const result = copy(sourcePath, destinationPath);
    res.json(result);
  });

  // Append data to a file
  app.post('/api/append', (req, res) => {
    const relativePath = req.body.path;
    const data = req.body.data;
    const result = appendFile(relativePath, data);
    res.json(result);
  });

  // Replace a range of lines in a file
  app.post('/api/writeRange', (req, res) => {
    const relativePath = req.body.path;
    const lines = req.body.lines;
    const range = req.body.range;
    const result = writeRange(relativePath, lines, range);
    res.json(result);
  });
};