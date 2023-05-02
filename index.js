const express = require('express');
const bodyParser = require(
    'body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import the functions from the separate files
const list = require('./list');
const mkdir = require('./mkdir');
const rmdir = require('./rmdir');
const readFile = require('./readFile');
const writeFile = require(
    './writeFile');
const deleteFile = require(
    './deleteFile');
const rename = require('./rename');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Define the playground directory
const playgroundDir = path.join(
    __dirname, 'playground');

// Create the playground directory if it doesn't exist
if (!fs.existsSync(playgroundDir)) {
    fs.mkdirSync(playgroundDir);
}

// Serve static files from the root directory
app.use(express.static(__dirname));

// Logging middleware
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url}`
    );
    if (req.method === 'POST' ||
        req.method === 'PUT') {
        console.log(
            'Request body:',
            req.body);
    }
    next();
});

// Define the API endpoints for the plugin
app.get('/api/list', (req, res) => {
    const relativePath = req
        .query.path;
    const result = list(
        relativePath);
    res.json(result);
});

app.post('/api/mkdir', (req, res) => {
    const relativePath = req
        .body.path;
    const result = mkdir(
        relativePath);
    res.json(result);
});

app.delete('/api/rmdir', (req, res) => {
    const relativePath = req
        .query.path;
    const result = rmdir(
        relativePath);
    res.json(result);
});

app.get('/api/readFile', (req, res) => {
    const relativePath = req
        .query.path;
    const result = readFile(
        relativePath);
    res.json(result);
});

app.post('/api/writeFile', (req,
    res) => {
    const relativePath = req
        .body.path;
    const content = req.body
        .content;
    const result = writeFile(
        relativePath,
        content);
    res.json(result);
});

app.delete('/api/deleteFile', (req,
    res) => {
    const relativePath = req
        .query.path;
    const result = deleteFile(
        relativePath);
    res.json(result);
});

app.post('/api/rename', (req, res) => {
    const oldPath = req.body
        .oldPath;
    const newPath = req.body
        .newPath;
    const result = rename(
        oldPath, newPath);
    res.json(result);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});