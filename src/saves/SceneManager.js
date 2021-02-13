module.exports = {
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
};