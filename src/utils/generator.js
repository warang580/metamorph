const path = require('path');
const fs   = require('fs');

const renderAttributes = function (attrs) {
  let attributes = [];

  for (let [key, value] of Object.entries(attrs)) {
    attributes.push(`${key}="${value}"`);
  }

  return attributes.join(" ");
}

const renderElements = function (elements) {

  if (typeof elements == "undefined") return "";
  if (typeof elements == "string")    return elements;

  let output = [];

  for (let element of elements) {
    let tag        = element.tag || "template";
    let attributes = element.attributes || {};
    let children   = element.children || [];

    let childrenOutput = renderElements(children);

    let markup = "";
    if (childrenOutput) {
      markup += `<${tag} ${renderAttributes(attributes)}>`;
      markup += childrenOutput;
      markup += `</${tag}>`;
    } else {
      markup += `<${tag} ${renderAttributes(attributes)} />`;
    }

    output.push(markup);
  }

  return output.join("\n");
}

const renderTemplate = function (scene) {
  return renderElements(scene.template);
}

const renderScript = function (scene) {
  let output = [
    "const { ipcRenderer } = require('electron');",
    "",
    "export default {",
      "data() {",
        "return {",
          "_component: " + JSON.stringify(scene, null, 2) + ",",
          "scene: '',",
        "};",
      "},",
      "",
      "mounted() {",
        "console.log('$data', this.$data);",
        "console.log('_component', this.$data._component);",
        "this.scene = JSON.stringify(this.$data._component, null, 2);",
      "},",
      "",
      "methods: {",
        "update(evt) {",
          "console.log('updating ...', this.scene, evt);",
          "this._compile(this.scene);",
        "},",
        "",
        "_compile(component) {",
          "console.log('compiling ...', component);",
          "ipcRenderer.send('generate', {name: 'Scene', component: component });",
        "},",
      "},",
    "}",
  ];

  return output.join("\n");
}

const renderComponent = function (scene) {
  let component = [
    "<template>",
    renderTemplate(scene),
    "</template>",
    "",
    "<script>",
    renderScript(scene),
    "</script>",
  ];

  return component.join("\n");
}

const writeComponent = function (name, content) {
  let file = `${name}.vue`;

  console.log("writeComponent", file, content.length);

  fs.writeFileSync(path.join(
    process.cwd(), "src/components", file
  ), content);
}

module.exports = {
  renderAttributes,
  renderElements,
  renderComponent,

  writeComponent,
}
