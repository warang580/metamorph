'use strict';

const path = require('path');
// const del  = require('del');
const fs   = require('fs');

const { renderScene } = require('./src/utils/generator.js');

console.log("# Generating Scene");
let file    = "Scene.vue";
let scene   = require('./src/saves/scene.js');
let content = renderScene(scene);

console.log("# Writing files");
fs.writeFileSync(path.join(__dirname, "src/components", "Scene.vue"), content);
