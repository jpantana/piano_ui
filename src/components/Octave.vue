<template>
  <div class="octave-wrapper fx-rows fx-center">
    <label class="fx-row label mt-1">
      Octave: {{ octave }}
    </label>

    <div class="fx-row fx-columns fx-center mb-1">

      <div class="arrow-wrapper fx-column mr-1">
        <div  id="up-arrow" @click="handleArrowClick" />
      </div>

      <div class="arrow-wrapper fx-column">
        <div id="down-arrow" @click="handleArrowClick" />
      </div>

    </div>
  </div>
</template>

<script>
import {ref} from 'vue';

const ENABLED = '#ff0000';
const DISNABLED = '#fc7d7d';

export default {
  props: {
    octave: {
      type: Number,
      default: 4,
    }
  },
  setup(props, context) {
    /** Data */
    const upArrowColor = ref('#ff0000');
    const downArrowColor = ref('#ff0000');

    /** Computed */

    /** Methods */
    const handleArrowClick = (e) => {
      switch (e.target.id) {
        case 'up-arrow':
          if (props.octave < 7) {
            context.emit('update:octave', props.octave + 1);
            downArrowColor.value = ENABLED;
            if ((props.octave + 1) === 7) {
              // disable up arrow
              upArrowColor.value = DISNABLED;
            }
          }
          break;
        case 'down-arrow':
          if (props.octave > 0) {
            context.emit('update:octave', props.octave - 1);
            upArrowColor.value = ENABLED;
            if ((props.octave - 1) === 0) {
              // disable down arrow
              downArrowColor.value = DISNABLED;
            }
          }
          break;
        default: break;
      }
    }

    return {
      handleArrowClick,
      upArrowColor,
      downArrowColor,
    }
  },
}
</script>

<style lang="scss" scoped>
.octave-wrapper {
  background: #484848;
  border: #966F33 solid 4px;
  border-radius: 12px;

  .label {
    color: white;
  }

  .arrow-wrapper {
    padding: .5rem;

    > #up-arrow {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 30px solid v-bind(upArrowColor);
    }
    > #down-arrow {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 30px solid v-bind(downArrowColor);
    }

    // & > .disabled {
    // }
  }
}
</style>