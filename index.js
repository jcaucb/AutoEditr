const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Define the playground directory
const playgroundDir = path.join(__dirname, 'playground');

// Create the playground directory if it doesn't exist
if (!fs.existsSync(playgroundDir)) {
  fs.mkdirSync(playgroundDir);
}

// Helper function to check if a path is within the playground directory
function isPathInPlayground(targetPath) {
  const resolvedPath = path.resolve(playgroundDir, targetPath);
  return resolvedPath.startsWith(playgroundDir);
}

// Define the list function
function list(relativePath) { // Rename the parameter to 'relativePath'
  // Log the requested path
  console.log(`Listing contents for path: ${relativePath}`);

  // Construct the absolute path to the playground directory
  const fullPath = path.join(playgroundDir, relativePath); // Use 'relativePath' here

  // Check if the directory exists
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory does not exist: ${fullPath}`);
    return { error: "Directory does not exist." };
  }

  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }

  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'Directory does not exist.' };
  }
  const contents = fs.readdirSync(targetPath);
  return { result: contents };
}

// Define the mkdir function
function mkdir(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (fs.existsSync(targetPath)) {
    return { error: 'Directory already exists.' };
  }
  fs.mkdirSync(targetPath);
  return { result: 'Directory created successfully.' };
}

// Define the rmdir function
function rmdir(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'Directory does not exist.' };
  }
  fs.rmdirSync(targetPath, { recursive: true });
  return { result: 'Directory deleted successfully.' };
}

// Define the readFile function
function readFile(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    return { error: 'File does not exist.' };
  }
  const content = fs.readFileSync(targetPath, 'utf-8');
  return { result: content };
}

// Define the writeFile function
function writeFile(relativePath, content) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
  const targetPath = path.join(playgroundDir, relativePath);
  fs.writeFileSync(targetPath, content);
  return { result: 'File written successfully.' };
}

// Define the deleteFile function
function deleteFile(relativePath) {
  if (!isPathInPlayground(relativePath)) {
    return { error: 'Path is outside of the playground directory.' };
  }
const targetPath = path.join(playgroundDir, relativePath);
if (!fs.existsSync(targetPath)) {
return { error: 'File does not exist.' };
}
fs.unlinkSync(targetPath);
return { result: 'File deleted successfully.' };
}

// Define the rename function
function rename(oldRelativePath, newRelativePath) {
if (!isPathInPlayground(oldRelativePath) || !isPathInPlayground(newRelativePath)) {
return { error: 'Path is outside of the playground directory.' };
}
const oldTargetPath = path.join(playgroundDir, oldRelativePath);
const newTargetPath = path.join(playgroundDir, newRelativePath);
if (!fs.existsSync(oldTargetPath)) {
return { error: 'Source file or directory does not exist.' };
}
fs.renameSync(oldTargetPath, newTargetPath);
return { result: 'File or directory renamed successfully.' };
}

// Serve static files from the root directory
app.use(express.static(__dirname));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request body:', req.body);
  }
  next();
});

// Define the API endpoints for the plugin
app.get('/api/list', (req, res) => {
const relativePath = req.query.path;
const result = list(relativePath);
res.json(result);
});

app.post('/api/mkdir', (req, res) => {
const relativePath = req.body.path;
const result = mkdir(relativePath);
res.json(result);
});

app.delete('/api/rmdir', (req, res) => {
const relativePath = req.query.path;
const result = rmdir(relativePath);
res.json(result);
});

app.get('/api/readfile', (req, res) => {
const relativePath = req.query.path;
const result = readFile(relativePath);
res.json(result);
});

// Define the API endpoint for writing a file
app.post('/api/writefile', (req, res) => {
  const { path, content } = req.body;

  // Log the incoming request parameters
  console.log(`Received request to write file with path: ${path} and content: ${content}`);

  const result = writeFile(path, content);
  res.json({ result });
});


app.delete('/api/deletefile', (req, res) => {
const relativePath = req.query.path;
const result = deleteFile(relativePath);
res.json(result);
});

app.post('/api/rename', (req, res) => {
const oldRelativePath = req.body.oldPath;
const newRelativePath = req.body.newPath;
const result = rename(oldRelativePath, newRelativePath);
res.json(result);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);

});