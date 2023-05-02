const list = require('./list');
const mkdir = require('./mkdir');
const rmdir = require('./rmdir');
const readFile = require('./readFile');
const writeFile = require('./writeFile');
const deleteFile = require('./deleteFile');
const rename = require('./rename');

module.exports = (app) => {
  // Define the API endpoints for the plugin
  // API Documentation: https://example.com/api-docs (Replace with actual documentation URL)

  // List directory contents
  // GET /api/list?path={relativePath}
  app.get('/api/list', (req, res) => {
    const relativePath = req.query.path;
    const result = list(relativePath);
    res.json(result);
  });

  // Create a directory
  // POST /api/mkdir { "path": "{relativePath}" }
  app.post('/api/mkdir', (req, res) => {
    const relativePath = req.body.path;
    const result = mkdir(relativePath);
    res.json(result);
  });

  // Delete a directory
  // DELETE /api/rmdir?path={relativePath}
  app.delete('/api/rmdir', (req, res) => {
    const relativePath = req.query.path;
    const result = rmdir(relativePath);
    res.json(result);
  });

  // Read a file
  // GET /api/readFile?path={relativePath}
  app.get('/api/readFile', (req, res) => {
    const relativePath = req.query.path;
    const result = readFile(relativePath);
    res.json(result);
  });

  // Write a file
  // POST /api/writeFile { "path": "{relativePath}", "content": "{fileContent}" }
  app.post('/api/writeFile', (req, res) => {
    const relativePath = req.body.path;
    const content = req.body.content;
    const result = writeFile(relativePath, content);
    res.json(result);
  });

  // Delete a file
  // DELETE /api/deleteFile?path={relativePath}
  app.delete('/api/deleteFile', (req, res) => {
    const relativePath = req.query.path;
    const result = deleteFile(relativePath);
    res.json(result);
  });

  // Rename a file or directory
  // POST /api/rename { "oldPath": "{oldRelativePath}", "newPath": "{newRelativePath}" }
  app.post('/api/rename', (req, res) => {
    const oldPath = req.body.oldPath;
    const newPath = req.body.newPath;
    const result = rename(oldPath, newPath);
    res.json(result);
  });
};