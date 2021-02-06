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
    let tag        = element.tag        || "template";
    let attributes = element.attributes || {};
    let children   = element.children   || [];

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

const renderTemplate = function (component) {
  return renderElements(component.template);
}

const renderProps = function renderProps(component) {
  let props = component.props || {};

  return JSON.stringify(props/*, null, 2*/)
}

const renderData = function (component) {
  let data = component.data || {};
  return Object.entries(data).map(([k,v]) => {
    return `${k}: ` + JSON.stringify(v);
  });
}

const renderMounted = function (component) {
  let fn = component.mounted ? component.mounted : () => {};

  return "(" + String(fn) + ")();";
}

const renderMethods = function (component) {
  let methods = component.methods || {};

  return Object.entries(methods).map(([k, v]) => {
    return `${k}(...args) { return (` + String(v) + ")(...args); }";
  });
}

const renderComputed = function (component) {
  let methods = component.computed || {};

  return Object.entries(methods).map(([k, v]) => {
    return `${k}() { return (` + String(v) + ")(); }";
  });
}

const renderImports = function (component) {
  let components = component.components || [];

  return components.map(c => {
    return `import ${c} from './${c}.vue'`;
  }).join("\n");
}

const renderComponents = function (component) {
  let components = component.components || [];

  return components.map(c => {
    return `${c}: ${c},`;
  }).join("\n");
}

const renderScript = function (component, components) {
  let output = [
    "const { ipcRenderer } = require('electron');",
    "",
    renderImports(component),
    "",
    "export default {",
      "components: {" + renderComponents(component) + "},",
      "",
      "props: " + renderProps(component) + ",",
      "",
      "data() {",
        "return {",
          "_component: " + JSON.stringify(component/*, null, 2*/) + ",",
          renderData(component).join(",\n"),
        "};",
      "},",
      "",
      // TODO: all functions can be refactored
      "mounted() {",
        renderMounted(component),
      "},",
      "",
      "methods: {",
        renderMethods(component).join(",\n"),
      "},",
      "",
      "computed: {",
        renderComputed(component).join(",\n"),
      "},",
    "}",
  ];

  return output.join("\n");
}

const renderComponent = function (component, components) {
  return [
    // @NOTE: we don't avoid fragment instances
    "<template>",
    renderTemplate(component),
    "</template>",
    "",
    "<script>",
    renderScript(component, components),
    "</script>",
  ].join("\n");
}

const writeComponent = function (name, content) {
  return writeFile('src/components', `${name}.vue`, content);
}

const renderSave = function (scene) {
  return "module.exports = " + JSON.stringify(scene, null, 2) + ";"
}

const saveComponent = function (name, content) {
  return writeFile('src/saves', `${name}.js`, content);
}

const writeFile = function (dir, file, content) {
  console.log("writeFile", file, content.length);

  return fs.writeFileSync(path.join(process.cwd(), dir, file), content);
}

const update = function (component) {
  saveComponent (component.name, renderSave     (component));
  writeComponent(component.name, renderComponent(component));
}

/** Generate all components */
const generate = function (current = null) {
  // If some component was given, save it first
  if (current) {
    saveComponent(current.name, renderSave(current));
  }

  // Then generate all components
  // @TODO: if (current) only generate SceneManager + "current" component, not everything
  // @TODO: iterate on files in saves/ except _components
  let componentNames = require("../saves/_components.js");
  let components     = {};

  // Load components from file
  for (let componentName of componentNames) {
    components[componentName] = require(`../saves/${componentName}.js`);
  }

  for (let [name, component] of Object.entries(components)) {
    if (! current || current.name == name || name == "SceneManager") {
      writeComponent(
        name,
        renderComponent(component, components)
      );
    }
  }
}

module.exports = {
  renderAttributes,
  renderElements,
  renderComponent,
  writeComponent,

  renderSave,
  saveComponent,

  generate,
  update,
}
