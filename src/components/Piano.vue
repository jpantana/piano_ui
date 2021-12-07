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
    octave: {
      type: Number,
      default: 4,
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

    const oscillators = ref([]);

    /** computed props */
    const keysComputed = computed(() => {
      return keys.value.map(x => ({...x,
                                    classes: `${x.classes} ${isInScale(x) ? 'in-scale' : '' }`
                                  }))
    });

    const oct = computed(() => props.octave);

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
    watch(oct, () => {
      //
    })

    /** methods */
    const createSynth = (getFrequency, note) => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // create Oscillator node
      const oscillator = audioCtx.createOscillator();
      oscillator.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime( getFrequency(note), audioCtx.currentTime);

      if (oscillators.value.length) {
        oscillators.value[0].stop();
        oscillators.value.splice(0, 1);
      }

      oscillators.value.push(oscillator);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 1800);
    }

    const getFrequency = (note) => {
        const octJump = (oct.value - 4) * 12
        const middleC = 440 * Math.pow( Math.pow( 2, 1 / 12 ), -9 );
        return middleC * Math.pow( Math.pow( 2, 1 / 12 ), (note.id * 1) + octJump );
      }


    const playNoteFrequency = (note) => {
      createSynth(getFrequency, note);
    };

    const handleNotePlayed = (note) => {
      context.emit('played', note );
      playNoteFrequency(note);
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
      oscillators,
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
  // margin: auto 2rem auto auto;
  margin: 2rem 2rem 2rem 10rem;

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
        height: 280px;
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