const path = require('path');
const fs   = require('fs');

const requireUncached = function (module) {
  delete require.cache[require.resolve(module)];

  return require(module);
}

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

const renderUnmounted = function (component) {
  let fn = component.unmounted ? component.unmounted : () => {};

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
          renderData(component).join(",\n"),
        "};",
      "},",
      "",
      // TODO: all functions can be refactored
      "mounted() {",
        renderMounted(component),
      "},",
      "unmounted() {",
        renderUnmounted(component),
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

const renderSave = function (save) {
  return "module.exports = " + JSON.stringify(save, null, 2) + ";"
}

const saveComponent = function (name, content) {
  return writeFile('src/saves', `${name}.js`, content);
}

const writeFile = function (dir, file, content) {
  console.log("writeFile", file, content.length);

  return fs.writeFileSync(path.join(process.cwd(), dir, file), content);
}

/** Get an updated list of all components */
const getAllComponents = function () {
  // Get files from saves
  let componentNames = fs.readdirSync('src/saves/')
  // Remove metadata files
  .filter(f => f.endsWith('.js') && f != '_components.js')
  // Remove .js extension
  .map(f => f.substr(0, f.length - 3));


  let components = {};

  // Load components from file
  for (let componentName of componentNames) {
    components[componentName] = requireUncached(`../saves/${componentName}.js`);
  }

  return components;
}
/** Update a specific component */
const update = function (component) {
  // Get updated list of other components
  let components = getAllComponents();

  // Check if there are new components to create
  let newComponents = (component.components || []).filter(code => ! components[code]);

  // We create a new component
  newComponents.forEach(code => {
    // @TODO: refactor into another function
    let emptyComponent = {
      "name": code,
      "components": [
        "Inspector"
      ],
      "template": [
        {
          "tag": "span",
          "children": "&lt;" + code + "&gt;",
        },
        {
          "tag": "Inspector",
          "attributes": {
            "for": code,
          }
        }
      ]
    };

    // We update component (save + file)
    saveComponent (code, renderSave     (emptyComponent));
    writeComponent(code, renderComponent(emptyComponent));

    // We update list with our "new component"
    components[code] = emptyComponent;
  });


  // We update component (save + file)
  saveComponent (component.name, renderSave     (component));
  writeComponent(component.name, renderComponent(component));

  // We update list with our "new component"
  components[component.name] = component;

  // Save updated list
  saveComponent('_components', renderSave(components));
}

/** Generate all components */
const generate = function () {
  // Get all components
  let components = getAllComponents();

  // Write each component .vue file
  for (let [name, component] of Object.entries(components)) {
    writeComponent(
      name,
      renderComponent(component, components)
    );
  }

  // Save list into _components.js
  saveComponent('_components', renderSave(components));
}

module.exports = {
  renderAttributes,
  renderElements,
  renderComponent,
  writeComponent,

  renderSave,
  saveComponent,

  getAllComponents,

  generate,
  update,
}
