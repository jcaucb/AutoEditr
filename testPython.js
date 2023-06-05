const { spawn } = require('child_process');
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

    const pytest = spawn('source venv/bin/activate && pytest -v --tb=long', { cwd: absolutePath, shell: true });

    let pytestOutput = '';

    pytest.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      pytestOutput += data;
    });

    pytest.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      pytestOutput += data;
    });

    pytest.on('close', (code) => {
      if (code !== 0) {
        reject({ status: 'error', message: `pytest exited with code ${code}. Output: ${pytestOutput}` });
      } else {
        resolve({ status: 'success', message: `pytest completed successfully. Output: ${pytestOutput}` });
      }
    });
  }).catch(error => {
    console.error(`Error in testPython: ${JSON.stringify(error)}`);
    return { status: 'error', message: `Error in testPython: ${JSON.stringify(error)}` };
  });
}

module.exports = testPython;
