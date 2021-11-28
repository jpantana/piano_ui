<template>
  <div>
    <div>
      <label for="note">Play your root note</label>
    </div>
    <Piano
      :scale="scale"
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

    const handleNotePlayed = async ( note ) => {
      const res = await getMajorScaleByRoot(note);
      scale.value = res;
    }

    return {
      scale,
      handleNotePlayed,
    }
  },
})
</script>
