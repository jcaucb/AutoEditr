const list = require('./list');
const mkdir = require('./mkdir');
const rmdir = require('./rmdir');
const readFile = require('./readFile');
const writeFile = require('./writeFile');
const deleteFile = require('./deleteFile');
const rename = require('./rename');
const searchReplace = require('./searchReplace');
const copy = require('./copy');

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
    const result = readFile(relativePath);
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

  // Copy a file or directory
  app.post('/api/copy', (req, res) => {
    const sourcePath = req.body.sourcePath;
    const destinationPath = req.body.destinationPath;
    const result = copy(sourcePath, destinationPath);
    res.json(result);
  });
};