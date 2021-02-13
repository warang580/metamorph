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
          "class": "block w-11/12 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-xs font-mono text-sm font-mono bg-blue-900 text-gray-100",
          "style": "height: 50px"
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
  "Emoji": {
    "name": "Emoji",
    "components": [
      "Inspector"
    ],
    "data": {
      "smileys": "https://www.w3schools.com/charsets/ref_emoji_smileys.asp",
      "ref": "https://www.w3schools.com/charsets/ref_emoji.asp",
      "emojis": {
        "smile": "😀",
        "grin": "😁",
        "joy": "😂",
        "angel": "😇",
        "evil": "😈"
      }
    },
    "template": [
      {
        "tag": "div",
        "attributes": {
          "class": "text-4xl"
        },
        "children": "{{ emojis.joy }}"
      },
      {
        "tag": "div",
        "attributes": {
          "class": "text-4xl",
          "v-for": "[k, v] in Object.entries(emojis)"
        },
        "children": "{{ v }} is :{{ k }}:"
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
    "mounted": "() => { ipcRenderer.send('list-generated'); ipcRenderer.on('generated', (_, args) => { this.init(args) } )}",
    "methods": {
      "init": "(args) => { this.component = JSON.stringify(args.components[this.for], null, 4); }",
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
              "class": "text-xl font-bold cursor-pointer bg-red-200 rounded text-xs font-mono"
            },
            "children": "&lt;{{ for }}&gt;"
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
                  "class": "block w-11/12 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 text-sm font-mono bg-blue-900 text-gray-100",
                  "v-model": "component",
                  "v-if": "editable",
                  "style": "min-height: 400px"
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
          }
        ]
      }
    ]
  },
  "Scene": {
    "name": "Scene",
    "data": {
      "wave": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
      "w": 200
    },
    "components": [
      "Inspector",
      "Editor",
      "Emoji"
    ],
    "mounted": "() => {}",
    "methods": {},
    "computed": {},
    "template": [
      {
        "tag": "span",
        "attributes": {
          "class": "font-bold mb-4"
        },
        "children": "My Scene"
      },
      {
        "tag": "Emoji"
      },
      {
        "tag": "Inspector",
        "attributes": {
          "for": "Emoji"
        }
      },
      {
        "tag": "img",
        "attributes": {
          "class": "rounded shadow m-4 transform animate-pulse rotate-12",
          ":width": "w",
          ":src": "wave"
        }
      },
      {
        "tag": "Editor",
        "attributes": {
          "v-if": "false",
          "v-model": "w",
          "title": "Image size="
        }
      },
      {
        "tag": "span",
        "children": "data = {{ $data }}"
      },
      {
        "tag": "Editor",
        "attributes": {
          "v-if": "true",
          "v-model": "wave",
          "title": "Image src="
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
          "for": "Scene"
        }
      },
      {
        "tag": "Inspector",
        "attributes": {
          "for": "Editor"
        }
      },
      {
        "tag": "Inspector",
        "attributes": {
          "for": "Inspector"
        }
      },
      {
        "tag": "Inspector",
        "attributes": {
          "for": "Emoji"
        }
      }
    ]
  }
};