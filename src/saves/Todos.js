module.exports = {
  "name": "Todos",
  "components": [
    "Inspector"
  ],
  "template": [
    {
      "tag": "div",
      "children": "&lt;Todos&gt;"
    },
    {
      "tag": "div",
      "attributes": {
        "class": "overflow-scroll",
        "style": "height: 100px;"
      },
      "children": [
        {
          "tag": "div",
          "children": "{{ i }}: {{ todo.title }} {{ todo.done ? '✅' : '⚠️' }}",
          "attributes": {
            "v-for": "(todo, i) in todos"
          }
        }
      ]
    }
  ],
  "data": {
    "todos": null
  },
  "mounted": "() => { fetch('https://jsonplaceholder.typicode.com/todos').then((response) => response.json()).then(todos => this.todos = todos); }"
};
