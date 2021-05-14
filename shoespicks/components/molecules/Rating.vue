<template>
  <div class="spike-list-item-rating">
    <v-rating
      v-model="ratingValue"
      background-color="gray lighten"
      color="#262626"
      size="16"
      dense
      half-increments
      :readonly="readonly"
    ></v-rating>
    <span>{{ ratingValue }}</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0
    },
    large: Boolean,
    readonly: Boolean
  },
  setup(props, context) {
    return {
      ratingValue: computed({
        get: () => props.value,
        set: (val: number) => {
          context.emit('input', val);
        }
      })
    };
  }
});
</script>

<style lang="scss" scoped>
.spike-list-item-rating {
  display: flex;
  margin-left: -2px;
  align-items: center;

  ::v-deep .v-rating {
    > .v-icon {
      + .v-icon {
        margin-left: -4px;
      }
    }

    + * {
      margin-left: 4px;
    }
  }

  span {
    display: inline-flex;
    font-size: 12px;
  }
}
</style>
