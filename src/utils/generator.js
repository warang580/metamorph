const renderAttributes = function (attrs) {
  let attributes = [];

  for (let [key, value] of Object.entries(attrs)) {
    attributes.push(`${key}="${value}"`);
  }

  return attributes.join(" ");
}

const renderElements = function (elements) {
  let output = "";

  if (typeof elements == "undefined") return "";
  if (typeof elements == "string") return elements;

  for (let element of elements) {
    let tag        = element.tag || "template";
    let attributes = element.attributes || {};
    let children   = element.children || [];

    let childrenOutput = renderElements(children);

    if (childrenOutput) {
      output += `<${tag} ${renderAttributes(attributes)}>`;
      output += childrenOutput;
      output += `</${tag}>` + "\n";
    } else {
      output += `<${tag} ${renderAttributes(attributes)} />` + "\n";
    }
  }

  return output;
}

const renderScene = function (scene) {
  let content = renderElements(scene.template);

  return "<template>\n" + content + "</template>\n";
}

const writeComponent = function (name, content) {
  let file = `${name}.vue`;

  console.log("writeComponent", file, content.length);

  fs.writeFileSync(path.join(
    __dirname, "src/components", file
  ), content);
}

module.exports = {
  renderAttributes,
  renderElements,
  renderScene,
  
  writeComponent,
}
