const { spawn } = require('child_process')

/**
 * Spawn child
 */
module.exports = function (command, args, win, options = {}) {
  let child = spawn(
    command,
    args,
    Object.assign(options, {shell: process.platform == 'win32'})
  );

  let name = command + " " + args.join(" ");

  child.stdout.on("data", data => {
    win.webContents.send('info', {
      msg: `[${name}] ${data}`
    });
    console.log(`[${name}] stdout: ${data}`);
  });

  child.stderr.on("data", data => {
    win.webContents.send('error', {
      msg: `[${name}] ${data}`
    });
    console.error(`[${name}] stderr: ${data}`);
  });

  child.on('error', (error) => {
    win.webContents.send('info', {
      msg: `[${name}] ${error.message}`,
      err: error,
    });
    console.error(`[${name}] error: ${error.message}`);
  });

  child.on("close", code => {
    win.webContents.send('info', {
      msg: `[${name}] process exited with code ${code}`,
      code,
    });
    console.log(`[${name}] child process exited with code ${code}`);
  });

  return child;
}
