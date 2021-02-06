<template>
  <SceneManager />
  <Inspector for="SceneManager" />
</template>

<script>
import SceneManager from './components/SceneManager.vue'
import Inspector from './components/Inspector.vue'

export default {
  components: {
    SceneManager,
    Inspector,
  },
}
</script>
