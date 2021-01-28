// Electron entrypoint

const { app, BrowserWindow, Notification } = require('electron')
// const fs = require('fs')

app.disableHardwareAcceleration()

let win;

function showNotification (notification) {
  new Notification(notification).show()
}

function createWindow () {
  console.log("createWindow")
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3000/')
  // win.loadFile('index.html')
}

app.whenReady()
  .then(() => console.log("app ready"))
  .then(createWindow)
  .then(() => {
    showNotification({
      title: 'Electron launched',
      body:  'You can now ... work... I guess ?'
    })
  })

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
