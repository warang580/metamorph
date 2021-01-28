<template>
  <button class="border bg-red-100 p-2" @click="refresh">
    REFRESH
  </button>

  <Scene />

</template>

<script>
/*
<template v-for="child in children">
<component :is="child.type" v-bind="child.attributes">
<!-- @TODO: get from data ? -->
<template v-if="child.children == '$data'">
{{ $data }}
</template>

<template v-else>
{{ child.children }}
</template>
</component>
</template>

*/


/* Modéliser BPM form / Gayagaya et ensuite abstraire ? */
/* Modéliser tout sous forme de json pour pouvoir le gérer en dynamique later */
/* Tout ce qui est console.loggé ou écrit dans le présent fichier doit pouvoir être fait via l'outil !!! */

// l'App gère tous les composants existants et instancie le noeud "root" / scene
// le widget Node gère toutes les nodes possibles ?
  // en fait il faut qu'il y ait un widget qui connaisse tous les widgets existants
  // à moins d'arriver à les instancier à la volée comme dans bpm form

// lorsqu'on détecte un changement de composant, il faut qu'on réécrive le fichier correspondant côté Node pour que Vite/Vue détecte le changement et recompile le fichier ... ?

const { ipcRenderer } = require('electron');

import Scene from './components/Scene.vue'

export default {
  components: {
    Scene,
  },

  data() {
    return {
      // @TODO: full state ref ?

      // @TODO
      // components: {
      //   "SomeName": {/* Components attributes that will be compiled into files */}
      // },

      context: {
        name: "Hello",
      },

      children: [{
        type: "div",
        attributes: {
          class: "bg-red-300",
        },
        children: "It still works with this syntax !"
      }, {
        type: "textarea"
      }, {
        type: "div",
        attributes: {
          class: "bg-green-300",
        },
        children: "I hope it does work too"
      }, {
        type: "img",
        attributes: {
          class: "rounded shadow m-4 transform rotate-12",
          width: 50,
          src: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
        },
      }, {
        type: "div",
        attributes: {
          class: "bg-blue-300",
        },
        children: "Hello Guys! It Works!"
      }, {
        type: "pre",
        attributes: {
          class: "bg-gray-300",
        },
        children: "$data"
      }],
    };
  },

  mounted() {

  },

  methods: {
    refresh() {
      ipcRenderer.send('generate', {foo: "bar"});
    },
  },

  // @TODO: remove listeners on destroy ?

  computed: {
  },
}
</script>
