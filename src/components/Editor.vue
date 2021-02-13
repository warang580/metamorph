<template>
<div v-if="title" class="ml-6 text-xl font-bold text-xs font-mono">{{ title }}</div>
<textarea v-model="contents" class="block w-11/12 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono text-sm font-mono bg-blue-900 text-gray-100" style="height: 50px" />
<button class="border rounded bg-green-300 m-4 p-2" @click="update">Save</button>
</template>

<script>
const { ipcRenderer } = require('electron');



export default {
components: {},

props: ["title","modelValue"],

data() {
return {
contents: ""
};
},

mounted() {
(() => { this.contents = this.modelValue; })();
},
unmounted() {
(() => {})();
},

methods: {
update(...args) { return (() => { this.$emit('update:modelValue', this.contents); })(...args); }
},

computed: {

},
}
</script>