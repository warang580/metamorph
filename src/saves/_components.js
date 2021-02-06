module.exports = {
  "Editor": {
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
  },
  "Inspector": {
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
  },
  "Scene": {
    "name": "Scene",
    "data": {
      "wave": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
      "w": 100
    },
    "components": [
      "Inspector",
      "Editor"
    ],
    "mounted": "() => {}",
    "methods": {},
    "computed": {},
    "template": [
      {
        "tag": "span",
        "attributes": {
          "class": "font-bold"
        },
        "children": "My Scene"
      },
      {
        "tag": "img",
        "attributes": {
          "class": "rounded shadow m-4 transform animate-bounce rotate-12",
          ":width": "w",
          ":src": "wave"
        }
      },
      {
        "tag": "input",
        "attributes": {
          "type": "text",
          "v-if": "false",
          "v-model": "wave",
          "class": "border p-4 w-1/2 block"
        }
      },
      {
        "tag": "Editor",
        "attributes": {
          "v-model": "wave"
        }
      }
    ]
  },
  "SceneManager": {
    "name": "SceneManager",
    "components": [
      "Scene",
      "Inspector"
    ],
    "template": [
      {
        "tag": "Scene"
      },
      {
        "tag": "Inspector",
        "attributes": {
          "for": "SceneManager"
        }
      },
      {
        "tag": "Inspector",
        "attributes": {
          "for": "Scene"
        }
      }
    ]
  }
};