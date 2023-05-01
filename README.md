# C6-Node Plugin

## Overview

The C6-Node Plugin is a simple Node.js application that demonstrates how to create a ChatGPT plugin using an Express server. The plugin provides a basic "get" function that accepts an ID as input and returns a response indicating that the ID was received. This plugin is intended for educational purposes and serves as a starting point for building more complex ChatGPT plugins.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.

### Installation

1. Clone the repository:
git clone https://github.com/UCB-BioE-Anderson-Lab/C6-Node.git

2. Navigate to the project directory:
cd C6-Node

3. Install the required dependencies:
npm install

### Running the Plugin

1. Start the Express server:

npm start

or

node index.js

2. The server will start running on `http://localhost:3000`.

3. To test the "get" function, you can use a tool like `curl` or access the URL in your browser:
curl "http://localhost:3000/api/get?id=example-id"

## Usage with ChatGPT

To use this plugin with ChatGPT, you need to host the manifest file (`.well-known/ai-plugin.json`) on your server and provide the OpenAPI specification (`openapi.yaml`) that describes the plugin's API. Follow the instructions provided by OpenAI to enable the plugin in ChatGPT.

Once the plugin is enabled, you can interact with it in ChatGPT by providing instructions that reference the plugin's functionality. For example:

User: Use the C6-Node Plugin to get information for the ID "exampleid3".

## Development
The ChatGPT conversation in which this code was written is:
https://shareg.pt/WZKTELa

## License

This project is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the plugin or suggest new features.

## Disclaimer

This plugin is for educational purposes only and is not intended for production use. Please use it as a reference for building your own ChatGPT plugins.
