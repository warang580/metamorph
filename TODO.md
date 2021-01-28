# POC

- Dynamic components
  - [x] Make a button that sends a "generate" event to back-end API
  - [x] When this event is catch by API, create file components/scene.vue

  - [ ] Make a separate "yarn generate" that can generate application without having to rerun electron every time something changes in the code

  - [ ] Make scene based on a JSON containing the current "state"
    - yarn generate uses a db.json @ root
    - inside application,
      - it uses db.json as initial state
      - it uses "current state" after (it changes if modified)

    - its content is generated from an object that contains elements and childrens



  - Node skeleton
  - Generate component based on node skeleton + data
  - remove "fake" components and make them "real"
  - Changing a component should send a message to backend to recomping corresponding file

- Current state database (localStorage ? fileSystem !)
  - We can use node via backend !
  - We save a fucking big json and load it when restarting the whole process

- Workflow
  - Start electron
  - It generates all components
  - It starts Vite in the background
  - Then you can work

  - Find a way to get yarn vite output inside metamorph (in case of errors etc.)

# Dynamic content

maybe start simple/concrete, not abstract
it can be done "by writing code manually" at the beginning to watch for patterns

- Dynamic logic (xstate ?)
- Dynamic data set/get in a given component
  (v-model / :value)
  $data.context.x ?
- dynamic data in children
- update context/state with machine actions ?
