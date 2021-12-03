<template>
  <div class="keyboard fx-columns">
    <div
      v-for="(key) in keysComputed"
      :key="key.name"
      :class="key.classes"
      @click.stop="handleNotePlayed(key)"
    >
      <span v-if="key.blackKey" @click.stop="handleNotePlayed(key)"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';

export default defineComponent({
  props: {
    scale: {
      type: Array,
      default: () => ([]),
    },
    mode: {
      type: String,
      default: 'sharp',
    }
  },
  setup(props, context) {

    /** data/refs */
    const keys = ref([
      {id: 0, sharpName: 'C', flatName: 'C', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 1, sharpName: 'C#', flatName: 'Db', classes: `key is-black fx-column`, blackKey: true },
      {id: 2, sharpName: 'D', flatName: 'D', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 3, sharpName: 'D#', flatName: 'Eb', classes: `key is-black fx-column`, blackKey: true },
      {id: 4, sharpName: 'E', flatName: 'E', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 5, sharpName: 'F', flatName: 'F', classes: `key  fx-column fx-expand`, blackKey: false },
      {id: 6, sharpName: 'F#', flatName: 'Gb', classes: `key is-black fx-column`, blackKey: true },
      {id: 7, sharpName: 'G', flatName: 'G', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 8, sharpName: 'G#', flatName: 'Ab', classes: `key is-black fx-column`, blackKey: true },
      {id: 9, sharpName: 'A', flatName: 'A', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 10, sharpName: 'A#', flatName: 'Bb', classes: `key is-black fx-column`, blackKey: true },
      {id: 11, sharpName: 'B', flatName: 'B', classes: `key fx-column fx-expand`, blackKey: false },
    ]);

    const isMounted = ref(false);
    const keyWidth = ref('0px');
    const positionKey = ref('-0px');

    /** computed props */
    const keysComputed = computed(() => {
      return keys.value.map(x => ({...x,
                                    classes: `${x.classes} ${isInScale(x) ? 'in-scale' : '' }`
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

    const isInScale = (data) => {
      const name = [ `${ props.mode }Name`];
      return props.scale.findIndex(x => x[ name ] === data[ name ]) >= 0;
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
$radius: 10px;
$red: #ff6961;

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
    border-radius: 0 0 $radius $radius;
    border: .5px solid $black;
    background-color: $ivory;
    position: relative;

    &.in-scale {
      background: linear-gradient($ivory, $ivory, $ivory, $ivory, $ivory, $ivory, $ivory, $ivory, $ivory, $red);
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
        border-radius: 0 0 $radius $radius;
        height: 320px;
        min-width: v-bind(keyWidth);
        z-index: 1;
        left: v-bind(positionKey) !important;
      }

      &.in-scale {
        & > span {
          background: linear-gradient($black, $black, $black, $black, $black, $black, $black, $black, $black, $red);
        }
      }
    }
  }

}
</style>