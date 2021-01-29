<template>
  <button class="border bg-red-100 m-4 p-2" @click="refresh">
    REFRESH
  </button>

  <Scene :scene="scene" />
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
      context: {
        name: "Hello",
      },

      scene: {
        template: [{
          tag: "div",
          attributes: {
            class: "rounded shadow mt-4 p-4 m-4 text-green-200 bg-green-600",
          },
          children: "C'est marrant ce texte à l'envers, on dirait qu'il y a eu un problème ..."
        }, {
          tag: "img",
          attributes: {
            class: "rounded shadow m-4 transform rotate-12",
            width: 50,
            src: "https://media1.tenor.com/images/f38bd4f0ae23b4d7d594c388ab4f09ed/tenor.gif",
          },
        }, {
          tag: "textarea",
          attributes: {
            class: "p-4 rounded shadow resize border m-4",
          },
        }, {
          tag: "div",
          attributes: {
            class: "bg-blue-300",
          },
          children: "Hello Guys! It Works!"
        }, {
          tag: "pre",
          attributes: {
            class: "bg-gray-300",
          },
          // THIS IS WHERE THE MAGIC HAPPENS :tada:
          children: "data = {{ $data }}"
        }, {
          tag: "pre",
          attributes: {
            class: "bg-gray-300",
          },
          // THIS IS WHERE THE MAGIC HAPPENS :tada:
          children: "classes = {{ $attrs.scene.template[0].attributes.class.split(' ') }}"
        },
        {
          tag: "pre",
          attributes: {
            class: "bg-gray-300",
          },
          // THIS IS WHERE THE MAGIC HAPPENS :tada:
          children: "nb of classes = {{ $attrs.scene.template[0].attributes.class.split(' ').length }}"
        }, {
          tag: "pre",
          attributes: {
            class: "bg-red-300",
          },
          // THIS IS WHERE THE MAGIC HAPPENS :tada:
          children: "props = {{ $props }}"
        }],
      },
    };
  },

  mounted() {

  },

  methods: {
    refresh() {
      ipcRenderer.send('generate', { scene: JSON.stringify(this.scene) });
    },
  },

  watch: {
    scene: {
      deep: true,
      // @NOTE: don't do immediatly otherwise it will refresh indefinitely
      immediate: false,
      handler: () => {
        this.refresh();
      }
    }
  },

  // @TODO: remove listeners on destroy ?

  computed: {
  },
}
</script>
