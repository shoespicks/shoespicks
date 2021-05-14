<template>
  <div
    class="molecules-color-variations-picker"
    :class="{ 'molecules-color-variations-picker--large': large }"
  >
    <ul>
      <li v-for="item in items" :key="item.id" @click="clickItem($event, item)">
        <span
          :style="`background-color: ${colors[item.id].code}`"
          :class="{ 'color-variations-item--active': isActive(item) }"
          class="color-variations-item"
        ></span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { shoeColors } from '~/types/shoes/shoeColors';

export default defineComponent({
  props: {
    value: {
      type: [Object, Array],
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    large: {
      type: Boolean
    }
  },
  setup(props, context) {
    return {
      colors: shoeColors,
      isActive: computed(() => {
        return (colorVariation: any) => {
          return colorVariation.id === (props.value as any)?.id;
        };
      }),
      clickItem: (e: Event, colorVariation: any) => {
        e.stopPropagation();
        context.emit('input', colorVariation);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-color-variations-picker {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: -8px 0 0 -8px;

    li {
      display: inline-flex;
      margin: 8px 0 0 8px;

      + li {
      }
    }

    .color-variations-item {
      display: inline-flex;
      width: 40px;
      height: 20px;
      border: 1px solid #ddd;
      border-radius: 2px;
      cursor: pointer;
      transition: border 100ms ease-out, opacity 200ms ease-out;

      &:hover {
        opacity: 0.8;
      }

      &.color-variations-item--active {
        border: 2px solid var(--v-primary-base);
      }
    }
  }

  &.molecules-color-variations-picker--large {
    .color-variations-item {
      width: 64px;
      height: 32px;
    }
  }
}
</style>
