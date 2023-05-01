const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Define the get function
function get(id) {
  console.log(`Received ID: ${id}`);
  return `Received ID: ${id}`;
}

// Serve static files from the root directory
app.use(express.static(__dirname));

// Define the API endpoint for the plugin
app.get('/api/get', (req, res) => {
  const id = req.query.id;
  const result = get(id);
  res.json({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

