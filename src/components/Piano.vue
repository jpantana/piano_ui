<template>
  <div class="keyboard">
    <div v-for="key in keys" :key="key.name" :class="key.classes" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
// import { ref, reactive } from 'vue'

export default defineComponent({
  props: {
    scale: Array,
  },
  setup(props, context) {
    console.log(props);
    console.log(context);

    /** computed props */
    const keys = computed(() => ([
      {id: 1, value: 'c', classes: `` },
      {id: 2, value: 'c#', classes: `is-black` },
      {id: 3, value: 'd', classes: `` },
      {id: 4, value: 'd#', classes: `is-black` },
      {id: 5, value: 'e', classes: `` },
      {id: 6, value: 'f', classes: `` },
      {id: 7, value: 'f#', classes: `is-black` },
      {id: 8, value: 'g', classes: `` },
      {id: 9, value: 'g#', classes: `is-black` },
      {id: 10, value: 'a', classes: `` },
      {id: 11, value: 'a#', classes: `is-black` },
      {id: 12, value: 'b', classes: `` },
    ]));

    /** watchers */

    return {
      keys,
    }
  },
})
</script>


<style lang="scss" scoped>
$black: #484848;
$ivory: #FFFFF0;

.keyboard {
  border: 1px solid $black;

  .key {
    height: 200px;
    width: 75px;
    border-radius: 0 0 4px 4px;
    border: .5px solid $black;
    background-color: $ivory;
  }
  .is-black {
    background-color: $black;
  }
}
</style>