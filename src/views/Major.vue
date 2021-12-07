<template>
  <div class="is-fullheight">
    <div class="mt-2">
      <label for="note" class="mt-2">Play your root note
        <span v-if="rootNote" class="bold-font">: {{ rootNote }}</span>
      </label>
    </div>
    <div class="fx-columns fx-center mt-2" style="margin: auto;">

      <Piano
        :scale="scale"
        :octave="octave"
        class="fx-column fx-expand"
        @played="handleNotePlayed" />

        <Octave
          class="fx-column"
          v-model:octave="octave"
        />

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Piano from '../components/Piano.vue';
import Octave from '../components/Octave.vue';
import { getMajorScaleByRoot } from '../utils/data/scales.data.js';

export default defineComponent({
  components: {
    Piano,
    Octave,
  },
  setup() {
    const scale = ref([]);
    const rootNote = ref('');
    const octave = ref(4);

    const handleNotePlayed = async ( note ) => {
      const res = await getMajorScaleByRoot(note.id);
      scale.value = res;
      rootNote.value = `${ note.sharpName } Major`;
    }

    /** Methods */

    /** Watchers */



    return {
      scale,
      octave,
      rootNote,
      handleNotePlayed,
      // handleOctaveChange,
    }
  },
})
</script>
