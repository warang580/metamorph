// Electron entrypoint

const { app, ipcMain, BrowserWindow, Notification } = require('electron')
const spawn = require('./src/utils/spawn.js')
const path = require('path')
const fs = require('fs')

const { update, getAllComponents } = require('./src/utils/generator.js');

let win;
let start = Date.now();

const watcher  = spawn('yarn', ['watch'], win);
const devtools = spawn('yarn', ['devtools'], win);

app.disableHardwareAcceleration()

process.on('uncaughtException', (error) => {
  win.webContents.send('error', {
    msg:   "Uncaught exception",
    error: error,
  });

  console.error("Uncaught exception", error);
});

ipcMain.on('generate', (event, args) => {
  // @NOTE: JSON.parse because we can't clone "Proxy" objects (data fields of vue component) so we stringify them before sending
  try {
    let component = JSON.parse(args.component);

    if (! component.name) {
      throw "Components should have names";
    }

    update(component);

    let components = getAllComponents();

    win.webContents.send('generated', {
      name:       component.name,
      component:  component,
      components: components,
    });

  } catch (err) {
    win.webContents.send('error', {
      msg:   "Can't parse component",
      error: err,
      args:  args,
    });

    console.error("Can't parse component", err, args);
  }
});

ipcMain.on('list-generated', (event, args) => {
  let components = getAllComponents();

  win.webContents.send('generated', {
    components: components,
  });
});

// @NOTE: this event happens when main.js is runned again (page reloads)
ipcMain.on('reload', (event, args) => {
  console.log("[vite] page reload");

  // @TEMP: send components at start like this
  win.webContents.send('generated', {
    components: getAllComponents(),
  });
});


function createWindow () {
  win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      // @NOTE: this is needed to require('electron')
      nodeIntegration: true
    }
  })

  // @TEMP: disable menu bar as we don't use it yet
  win.setMenuBarVisibility(false);

  // Visit Vite dev environment
  win.loadURL('http://localhost:3000/')

  // @TEMP: open DevTools
  win.webContents.openDevTools();
}

app.whenReady(() => {
  console.log("[app] ready");
}).then(createWindow)

app.on('window-all-closed', () => {
  console.log("[app] window-all-closed");

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// @NOTE: send native notifications
// function showNotification(notification) {
//   new Notification(notification).show()
// }

// @NOTE: this is from electron site but was never useful ?
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })
