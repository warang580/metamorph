module.exports = {
  "name": "Inspector",
  "data": {
    "editable": true,
    "scene": "",
    "wave": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
    "w": 100
  },
  "mounted": "() => {\n\nthis.scene = JSON.stringify(this.$data._component, null, 4);\n  }",
  "methods": {
    "update": "() => {\n\nthis._compile(this.scene);\n  }",
    "_compile": "(component) => {\nconsole.log('compiling ...'); \nipcRenderer.send('generate', {name: 'Inspector', component: component });\n}"
  },
  "computed": {
    "context": "() => {\nlet context = Object.assign({}, this.$data);\ndelete context._component;\nreturn context;\n  }"
  },
  "template": [
    {
      "tag": "span",
      "children": "INSPECTOR !"
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
            "class": "block w-screen p-4 overflow-auto transform rotate-0 rounded shadow resize border m-4 font-mono",
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
      "tag": "pre",
      "attributes": {
        "class": "bg-red-200"
      },
      "children": "Number of children = {{ $data._component.template.length }}"
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
      "tag": "pre",
      "children": "src = {{ wave }}"
    }
  ]
};
