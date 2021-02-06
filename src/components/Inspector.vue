<template>
<div ><span class="text-xl font-bold">Inspecting &lt;{{ for }}&gt;</span>
<input type="checkbox" class="border rounded animate-pulse bg-green-300 m-4 p-2" v-model="editable" />
<div class="border bg-blue-100" v-if="editable"><button class="border rounded bg-blue-300 m-4 p-2" @click="update" v-if="editable">Save</button>
<textarea class="block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono" v-model="component" v-if="editable" style="height: 400px" />
<button class="border rounded animate-pulse bg-blue-300 m-4 p-2" @click="update" v-if="editable">Save</button></div>
<pre class="bg-red-200 text-xs font-mono" v-if="false">{{ $data._component.template }}</pre></div>
</template>

<script>
const { ipcRenderer } = require('electron');



export default {
components: {},

props: ["for"],

data() {
return {
_component: {"name":"Inspector","props":["for"],"data":{"editable":false,"component":""},"mounted":"() => {\n\nthis.component = JSON.stringify(this.$data._component, null, 4);\n  }","methods":{"update":"() => {\n\nthis._compile(this.component);\n  }","_compile":"(component) => {\nconsole.log('compiling ...'); \nipcRenderer.send('generate', { component: component });\n}"},"computed":{"context":"() => {\nlet context = Object.assign({}, this.$data);\ndelete context._component;\ndelete context._components;\nreturn context;\n  }"},"template":[{"tag":"div","children":[{"tag":"span","attributes":{"class":"text-xl font-bold"},"children":"Inspecting &lt;{{ for }}&gt;"},{"tag":"input","attributes":{"type":"checkbox","class":"border rounded animate-pulse bg-green-300 m-4 p-2","v-model":"editable"}},{"tag":"div","attributes":{"class":"border bg-blue-100","v-if":"editable"},"children":[{"tag":"button","attributes":{"class":"border rounded bg-blue-300 m-4 p-2","@click":"update","v-if":"editable"},"children":"Save"},{"tag":"textarea","attributes":{"class":"block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono","v-model":"component","v-if":"editable","style":"height: 400px"}},{"tag":"button","attributes":{"class":"border rounded animate-pulse bg-blue-300 m-4 p-2","@click":"update","v-if":"editable"},"children":"Save"}]},{"tag":"pre","attributes":{"class":"bg-red-200 text-xs font-mono","v-if":"false"},"children":"{{ $data._component.template }}"}]}]},
_components: undefined,
editable: false,
component: ""
};
},

mounted() {
(() => {

this.component = JSON.stringify(this.$data._component, null, 4);
  })();
},

methods: {
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