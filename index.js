// Electron entrypoint

const { app, ipcMain, BrowserWindow, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

const { renderComponent, writeComponent, renderSave, saveComponent } = require('./src/utils/generator.js');

let win;
let start = Date.now();

app.disableHardwareAcceleration()

ipcMain.on('generate', (event, args) => {
  console.log("Generating", args.name);

  // @NOTE: JSON.parse because we can't clone "Proxy" objects (data fields of vue component) so we stringify them before sending
  try {
    let scene = JSON.parse(args.component);
    writeComponent(args.name, renderComponent(scene));
    saveComponent (args.name, renderSave(scene));
    saveComponent (args.name, renderSave(scene));
  } catch (err) {
    console.log("Can't parse component", err, args);
  }
});

// @NOTE: this event happens when main.js is runned again (page reloads)
ipcMain.on('reload', (event, args) => {
  console.log("[vite] page reload");
  // win.webContents.send('ready');
});


function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // @NOTE: this is needed to require('electron')
      nodeIntegration: true
    }
  })

  // @TEMP: disable menu bar as we don't use it yet
  win.setMenuBarVisibility(false);

  // Visit Vite dev environment
  win.loadURL('http://localhost:3000/')
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
