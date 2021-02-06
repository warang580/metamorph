<template>
<Scene  />
<Inspector for="SceneManager" />
<Inspector for="Scene" />
<Inspector for="Inspector" />
</template>

<script>
const { ipcRenderer } = require('electron');

import Scene from './Scene.vue'
import Inspector from './Inspector.vue'

export default {
components: {Scene: Scene,
Inspector: Inspector,},

props: {},

data() {
return {
_component: {"name":"SceneManager","components":["Scene","Inspector"],"template":[{"tag":"Scene"},{"tag":"Inspector","attributes":{"for":"SceneManager"}},{"tag":"Inspector","attributes":{"for":"Scene"}},{"tag":"Inspector","attributes":{"for":"Inspector"}}]},

};
},

mounted() {
(() => {})();
},

methods: {

},

computed: {

},
}
</script>