<template>
<Scene  />
<Inspector for="Scene" />
<Inspector for="Editor" />
<Inspector for="Inspector" />
<Inspector for="Emoji" />
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

};
},

mounted() {
(() => {})();
},
unmounted() {
(() => {})();
},

methods: {

},

computed: {

},
}
</script>