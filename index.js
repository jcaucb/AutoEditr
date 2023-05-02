const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import the API endpoints
const apiEndpoints = require('./apiEndpoints');

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

// Use the API endpoints
apiEndpoints(app);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});