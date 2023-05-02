# AutoEditr

## Overview

AutoEditr is a Node.js application that provides a simple API for file and directory management within a designated "playground" directory on the server's filesystem. The application allows users to perform common file and directory operations such as creating and deleting directories, reading and writing files, and listing directory contents.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```
git clone https://github.com/your-repo/AutoEditr.git
```

2. Navigate to the project directory:
```
cd AutoEditr
```

3. Install the required dependencies:
```
npm install
```

### Running the Application

1. Start the server:
```
node index.js
```

2. The server will start running on port 3000 (or the port specified in the `PORT` environment variable). You can access the API endpoints at `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `GET /api/list?path=<relativePath>`: Lists the contents of the specified directory within the playground. The `relativePath` parameter specifies the relative path within the playground directory.

- `POST /api/mkdir`: Creates a new directory within the playground. The request body should contain a JSON object with the property `path` specifying the relative path of the new directory.

- `DELETE /api/rmdir?path=<relativePath>`: Deletes the specified directory within the playground. The `relativePath` parameter specifies the relative path within the playground directory.

- `GET /api/readfile?path=<relativePath>`: Reads the contents of the specified file within the playground. The `relativePath` parameter specifies the relative path within the playground directory.

- `POST /api/writefile`: Writes content to the specified file within the playground. The request body should contain a JSON object with the properties `path` (the relative path of the file) and `content` (the content to write to the file).

- `DELETE /api/deletefile?path=<relativePath>`: Deletes the specified file within the playground. The `relativePath` parameter specifies the relative path within the playground directory.

- `POST /api/rename`: Renames a file or directory within the playground. The request body should contain a JSON object with the properties `oldPath` (the current relative path) and `newPath` (the new relative path).

- `POST /api/searchreplace`: Performs a search and replace operation on the specified file within the playground. The request body should contain a JSON object with the properties `filePath` (the relative path of the file), `searchPattern` (the text to search for), and `replacementText` (the text to replace the search pattern with).

- `POST /api/copy`: Copies a file or directory within the playground. The request body should contain a JSON object with the properties `sourcePath` (the relative path of the source file or directory) and `destinationPath` (the relative path of the destination file or directory).

## Notes

- The application creates and operates within a designated "playground" directory on the server's filesystem. All file and directory operations are restricted to this playground directory.

- The API does not allow escaping out of the playground directory using relative paths such as `../`.

- Error messages are designed to be informative and provide clear feedback on the nature of the error.

## License

This project is licensed under the Apache License, Version 2.0. See the `LICENSE` file for details.