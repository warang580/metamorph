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
_components: {"SceneManager":{"name":"SceneManager","components":["Scene","Inspector"],"template":[{"tag":"Scene"},{"tag":"Inspector","attributes":{"for":"SceneManager"}},{"tag":"Inspector","attributes":{"for":"Scene"}},{"tag":"Inspector","attributes":{"for":"Inspector"}}]},"Scene":{"name":"Scene","data":{"wave":"https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif","w":100},"components":["Inspector","Editor"],"mounted":"() => {}","methods":{},"computed":{},"template":[{"tag":"span","children":"My Scene"},{"tag":"img","attributes":{"class":"rounded shadow m-4 transform animate-bounce rotate-12",":width":"w",":src":"wave"}},{"tag":"input","attributes":{"type":"text","v-if":"false","v-model":"wave","class":"border p-4 w-1/2 block"}},{"tag":"Editor","attributes":{"v-model":"wave"}},{"tag":"Inspector","attributes":{"for":"Editor"}}]},"Inspector":{"name":"Inspector","props":["for"],"data":{"editable":false,"scene":""},"mounted":"() => {\n\nconsole.log('mounted', this.$data._components); let all = this.$data._components || {}\nlet c = all[this.for]; this.scene = JSON.stringify(c, null, 4);\n  }","methods":{"update":"() => {\n\nthis._compile(this.scene);\n  }","_compile":"(component) => {\nconsole.log('compiling ...'); \nipcRenderer.send('generate', { component: component });\n}"},"computed":{"context":"() => {\nlet context = Object.assign({}, this.$data);\ndelete context._component;\ndelete context._components;\nreturn context;\n  }"},"template":[{"tag":"div","children":[{"tag":"span","attributes":{"class":"text-xl font-bold"},"children":"Inspecting 1 &lt;{{ for }}&gt;"},{"tag":"input","attributes":{"type":"checkbox","class":"border rounded animate-pulse bg-green-300 m-4 p-2","v-model":"editable"}},{"tag":"div","attributes":{"class":"border bg-blue-100","v-if":"editable"},"children":[{"tag":"button","attributes":{"class":"border rounded bg-blue-300 m-4 p-2","@click":"update","v-if":"editable"},"children":"Save"},{"tag":"textarea","attributes":{"class":"block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono","v-model":"scene","v-if":"editable","style":"height: 400px"}},{"tag":"button","attributes":{"class":"border rounded animate-pulse bg-blue-300 m-4 p-2","@click":"update","v-if":"editable"},"children":"Save"}]},{"tag":"pre","attributes":{"class":"bg-red-200 text-xs font-mono","v-if":"false"},"children":"{{ $data._component.template }}"}]}]},"Editor":{"name":"Editor","data":{"contents":""},"props":["title","modelValue"],"mounted":"() => { this.contents = this.modelValue; }","methods":{"update":"() => { this.$emit('update:modelValue', this.contents); }"},"template":[{"tag":"span","attributes":{"v-if":"title","class":"text-xl font-bold"},"children":"{{ title }}"},{"tag":"textarea","attributes":{"v-model":"contents","class":"block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono","style":"height: 400px"}},{"tag":"button","attributes":{"class":"border rounded bg-green-300 m-4 p-2","@click":"update"},"children":"Save"}]}},

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