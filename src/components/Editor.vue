<template>
<span v-if="title" class="text-xl font-bold">{{ title }}</span>
<textarea v-model="contents" class="block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono" style="height: 400px" />
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