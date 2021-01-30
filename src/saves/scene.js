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
      class: "p-4 rounded shadow resize border m-4",
    },
  }, {
    tag: "pre",
    attributes: {
      class: "bg-red-200",
    },
    // THIS IS WHERE THE MAGIC HAPPENS :tada:
    children: "attrs = {{ $attrs }}"
  }],

  // first step = edit scene html inside scene itself

  // state ?
  // computed ?
  // methods ? states machines ?
}
