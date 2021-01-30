module.exports = {
  template: [{
    tag: "img",
    attributes: {
      class: "rounded shadow m-4 transform animate-bounce rotate-12",
      width: 50,
      src: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
    },
  }, {
    tag: "textarea",
    attributes: {
      class: "w-1/2 h-screen p-4 rounded shadow resize border m-4 text-monospace",
      "v-model": "scene",
    },
  }, {
    tag: "button",
    attributes: {
      class: "border animate-pulse bg-gray-300 m-4 p-2",
      "@click": "update",
    },
    children: "Redraw",
  }, {
    tag: "pre",
    attributes: {
      class: "bg-red-200",
    },
    children: "$data = {{ $data }}"
  }, {
    tag: "pre",
    attributes: {
      class: "bg-green-200",
    },
    children: "_component = {{ $data._component }}"
  }],
}
