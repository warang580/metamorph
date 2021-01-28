<template>
  <template v-if="state == 'loading'">
    LOADING ...
  </template>

  <template v-if="state == 'loaded'">
    <component :is="component" v-bind="$attrs">
      <slot></slot>
    </component>
  </template>

  <template v-if="state == 'error'">
    <div class="bg-red-300">
      Can't load element {{ type }}: {{ error }}
    </div>
  </template>
</template>

<script>
import { markRaw } from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      state: 'loading',
      component: null,
      error: null,
    }
  },

  // @NOTE: this should be *created* so element is imported before mounted()
  created() {
    this.loadElement();
  },

  methods: {
    async loadElement() {
      this.error = null;

      if (this.isValidTag(this.type)) {
        this.state     = 'loaded';
        this.component = this.type;

        return;
      }

      import(`./components/${this.type}.vue`).then((imported) => {
        this.component = markRaw(imported.default)
        this.state = 'loaded';
      }, (err) => {
        this.error = err;
        this.state = 'error';
      });
    },

    isValidTag(name) {
      console.log("isValidTag", name);
      let $el  = document.createElement(name);
      let type = $el.toString();

      return type != "[object HTMLUnknownElement]";
    }
  },
}
</script>
