'use strict';

const { renderComponent, writeComponent } = require('./src/utils/generator.js');

console.log("# Generating files");

let components = [
  'Scene',
  'Inspector',
];

for (let component of components) {
  writeComponent(
    component,
    renderComponent(require(`./src/saves/${component}.js`))
  );
}
