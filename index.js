// Electron entrypoint

const { app, ipcMain, BrowserWindow, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

const { renderScene } = require('./src/utils/generator.js');

let win;
let start = Date.now();

app.disableHardwareAcceleration()

function generate(scene) {
  let file    = "Scene.vue";
  let content = renderScene(scene);

  fs.writeFileSync(path.join(__dirname, "src/components", file), content);
}

ipcMain.on('generate', (event, args) => {
  console.log("Generating ...");
  win.webContents.send('info', { msg: "Generating ..."});

  // @NOTE: JSON.parse because we can't clone "Proxy" objects (data fields of vue component) so we stringify them before sending
  generate(JSON.parse(args.scene));
});

ipcMain.on('ready', (event, args) => {
  console.log("Vite is ready")
  showNotification({
    title: 'Ready',
  })
});


function showNotification (notification) {
  new Notification(notification).show()
}

function createWindow () {
  console.log("createWindow")
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

  win.loadURL('http://localhost:3000/')
  // win.loadFile('index.html')
}

app.whenReady()
  .then(() => console.log("app ready"))
  .then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  console.log("activate");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
