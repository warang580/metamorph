# POC

- Save/load changes without thinking
  - [x] Loading
  - [ ] We need to be able to edit components/state
    - like v-model="$component.template"
      - So we need to inject $component
    - trigger changes by calling $component.save ?
  - [ ] Saving changes in DB

- Workflow
  - Start electron
  - It generates all components
  - It starts Vite in the background
  - Then you can work

  - Make a state machine out of electron start, it's confusing right now

  - Find a way to get yarn vite output inside metamorph (in case of errors etc.)
    maybe send them to the scene ? or root ? so they can be used
    // @TODO: gérer un <Root> qui gère <Scene> + ses data ? c'est déjà un peu le rôle de App.vue
  - console.log should be visible everywhere
  - electron crashes should be backed up
  - same for vite
    - writing "$attrs.scene.template.0" crashed the whole thing (because it's [0])
      - I've had to manually edit the generated file so it was correct
      (maybe because I don't have a single source of truth)

- Make intermediate component like "Inspector"
  // Gérer les dépendences entre fichiers si <A> demande <B>

- Use env variables for PORT, WINDOW_W, WINDOW_H
- Data.get ?

/* Tout ce qui est console.loggé ou archéologisé doit être visible ! */

# Dynamic content

maybe start simple/concrete, not abstract
it can be done "by writing code manually" at the beginning to watch for patterns

- Dynamic logic (xstate ?)
- Dynamic data set/get in a given component
  (v-model / :value)
  $data.context.x ?
- dynamic data in children
- update context/state with machine actions ?
