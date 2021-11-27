<template>
  <div>Major scale

    <piano :scale="[1,2,3,4]"/>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import Piano from '../components/Piano.vue';

export default defineComponent({
  components: {
    Piano,
  },
  setup() {

  },
})
</script>
