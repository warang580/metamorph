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
      "tag": "span",
      "attributes": {
        "v-if": "title",
        "class": "text-xl font-bold"
      },
      "children": "{{ title }}"
    },
    {
      "tag": "textarea",
      "attributes": {
        "v-model": "contents",
        "class": "block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono",
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
