'use strict';

const { renderComponent, writeComponent } = require('./src/utils/generator.js');

console.log("# Generating Scene");
let scene = require('./src/saves/scene.js');

console.log("# Writing files");
writeComponent("Scene", renderComponent(scene));
