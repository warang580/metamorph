<template>
<img class="m-4 rounded shadow sm-4 transform animate-pulse rotate-12" width="50" src="https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif" />
<textarea class="w-1/2 h-screen p-4 rounded shadow resize border m-4 text-monospace" v-model="scene" />
<button class="border animate-pulse bg-gray-300 m-4 p-2" @click="update">Redraw</button>
<pre class="bg-red-200">edited scene = {{ scene }} vs data = {{ $data }}</pre>
<pre class="bg-green-200">_component = {{ $data._component }}</pre>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
data() {
return {
_component: {
  "template": [
    {
      "tag": "img",
      "attributes": {
        "class": "m-4 rounded shadow sm-4 transform animate-pulse rotate-12",
        "width": 50,
        "src": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif"
      }
    },
    {
      "tag": "textarea",
      "attributes": {
        "class": "w-1/2 h-screen p-4 rounded shadow resize border m-4 text-monospace",
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
        "class": "bg-red-200"
      },
      "children": "edited scene = {{ scene }} vs data = {{ $data }}"
    },
    {
      "tag": "pre",
      "attributes": {
        "class": "bg-green-200"
      },
      "children": "_component = {{ $data._component }}"
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