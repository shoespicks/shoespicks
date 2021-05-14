<template>
  <v-select
    v-model="selectedValue"
    :items="items"
    :label="label"
    :item-value="itemValue"
    :item-text="itemText"
    :dense="dense"
    :outlined="placeholder"
    hide-details
  ></v-select>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: [Object, String],
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    itemValue: {
      type: String,
      default: ''
    },
    itemText: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    }
  },

  setup(props, context) {
    return {
      selectedValue: computed({
        get: () => props.value,
        set: (val: any) => {
          context.emit('input', val);
        }
      })
    };
  }
});
</script>

<style lang="scss" scoped></style>
