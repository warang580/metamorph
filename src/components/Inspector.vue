<template>
<div ><span @click="() => { this.editable = ! this.editable }" class="text-xl font-bold cursor-pointer bg-red-200 rounded text-xs font-mono">&lt;{{ for }}&gt;</span>
<div class="border" v-if="editable"><button class="border rounded bg-blue-300 m-4 p-2" @click="update" v-if="editable">Save</button>
<textarea class="block w-11/12 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-sm font-mono bg-blue-900 text-gray-100" v-model="component" v-if="editable" style="min-height: 400px" />
<button class="border rounded animate-pulse bg-blue-300 m-4 p-2" @click="update" v-if="editable">Save</button></div></div>
</template>

<script>
const { ipcRenderer } = require('electron');



export default {
components: {},

props: ["for"],

data() {
return {
editable: false,
component: ""
};
},

mounted() {
(() => { ipcRenderer.send('list-generated'); ipcRenderer.on('generated', (_, args) => { this.init(args) } )})();
},
unmounted() {
(() => {})();
},

methods: {
init(...args) { return ((args) => { this.component = JSON.stringify(args.components[this.for], null, 4); })(...args); },
update(...args) { return (() => {

this._compile(this.component);
  })(...args); },
_compile(...args) { return ((component) => {
console.log('compiling ...'); 
ipcRenderer.send('generate', { component: component });
})(...args); }
},

computed: {
context() { return (() => {
let context = Object.assign({}, this.$data);
delete context._component;
delete context._components;
return context;
  })(); }
},
}
</script>