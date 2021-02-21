module.exports = {
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
        "v-if": "false"
      },
      "children": [
        {
          "tag": "div",
          "children": "available emojis ="
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
    }
  ]
};