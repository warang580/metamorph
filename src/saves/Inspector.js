module.exports = {
  "name": "Inspector",
  "props": [
    "for"
  ],
  "data": {
    "editable": false,
    "component": ""
  },
  "mounted": "() => {\n\nthis.component = JSON.stringify(this.$data._component, null, 4);\n  }",
  "methods": {
    "update": "() => {\n\nthis._compile(this.component);\n  }",
    "_compile": "(component) => {\nconsole.log('compiling ...'); \nipcRenderer.send('generate', { component: component });\n}"
  },
  "computed": {
    "context": "() => {\nlet context = Object.assign({}, this.$data);\ndelete context._component;\ndelete context._components;\nreturn context;\n  }"
  },
  "template": [
    {
      "tag": "div",
      "children": [
        {
          "tag": "span",
          "attributes": {
            "class": "text-xl font-bold"
          },
          "children": "Inspecting &lt;{{ for }}&gt;"
        },
        {
          "tag": "input",
          "attributes": {
            "type": "checkbox",
            "class": "border rounded animate-pulse bg-green-300 m-4 p-2",
            "v-model": "editable"
          }
        },
        {
          "tag": "div",
          "attributes": {
            "class": "border bg-blue-100",
            "v-if": "editable"
          },
          "children": [
            {
              "tag": "button",
              "attributes": {
                "class": "border rounded bg-blue-300 m-4 p-2",
                "@click": "update",
                "v-if": "editable"
              },
              "children": "Save"
            },
            {
              "tag": "textarea",
              "attributes": {
                "class": "block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono",
                "v-model": "component",
                "v-if": "editable",
                "style": "height: 400px"
              }
            },
            {
              "tag": "button",
              "attributes": {
                "class": "border rounded animate-pulse bg-blue-300 m-4 p-2",
                "@click": "update",
                "v-if": "editable"
              },
              "children": "Save"
            }
          ]
        },
        {
          "tag": "pre",
          "attributes": {
            "class": "bg-red-200 text-xs font-mono",
            "v-if": "false"
          },
          "children": "{{ $data._component.template }}"
        }
      ]
    }
  ]
};