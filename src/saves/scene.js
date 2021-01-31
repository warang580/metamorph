module.exports = {
  "name": "Scene",
  "data": {
    "editable": true,
    "scene": "",
    "wave": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
    "w": 100
  },
  "components": [
    "Inspector"
  ],
  "mounted": "() => {\n\nthis.scene = JSON.stringify(this.$data._component, null, 4);\n  }",
  "methods": {
    "update": "() => {\n\nthis._compile(this.scene);\n  }",
    "_compile": "(component) => {\nconsole.log('compiling ...'); \nipcRenderer.send('generate', {name: 'Scene', component: component });\n}"
  },
  "computed": {
    "context": "() => {\nlet context = Object.assign({}, this.$data);\ndelete context._component;\nreturn context;\n  }"
  },
  "template": [
    {
      "tag": "input",
      "attributes": {
        "type": "checkbox",
        "class": "border rounded animate-pulse bg-green-300 m-4 p-2",
        "v-model": "editable"
      }
    },
    {
      "tag": "span",
      "children": "Edit"
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
            "class": "border rounded animate-pulse bg-green-300 m-4 p-2",
            "@click": "update",
            "v-if": "editable"
          },
          "children": "Redraw"
        },
        {
          "tag": "textarea",
          "attributes": {
            "class": "block w-1/2 p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 font-mono text-xs",
            "v-model": "scene",
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
          "children": "Redraw"
        }
      ]
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
        "class": "border p-4 w-1/2 block",
        "v-model": "wave"
      }
    },
    {
      "tag": "Inspector"
    }
  ]
};