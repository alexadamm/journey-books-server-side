/* istanbul ignore file */
const { exec } = require('child_process');

const execShellCommand = (cmd) => new Promise((resolve) => {
  exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
    } else if (stdout) {
      console.log(stdout);
    } else {
      console.log(stderr);
    }
    resolve(!!stdout);
  });
});

module.exports = execShellCommand;
