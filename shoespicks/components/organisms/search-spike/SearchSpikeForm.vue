<template>
  <v-card width="240" class="search-spike-form-container">
    <v-form @submit.prevent="search()">
      <label>
        種目
        <SearchLauncher>
          <template #activator="{ on, attrs }">
            <Button
              v-if="searchFormValue.eventCategory"
              class="search-spike-form-evens-input"
              color="#262626"
              outlined
              plain
              v-bind="attrs"
              v-on="on"
              >{{ searchFormValue.eventCategory.title || '種目で絞り込み'
              }}<v-icon right>mdi mdi-menu-down</v-icon></Button
            >
          </template>
        </SearchLauncher>
      </label>
      <label>
        キーワード
        <TextInput v-model="searchFormValue.keyword" dense outlined></TextInput>
      </label>
      <label>
        ブランド
        <CheckBoxes
          v-model="searchFormValue.brands"
          :items="brands"
          item-value="id"
          item-label="name"
        ></CheckBoxes>
      </label>
      <label>
        競技レベル
        <Select
          v-model="searchFormValue.level"
          :items="levels"
          item-value="id"
          item-text="name"
        ></Select>
      </label>
      <label>
        色
        <ColorVariationsPicker
          v-model="selectedColor"
          multiple
          :items="colors"
        ></ColorVariationsPicker>
      </label>
      <Button type="submit" full>検索</Button>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import Select from '~/components/atoms/Select.vue';
import TextInput from '~/components/atoms/TextInput.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import CheckBoxes from '~/components/molecules/common/CheckBoxes.vue';
import SearchLauncher from '~/components/molecules/SearchLauncher.vue';
import { ISpikesSearchFormValue } from '~/store/spikes';
import { athleteLevels } from '~/types/shoes/athleteLevel';
import { shoeBrands } from '~/types/shoes/shoeBrands';
import { shoeColors } from '~/types/shoes/shoeColors';
import { EventCategory } from '~/types/shoes/shoeEvents';

export default defineComponent({
  components: {
    ColorVariationsPicker,
    CheckBoxes,
    Select,
    TextInput,
    Button,
    SearchLauncher
  },
  props: {
    event: {
      type: Object as PropType<EventCategory>,
      default: null
    }
  },
  setup(props, context) {
    const searchFormValue = {
      eventCategory: props.event,
      keyword: undefined,
      brands: [],
      level: undefined,
      price: undefined,
      colors: [],
      allWeatherOnly: undefined
    } as ISpikesSearchFormValue;

    return {
      searchFormValue,
      selectedColor: [],
      brands: Object.values(shoeBrands),
      levels: Object.values(athleteLevels),
      colors: Object.values(shoeColors),
      search: () => {
        context.emit('search', searchFormValue);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.search-spike-form-container {
  padding: 16px;

  ::v-deep .v-card__title {
    padding: 0 0 0 2px;
    font-size: 16px;
    font-weight: 700;
  }

  .molecules-search-launcher {
    .search-spike-form-evens-input {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
