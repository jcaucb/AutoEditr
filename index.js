const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Define the API endpoint to list directory contents
app.get('/api/list', (req, res) => {
  const path = req.query.path;
  res.json({ result: `Listing contents for path: ${path}` });
});

// Define the API endpoint to create a directory
app.post('/api/mkdir', (req, res) => {
  const path = req.body.path;
  res.json({ result: `Creating directory at path: ${path}` });
});

// Define the API endpoint to delete a directory
app.delete('/api/rmdir', (req, res) => {
  const path = req.query.path;
  res.json({ result: `Deleting directory at path: ${path}` });
});

// Define the API endpoint to read a file
app.get('/api/readfile', (req, res) => {
  const path = req.query.path;
  res.json({ result: `Reading file at path: ${path}` });
});

// Define the API endpoint to write a file
app.post('/api/writefile', (req, res) => {
  const path = req.body.path;
  const content = req.body.content;
  res.json({ result: `Writing content to file at path: ${path}` });
});

// Define the API endpoint to delete a file
app.delete('/api/deletefile', (req, res) => {
  const path = req.query.path;
  res.json({ result: `Deleting file at path: ${path}` });
});

// Define the API endpoint to rename a file/directory
app.post('/api/rename', (req, res) => {
  const oldPath = req.body.oldPath;
  const newPath = req.body.newPath;
  res.json({ result: `Renaming from ${oldPath} to ${newPath}` });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
