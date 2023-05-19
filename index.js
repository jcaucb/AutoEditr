const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import the API endpoints
const apiEndpoints = require('./apiEndpoints');

const app = express();

console.log('Server starting...');

console.log('Before bodyParser.json()');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

console.log('After bodyParser.json()');

app.use((err, req, res, next) => {
  console.log('Error:', err);
  if (err instanceof SyntaxError) {
    console.log('JSON parsing error:', err);
    res.status(400).send('Content too long. Split content and use appendFunction for remaining parts.');
  } else {
    next(err);
  }
});

console.log('After error handling middleware');

// Middleware to enable CORS
app.use(cors());

console.log('After CORS middleware');

// Load environment variables from .env file
require('dotenv').config();

// Define the playground directory using environment variable
const playgroundDir = process.env.PLAYGROUND_DIR;

// Create the playground directory if it doesn't exist
if (!fs.existsSync(playgroundDir)) {
  fs.mkdirSync(playgroundDir);
}

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve the OpenAPI specification file
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.yaml'));
});

// Serve the plugin manifest file
app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'ai-plugin.json'));
});

console.log('After static file middleware');

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request body:', req.body);
  }
  next();
});

console.log('After logging middleware');

// Use the API endpoints
apiEndpoints(app);

console.log('After API endpoints');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});