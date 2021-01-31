# POC

- Save/load changes without thinking
  - [x] Loading
  - [x] We need to be able to edit components/state
    - like v-model="$component.template"
      - [x] So we need to inject $component inside scene data() {}
    - trigger changes by calling $component.save ?
      - [x] hard-coded version
  - [x] Saving changes in DB
  - [x] check invalid JSON before trying to apply/save changes (electron-side)
  - [x] dynamic version of updating component instead of hardcoded
  - [x] dynamic components (not just Scene)
  - need props (<Editor v-model="xxx">)
  - faire un editor permettant d'éditer chirurgicalement un template ou un élément
  - pouvoir ajouter un component qui n'existe pas sans que ça plante pour pouvoir y ajouter des éléments facilement
    - ajouter "tag": "MyComponent",
    - le système l'ajoute aux systèmes et voit qu'il n'existe pas donc créé un fichier "vierge" de component qui contient juste un name I guess, et là tu peux rajotuer des choses là dedans pour afficher des trucs :parfait:
      - bon il faut probablement juste un template avec just eun élement genre [MyComponent] pour savoir où il est ... bon en fait faut aussi l'inspector pour pouvoir l'éditer direct ... à moins de pouvoir dire <Inspector for="MyComponent"> et on peut le faire sans être dedans !

  - lorsque le state a changé et que j'envoie une nouvelle version de component, je m'attends à ce que le state continu d'exister, et non pas qu'il soit effacé
    - à mon avis ça doit être configurable dans l'event passé au BACKEND
      (parce qu'en cas d'utilisation réelle, je veux pas forcément qu'il me garde tout mon nouveau state comme étant le state par défaut ... à moins que ... je sais pas encore)
      - faut ptêtre juste appeller "state" -> "initialState" un truc comme ça pour qu'on comprenne que c'est l'état initial du widget qu'on gère là-dedans
      - du coup on pourrait stocker initialState + currentState (currentState dans le localStorage maybe pour pas polluer la définition de fichier de save) en même temps comme ça tu perds rien
- Workflow
  - Start electron
  - It generates all components
  - It starts Vite in the background
  - Then you can work
  - Killing electron stops vite too
  - Make Vite & Electron speak to each other
  (- Make a state machine out of electron start, it's confusing right now)

  - Find a way to get yarn vite output inside metamorph (in case of errors etc.)
    maybe send them to the scene ? or root ? so they can be used
    // @TODO: gérer un <Root> qui gère <Scene> + ses data ? c'est déjà un peu le rôle de App.vue
  - console.log should be visible everywhere
    - je pense qu'un console.log doit générer un event qu'on peut catch ou non
  - electron crashes should be backed up
  - same for vite
    - writing "$attrs.scene.template.0" crashed the whole thing (because it's [0])
      - I've had to manually edit the generated file so it was correct
      (maybe because I don't have a single source of truth)

- Use env variables for PORT, WINDOW_W, WINDOW_H
- Data.get ?

/* Tout ce qui est console.loggé ou archéologisé doit être visible ! */

# Améliorations

- envisager un store global avec les components dynamiques dedans, plutôt que de passer le code source au widget en question et de polluer ses données
- permettrait à l'inspecteur d'utiliser le nom du component pour éditer sa source (bon par contre pour le contexte ça suffit pas, il faut lui passer this.$data)

# Testing

TDD generator
  - sérialisation des fonctions (dans les deux sens)
    - scene.js contiendra une version texte?
    - il mettra la version executable dans vue
    - au moment de sérialiser, ce sera de nouveau du texte et sauvegardé comme tel?

# Dynamic content

- SceneManager qui décide quelle scène afficher ?

maybe start simple/concrete, not abstract
it can be done "by writing code manually" at the beginning to watch for patterns

- Dynamic logic (xstate ?)
- Dynamic data set/get in a given component
  (v-model / :value)
  $data.context.x ?
- dynamic data in children
- update context/state with machine actions ?

# Refactor / Optimisations

- I don't like generator.js API
  - Only one function (with side effets) to render component/save, no composition needed [at least outside]
