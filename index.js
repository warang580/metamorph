// Electron entrypoint

const { app, ipcMain, BrowserWindow, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

let win;
let start = Date.now();

app.disableHardwareAcceleration()

function generate() {
  let file    = "Scene.vue";
  let content = "<template><div>SCENE " + Date.now() + "</div></template>";

  fs.writeFileSync(path.join(__dirname, "src/components", file), content);
}

ipcMain.on('generate', (event, args) => {
  console.log("electron should generate app", args);
  win.webContents.send('info', { msg: "Generating ..."});

  generate();
});

ipcMain.on('ready', (event, args) => {
  console.log("vite is ready")
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
