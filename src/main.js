const { ipcRenderer } = require('electron');
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')

ipcRenderer.on('info', (evt, args) => {
  console.log("[metamorph] " + args.msg);
});

ipcRenderer.send('reload');
