<template>
<span class="font-bold mb-4">My Scene</span>
<img class="rounded shadow m-4 transform animate-pulse rotate-12" :width="w" :src="wave" />
<Editor v-if="false" v-model="w" title="Image size=" />
<Editor v-if="false" v-model="wave" title="Image src=" />
<Inspector for="Editor" />
</template>

<script>
const { ipcRenderer } = require('electron');

import Inspector from './Inspector.vue'
import Editor from './Editor.vue'

export default {
components: {Inspector: Inspector,
Editor: Editor,},

props: {},

data() {
return {
wave: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
w: 100
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