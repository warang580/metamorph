<template>
<span >My Scene</span>
<img class="rounded shadow m-4 transform animate-bounce rotate-12" :width="w" :src="wave" />
<input type="text" v-if="false" v-model="wave" class="border p-4 w-1/2 block" />
<Editor v-model="wave" />
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
_component: {"name":"Scene","data":{"wave":"https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif","w":100},"components":["Inspector","Editor"],"mounted":"() => {}","methods":{},"computed":{},"template":[{"tag":"span","children":"My Scene"},{"tag":"img","attributes":{"class":"rounded shadow m-4 transform animate-bounce rotate-12",":width":"w",":src":"wave"}},{"tag":"input","attributes":{"type":"text","v-if":"false","v-model":"wave","class":"border p-4 w-1/2 block"}},{"tag":"Editor","attributes":{"v-model":"wave"}},{"tag":"Inspector","attributes":{"for":"Editor"}}]},
wave: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
w: 100
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