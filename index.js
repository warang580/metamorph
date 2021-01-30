// Electron entrypoint

const { app, ipcMain, BrowserWindow, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

const { renderComponent, writeComponent } = require('./src/utils/generator.js');

let win;
let start = Date.now();

app.disableHardwareAcceleration()

ipcMain.on('generate', (event, args) => {
  console.log("Generating", args.name);

  // @NOTE: JSON.parse because we can't clone "Proxy" objects (data fields of vue component) so we stringify them before sending
  let scene = JSON.parse(args.component);
  
  writeComponent(args.name, renderComponent(scene));
});

// @NOTE: this happens on start AND when saves/... changes
ipcMain.on('ready', (event, args) => {
  console.log("ipcMain @ready")
  win.webContents.send('ready');
});


function showNotification (notification) {
  new Notification(notification).show()
}

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

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// @NOTE: this is from electron site but was never useful ?
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })
