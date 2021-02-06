module.exports = {
  "name": "Inspector",
  "props": [
    "for"
  ],
  "data": {
    "editable": false,
    "component": ""
  },
  "mounted": "() => { ipcRenderer.on('generated', (_, args) => { this.init(args) } )}",
  "methods": {
    "init": "(args) => { console.log('got', args, 'for', this.for); this.component = JSON.stringify(args.components[this.for], null, 4); }",
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
            "@click": "() => { this.editable = ! this.editable }",
            "class": "text-xl font-bold bg-red-200 rounded"
          },
          "children": "&lt;{{ for }}&gt;"
        },
        {
          "tag": "input",
          "attributes": {
            "type": "checkbox",
            "class": "border rounded animate-pulse m-4 p-2",
            "v-model": "editable"
          }
        },
        {
          "tag": "div",
          "attributes": {
            "class": "border",
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