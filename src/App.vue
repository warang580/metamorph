<template>
  <button class="border animate-pulse bg-gray-300 m-4 p-2" @click="refresh">
    <img src="https://static.thenounproject.com/png/5651-200.png" width="16" />
  </button>

  <Scene />
</template>

<script>
const { ipcRenderer } = require('electron');

// @NOTE: process.cwd() == "metamorph/" not "src/"
let scene = require('./src/saves/scene.js');

import Scene from './components/Scene.vue'

export default {
  components: {
    Scene,
  },

  data() {
    return {
      scene: scene,
    };
  },

  mounted() {
    console.log("App mounted()");
    ipcRenderer.on('ready', (evt, args) => {
      console.log("App.vue: ipcMain is ready");
    });
  },

  methods: {
    refresh() {
      // Regenerate scene
      ipcRenderer.send('generate', {
        name: "Scene",
        component: JSON.stringify(scene),
      });
    },
  },

  // @TODO: remove listeners on destroy ?

  computed: {
  },
}
</script>
