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
      default: 'major',
    }
  },
  setup(props, context) {

    /** data/refs */
    const keys = ref([
      {id: 0, majorName: 'C', minorName: 'C', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 1, majorName: 'C#', minorName: 'Db', classes: `key is-black fx-column`, blackKey: true },
      {id: 2, majorName: 'D', minorName: 'D', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 3, majorName: 'D#', minorName: 'Eb', classes: `key is-black fx-column`, blackKey: true },
      {id: 4, majorName: 'E', minorName: 'E', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 5, majorName: 'F', minorName: 'F', classes: `key  fx-column fx-expand`, blackKey: false },
      {id: 6, majorName: 'F#', minorName: 'Gb', classes: `key is-black fx-column`, blackKey: true },
      {id: 7, majorName: 'G', minorName: 'G', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 8, majorName: 'G#', minorName: 'Ab', classes: `key is-black fx-column`, blackKey: true },
      {id: 9, majorName: 'A', minorName: 'A', classes: `key fx-column fx-expand`, blackKey: false },
      {id: 10, majorName: 'A#', minorName: 'Bb', classes: `key is-black fx-column`, blackKey: true },
      {id: 11, majorName: 'B', minorName: 'B', classes: `key fx-column fx-expand`, blackKey: false },
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