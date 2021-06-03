<template>
  <section class="organisms-spike-detail-top-section">
    <h1>
      <span>{{ spike.brand }} {{ spike.nameEn }} </span>
      <small> {{ spike.name }}</small>
      <small>{{ spike.releaseYear }}年モデル</small>
    </h1>
    <ul class="spike-top-actions">
      <li>
        <a href="#" class="spike-rating">
          <Rating
            :value="spike.reviewRating"
            dense
            :size="24"
            :number-size="18"
            readonly
          ></Rating>
          <span>
            レビュー 0件
          </span>
        </a>
      </li>
      <li>
        <v-btn-toggle v-model="isFavoriteValue" rounded borderless dense>
          <Button text color="accent">
            <v-icon color="accent" left>{{
              isFavorite === 0 ? 'fas fa-heart' : 'far fa-heart'
            }}</v-icon
            >お気に入り</Button
          >
        </v-btn-toggle>
      </li>
      <li>
        <v-btn-toggle v-model="haveValue" rounded borderless dense>
          <Button text color="accent"
            ><v-icon color="accent" left>{{
              have === 0 ? 'fas fa-check-circle' : 'far fa-check-circle'
            }}</v-icon
            >持ってる</Button
          >
        </v-btn-toggle>
      </li>
      <li>
        <v-btn-toggle v-model="reviewedValue" rounded borderless dense>
          <Button text color="accent">
            <v-icon color="accent" left>{{
              reviewed === 0 ? 'fas fa-edit' : 'far fa-edit'
            }}</v-icon
            >クチコミを書く</Button
          >
        </v-btn-toggle>
      </li>
    </ul>
    <div class="spike-top-content">
      <div class="spike-top-content-image">
        <div class="spike-top-content-image-carousel-container">
          <v-carousel v-if="spike.colorVariations" height="100%">
            <v-carousel-item
              v-for="imageUrl in selectedColor.imageUrls"
              :key="imageUrl"
            >
              <v-img :src="imageUrl"></v-img>
            </v-carousel-item>
          </v-carousel>
        </div>
        <ColorVariationsPicker
          v-model="selectedColor"
          :items="spike.colorVariations"
          large
          class="color-variations-picker"
        ></ColorVariationsPicker>
      </div>
      <div class="spike-top-content-description">
        <section class="spike-top-content-description-strength">
          <h2>{{ spike.name }} {{ spike.releaseYear }}年モデルの特徴</h2>
          <ul v-if="spike.strength">
            <li v-for="strength in spike.strength" :key="strength.label">
              <span>
                <v-icon left>{{ strength.icon }}</v-icon>
              </span>
              <div>
                <p>{{ strength.label }}</p>
                <small v-if="strength.description">{{
                  strength.description
                }}</small>
              </div>
            </li>
          </ul>
        </section>

        <ul class="spike-top-content-description-buy-actions">
          <li>
            <Button color="primary">
              <v-icon left> fab fa-amazon </v-icon>Amazonで買う</Button
            >
          </li>
          <li>
            <Button color="primary"> 楽天で買う</Button>
          </li>
          <li>
            <Button color="primary">公式サイトで買う</Button>
          </li>
        </ul>
        <div v-if="spike.oldModels || spike.newModel" class="old-or-new-models">
          <router-link
            v-if="spike.newModel"
            :to="`/spikes/${spike.newModel[0].fields.slug}`"
          >
            {{ spike.releaseYear + 1 }}年モデルはコチラ
          </router-link>
          <router-link
            v-if="spike.oldModels"
            :to="`/spikes/${spike.oldModels[0].fields.slug}`"
          >
            {{ spike.releaseYear - 1 }}年モデルはコチラ
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref
} from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import Rating from '~/components/molecules/Rating.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { Button, ColorVariationsPicker, Rating },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    },
    isFavorite: {
      type: Number,
      default: null
    },
    have: {
      type: Number,
      default: null
    },
    reviewed: {
      type: Number,
      default: null
    }
  },
  setup(props, context) {
    return {
      selectedColor: ref(props.spike.colorVariations[0]),
      isFavoriteValue: computed({
        get: () => props.isFavorite,
        set: (val: number) => {
          context.emit('update:isFavorite', val);
        }
      }),
      haveValue: computed({
        get: () => props.have,
        set: (val: number) => {
          context.emit('update:have', val);
        }
      }),
      reviewedValue: computed({
        get: () => props.reviewed,
        set: (val: number) => {
          context.emit('update:reviewed', val);
        }
      })
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-detail-top-section {
  h1 {
    display: flex;
    flex-direction: column;
    font-size: 40px;

    > * {
      display: inline-flex;
    }

    > span {
      font-family: 'marsek', 'Noto Sans JP', 'Roboto', sans-serif;
    }

    > small {
      margin-top: -16px;
      font-size: 24px;

      + small {
        font-size: 18px;
        margin-top: -4px;
      }
    }
  }

  a.spike-rating {
    margin-top: -4px;
    display: inline-flex;
    align-items: center;
    font-size: 18px;

    * + * {
      margin-left: 8px;
    }
  }

  .spike-top-actions {
    display: flex;
    align-items: center;

    > li {
      &:first-of-type {
        + li {
          margin-left: 16px;
        }
      }

      + li {
        margin-left: 4px;
      }
    }
  }

  * + .spike-top-content {
    margin-top: 24px;
  }

  .spike-top-content {
    display: flex;

    > * {
      width: 50%;

      + * {
        margin-left: 32px;
      }
    }

    .spike-top-content-image-carousel-container {
      position: relative;
      width: 100%;
      padding-bottom: 100%;

      > .v-carousel {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    .color-variations-picker {
      margin: 16px 0;
    }

    > .spike-top-content-description {
      * + .spike-top-content-description-strength {
        margin-top: 16px;
      }

      .spike-top-content-description-strength {
        h2 {
          font-size: 20px;

          + * {
            margin-top: 16px;
          }
        }

        > ul {
          padding-left: 16px;

          > li {
            display: flex;

            > span {
              display: inline-flex;
              width: 30px;
              height: 48px;
              padding-top: 4px;
              align-items: flex-start;
              justify-content: center;

              + * {
                margin-left: 16px;
              }
            }

            > div {
              > p {
                font-weight: 500;
              }

              > small {
                color: gray;
              }
            }

            + li {
              margin-top: 16px;
            }
          }
        }

        + * {
          margin-top: 32px;
        }
      }

      .spike-top-content-description-buy-actions {
        display: flex;
        align-items: center;

        > li {
          + li {
            margin-left: 8px;
          }
        }
      }

      .old-or-new-models {
        margin-top: 16px;

        > * + * {
          margin-left: 16px;
        }
      }
    }
  }

  .v-btn-toggle--dense > .v-btn.v-btn {
    padding: 0 12px;
  }
}
</style>
