module.exports = {
  "template": [
    {
      "tag": "button",
      "attributes": {
        "class": "border animate-pulse bg-gray-300 m-4 p-2",
        "@click": "update"
      },
      "children": "Redraw"
    },
    {
      "tag": "textarea",
      "attributes": {
        "class": "block w-1/2 p-4 rounded shadow resize border m-4 text-monospace",
        "v-model": "scene"
      }
    },
    {
      "tag": "button",
      "attributes": {
        "class": "border animate-pulse bg-gray-300 m-4 p-2",
        "@click": "update"
      },
      "children": "Redraw"
    },
    {
      "tag": "pre",
      "attributes": {
        "class": "w-1/2 bg-red-200"
      },
      "children": "nb children = {{ $data._component.template.length }}"
    },
    {
      "tag": "img",
      "attributes": {
        "class": "rounded shadow m-4 transform animate-bounce rotate-12",
        "width": 50,
        "src": "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif"
      }
    }
  ]
};