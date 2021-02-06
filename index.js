// Electron entrypoint

const { app, ipcMain, BrowserWindow, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

const { renderComponent, writeComponent, renderSave, saveComponent, generate, update } = require('./src/utils/generator.js');

let win;
let start = Date.now();

app.disableHardwareAcceleration()

ipcMain.on('generate', (event, args) => {
  // @NOTE: JSON.parse because we can't clone "Proxy" objects (data fields of vue component) so we stringify them before sending
  try {
    let component = JSON.parse(args.component);

    if (! component.name) {
      throw "Components should have names";
    }

    // @NOTE: to trigger Vite updates, writing should be done here and not in generate ???
    // saveComponent (component.name, renderSave     (component));
    // writeComponent(component.name, renderComponent(component));
    update(component);
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
