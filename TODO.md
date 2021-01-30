# POC

- Dynamic components
  - [x] Make a button that sends a "generate" event to back-end API
  - [x] When this event is catch by API, create file components/scene.vue

  - [x] Make a separate "yarn generate" that can generate application without having to rerun electron every time something changes in the code
  - [x] Make scene based on an object/json containing the current "state"
  - [x] Use yarn generate utils to refresh state inside

  - Centralize data in DB
    - [x] refactor code so its uses a db json file
    - [x] yarn generate uses a DB
    - inside application,
      - [x] it uses DB as initial state
      - it uses "current state" after (it changes if modified)
        - to do that I need something to edit state lol
      - it updates db.json (could be scenes/start.json etc. like HyperCards)
      - move state inside Scene instead of (in App + with props) ?

- Workflow
  - Make a state machine out of electron start, it's confusing right now
  - Start electron
  - It generates all components
  - It starts Vite in the background
  - Then you can work

  - Find a way to get yarn vite output inside metamorph (in case of errors etc.)
  - console.log should be visible everywhere
  - electron crashes should be backed up
  - same for vite
    - writing "$attrs.scene.template.0" crashed the whole thing (because it's [0])
      - I've had to manually edit the generated file so it was correct
      (maybe because I don't have a single source of truth)

- Make intermediate component like "Inspector"

- Use env variables for PORT, WINDOW_W, WINDOW_H
- Data.get ?

# Dynamic content

maybe start simple/concrete, not abstract
it can be done "by writing code manually" at the beginning to watch for patterns

- Dynamic logic (xstate ?)
- Dynamic data set/get in a given component
  (v-model / :value)
  $data.context.x ?
- dynamic data in children
- update context/state with machine actions ?
