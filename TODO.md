# POC

- Dynamic components
  - make two "fake" components (one could be an inspector, the other an existing instanciated node)
  - Dynamic loading of component (like `dynamicRequire(componentName)`)
  - Node skeleton
  - Generate component based on node skeleton + data
  - remove "fake" components and make them "real"
  - Changing a component should send a message to backend to recomping corresponding file

- Current state database (localStorage ? fileSystem !)
  - We can use node via backend !
  - We save a fucking big json and load it when restarting the whole process

- on starting process, we should regenerate all components based on database

# Dynamic content

maybe start simple/concrete, not abstract
it can be done "by writing code manually" at the beginning to watch for patterns

- Dynamic logic (xstate ?)
- Dynamic data set/get in a given component
  (v-model / :value)
  $data.context.x ?
- dynamic data in children
- update context/state with machine actions ?
