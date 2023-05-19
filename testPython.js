const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define the playground directory using environment variable
const playgroundDir = process.env.PLAYGROUND_DIR;

function testPython(relativePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(playgroundDir, relativePath);
    console.log(`Running pytest in directory: ${absolutePath}`);

    const venvPath = path.join(absolutePath, 'venv/bin/activate');
    console.log(`Looking for venv at: ${venvPath}`);
    const venvExists = fs.existsSync(venvPath);
    console.log(`Venv exists: ${venvExists}`);

    exec(`source venv/bin/activate && pytest`, { cwd: absolutePath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject({ status: 'error', message: `Error running pytest: ${error}` });
      } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve({ status: 'success', message: stdout });
      }
    });
  }).catch(error => {
    console.error(`Error in testPython: ${JSON.stringify(error)}`);
    return { status: 'error', message: `Error in testPython: ${JSON.stringify(error)}` };
  });
}

module.exports = testPython;