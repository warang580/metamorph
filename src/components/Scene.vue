<template>
<button class="border animate-pulse bg-gray-300 m-4 p-2" @click="update">Redraw</button>
<textarea class="block w-1/2 p-4 rounded shadow resize border m-4 text-monospace" v-model="scene" />
<button class="border animate-pulse bg-gray-300 m-4 p-2" @click="update">Redraw</button>
<pre class="w-1/2 bg-red-200">nb children = {{ $data._component.template.length }}</pre>
<img class="rounded shadow m-4 transform animate-bounce rotate-12" width="50" src="https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif" />
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
data() {
return {
_component: {
  "template": [
    {
      "tag": "button",
      "attributes": {
        "class": "border animate-pulse bg-gray-300 m-4 p-2",
        "@click": "update"
      },
      "children": "Redraw"
    },
    {
      "tag": "textarea",
      "attributes": {
        "class": "block w-1/2 p-4 rounded shadow resize border m-4 text-monospace",
        "v-model": "scene"
      }
    },
    {
      "tag": "button",
      "attributes": {
        "class": "border animate-pulse bg-gray-300 m-4 p-2",
        "@click": "update"
      },
      "children": "Redraw"
    },
    {
      "tag": "pre",
      "attributes": {
        "class": "w-1/2 bg-red-200"
      },
      "children": "nb children = {{ $data._component.template.length }}"
    },
    {
      "tag": "img",
      "attributes": {
        "class": "rounded shadow m-4 transform animate-bounce rotate-12",
        "width": 50,
        "src": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif"
      }
    }
  ]
},
scene: '',
};
},

mounted() {
console.log('$data', this.$data);
console.log('_component', this.$data._component);
this.scene = JSON.stringify(this.$data._component, null, 2);
},

methods: {
update(evt) {
console.log('updating ...', this.scene, evt);
this._compile(this.scene);
},

_compile(component) {
console.log('compiling ...', component);
ipcRenderer.send('generate', {name: 'Scene', component: component });
},
},
}
</script>