<template>
  <div class="keyboard fx-columns">
    <div
      v-for="(key) in keysComputed"
      :key="key.name"
      :class="key.classes"
      @click.stop="handleNotePlayed(key.value)"
    >
      <span v-if="key.blackKey" @click.stop="handleNotePlayed(key.value)"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';

export default defineComponent({
  props: {
    scale: Array,
    default: () => ([]),
  },
  setup(props, context) {

    /** data/refs */
    const keys = ref([
      {id: 1, value: 'c', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 2, value: 'db', classes: `key is-black fx-column`, blackKey: true },
      {id: 3, value: 'd', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 4, value: 'eb', classes: `key is-black fx-column`, blackKey: true },
      {id: 5, value: 'e', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 6, value: 'f', classes: `key  fx-column fx-expand`, blackKey: false },
      {id: 7, value: 'gb', classes: `key is-black fx-column`, blackKey: true },
      {id: 8, value: 'g', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 9, value: 'ab', classes: `key is-black fx-column`, blackKey: true },
      {id: 10, value: 'a', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 11, value: 'bb', classes: `key is-black fx-column`, blackKey: true },
      {id: 12, value: 'b', classes: `key fx-column fx-expand`, blackKey: false },
    ]);

    const isMounted = ref(false);
    const keyWidth = ref('0px');
    const positionKey = ref('-0px');

    /** computed props */
    const keysComputed = computed(() => {
      return keys.value.map(x => ({...x,
                                    classes: `${x.classes} ${isInScale(x.value) ? 'in-scale' : '' }`
                                  }))
    });

    /** watchers */
    watch(isMounted, (to) => {
      if (to) {
        const el = Array.from(document.querySelectorAll('.key.fx-column.fx-expand'))[0].clientWidth ?? 0;
        if (el) {
          keyWidth.value = `${el * .75}px`;
          positionKey.value = `-${(el * .75) / 2}px`;
        }
      }
    });

    /** methods */
    const handleNotePlayed = (note) => {
      context.emit('played', note );
    }

    const isInScale = (note) => {
      return props.scale.findIndex(x => x.name === note) >= 0;
    }


    /** mounted */
    onMounted(() => {
      isMounted.value = true;
    });

    return {
      keysComputed,
      keyWidth,
      positionKey,
      handleNotePlayed,
      isInScale,
    }
  },
})
</script>


<style lang="scss" scoped>
$black: #484848;
$ivory: #FFFFF0;

.keyboard {
  width: 100%;
  height: 400px;
  background: $ivory;
  background: transparent;
  margin-top: 1rem;
  max-width: 800px;
  margin: auto;

  .key {
    height: inherit;
    border-radius: 0 0 8px 8px;
    border: .5px solid $black;
    background-color: $ivory;
    position: relative;

    &.in-scale {
      border-bottom: 8px solid red;
      // box-shadow: inset 0 0 10px red;
    }

    &.is-black {
      position: relative;
      max-width: 0px !important;
      border: none;

      span {
        content: "";
        position: relative;
        display: block;
        background-color: $black;
        border-radius: 0 0 8px 8px;
        height: 320px;
        min-width: v-bind(keyWidth);
        z-index: 1;
        left: v-bind(positionKey) !important;
      }

      // &::before {
      //   content: "";
      //   position: relative;
      //   display: block;
      //   background-color: $black;
      //   border-radius: 0 0 8px 8px;
      //   height: 320px;
      //   min-width: v-bind(keyWidth);
      //   z-index: 1;
      //   left: v-bind(positionKey) !important;
      // }

      &.in-scale {
        & > span {
          border-bottom: 8px solid red;
        }
      }
    }
  }

}
</style>