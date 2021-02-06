module.exports = {
  "name": "Editor",
  "data": {
    "contents": ""
  },
  "props": [
    "title",
    "modelValue"
  ],
  "mounted": "() => { this.contents = this.modelValue; }",
  "methods": {
    "update": "() => { this.$emit('update:modelValue', this.contents); }"
  },
  "template": [
    {
      "tag": "div",
      "attributes": {
        "v-if": "title",
        "class": "ml-6 text-xl font-bold text-xs font-mono"
      },
      "children": "{{ title }}"
    },
    {
      "tag": "textarea",
      "attributes": {
        "v-model": "contents",
        "class": "block w-11/12 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono text-sm font-mono bg-gray-900 text-gray-100",
        "style": "height: 400px"
      }
    },
    {
      "tag": "button",
      "attributes": {
        "class": "border rounded bg-green-300 m-4 p-2",
        "@click": "update"
      },
      "children": "Save"
    }
  ]
};