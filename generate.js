'use strict';

const path = require('path');
// const del  = require('del');
const fs   = require('fs');

const { renderScene } = require('./src/utils/generator.js');

console.log("# Generating Scene");

let now = new Date();
let file  = "Scene.vue";
let scene = {
  template: [{
    tag: "div",
    attributes: {
      class: "bg-red-300",
    },
    children: "It still works with this syntax !"
  }, {
    tag: "textarea"
  }, {
    tag: "div",
    attributes: {
      class: "bg-green-300",
    },
    children: "I hope it does work too"
  }, {
    tag: "img",
    attributes: {
      class: "rounded shadow m-4 transform rotate-12",
      width: 50,
      src: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
    },
  }, {
    tag: "div",
    attributes: {
      class: "bg-blue-300",
    },
    children: "Hello Guys! It Works!"
  }, {
    tag: "pre",
    attributes: {
      class: "bg-gray-300",
    },
    children: "$data"
  }],
};

let content = renderScene(scene);

console.log("# Writing files");
fs.writeFileSync(path.join(__dirname, "src/components", "Scene.vue"), content);
