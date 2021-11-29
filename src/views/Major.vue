<template>
  <div class="is-fullheight">
    <div class="mt-2">
      <label for="note" class="mt-2">Play your root note
        <span v-if="rootNote" class="bold-font">: {{ rootNote }}</span>
      </label>
    </div>
    <Piano
      :scale="scale"
      class="mt-2"
      @played="handleNotePlayed" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Piano from '../components/Piano.vue';
import { getMajorScaleByRoot } from '../utils/data/major.data.js';

export default defineComponent({
  components: {
    Piano,
  },
  setup() {
    const scale = ref([]);

    const rootNote = ref('');

    const handleNotePlayed = async ( note ) => {
      const res = await getMajorScaleByRoot(note.id);
      scale.value = res;
      rootNote.value = `${ note.majorName } Major`;
    }

    return {
      scale,
      rootNote,
      handleNotePlayed,
    }
  },
})
</script>
