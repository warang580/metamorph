module.exports = {
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
        "class": "font-bold mb-4"
      },
      "children": "My Scene"
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
      "tag": "Editor",
      "attributes": {
        "v-if": "false",
        "v-model": "wave",
        "title": "Image src="
      }
    },
    {
      "tag": "Inspector",
      "attributes": {
        "for": "Editor"
      }
    }
  ]
};