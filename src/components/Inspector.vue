<template>
<span class="text-xl font-bold">Inspector</span>
<input type="checkbox" class="border rounded animate-pulse bg-green-300 m-4 p-2" v-model="editable" />
<span >Edit</span>
<div class="border bg-blue-100" v-if="editable"><button class="border rounded animate-pulse bg-green-300 m-4 p-2" @click="update" v-if="editable">Redraw</button>
<textarea class="block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono" v-model="scene" v-if="editable" style="height: 400px" />
<button class="border rounded animate-pulse bg-blue-300 m-4 p-2" @click="update" v-if="editable">Redraw</button></div>
<pre class="bg-red-200 text-xs font-mono" v-if="false && ! editable">{{ $data._component.template }}</pre>
</template>

<script>
const { ipcRenderer } = require('electron');



export default {
components: {},

data() {
return {
_component: {"name":"Inspector","data":{"editable":true,"scene":"","wave":"https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif"},"mounted":"() => {\n\nthis.scene = JSON.stringify(this.$data._component, null, 4);\n  }","methods":{"update":"() => {\n\nthis._compile(this.scene);\n  }","_compile":"(component) => {\nconsole.log('compiling ...'); \nipcRenderer.send('generate', {name: 'Inspector', component: component });\n}"},"computed":{"context":"() => {\nlet context = Object.assign({}, this.$data);\ndelete context._component;\nreturn context;\n  }"},"template":[{"tag":"span","attributes":{"class":"text-xl font-bold"},"children":"Inspector"},{"tag":"input","attributes":{"type":"checkbox","class":"border rounded animate-pulse bg-green-300 m-4 p-2","v-model":"editable"}},{"tag":"span","children":"Edit"},{"tag":"div","attributes":{"class":"border bg-blue-100","v-if":"editable"},"children":[{"tag":"button","attributes":{"class":"border rounded animate-pulse bg-green-300 m-4 p-2","@click":"update","v-if":"editable"},"children":"Redraw"},{"tag":"textarea","attributes":{"class":"block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono","v-model":"scene","v-if":"editable","style":"height: 400px"}},{"tag":"button","attributes":{"class":"border rounded animate-pulse bg-blue-300 m-4 p-2","@click":"update","v-if":"editable"},"children":"Redraw"}]},{"tag":"pre","attributes":{"class":"bg-red-200 text-xs font-mono","v-if":"false && ! editable"},"children":"{{ $data._component.template }}"}]},
editable: true,
scene: "",
wave: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif"
};
},

mounted() {
(() => {

this.scene = JSON.stringify(this.$data._component, null, 4);
  })();
},

methods: {
update(...args) { return (() => {

this._compile(this.scene);
  })(...args); },
_compile(...args) { return ((component) => {
console.log('compiling ...'); 
ipcRenderer.send('generate', {name: 'Inspector', component: component });
})(...args); }
},

computed: {
context() { return (() => {
let context = Object.assign({}, this.$data);
delete context._component;
return context;
  })(); }
},
}
</script>