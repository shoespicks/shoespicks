<template>
  <div class="organisms-spike-detail-introduction-tab">
    <section class="spike-introduction-top-section">
      <Container>
        <h2>
          <span>
            基本性能
          </span>
          <span class="background-text background-text--wide">
            01
          </span>
        </h2>
        <div class="spike-introduction-top-section-content">
          <div>
            <RadarChart :data="[2, 3.5, 4, 5, 5]"></RadarChart>
          </div>
          <section class="spike-introduction-recommended-for">
            <h3>こんな人におすすめ！</h3>
            <div
              v-if="spike.recommendedFor"
              v-html="$md.render(spike.recommendedFor)"
            ></div>
          </section>
        </div>
      </Container>
    </section>
    <section class="spike-introduction-key-features-section">
      <Container>
        <h2>
          <span>
            特徴
          </span>
          <span class="background-text">
            02
          </span>
        </h2>
        <div>
          <section
            v-for="keyFeature in spike.keyFeatures"
            :key="keyFeature.id"
            class="key-feature-item"
          >
            <h3>{{ keyFeature.title }}</h3>
            <div>
              <v-img
                v-for="imageUrl in keyFeature.imageUrls"
                :key="imageUrl"
                :src="imageUrl"
              ></v-img>
            </div>
            <p>
              {{ keyFeature.description }}
            </p>
          </section>
        </div>
      </Container>
    </section>
    <section class="spike-introduction-key-features-section2">
      <Container>
        <h2>
          <span>
            特徴の見た目のバリエーション
          </span>
          <span class="background-text">
            03
          </span>
        </h2>
        <div>
          <section
            v-for="keyFeature in spike.keyFeatures"
            :key="keyFeature.id"
            class="key-feature-item"
          >
            <h3>{{ keyFeature.title }}</h3>
            <div>
              <div
                v-if="keyFeature.imageUrls"
                class="key-feature-item__image-container"
              >
                <v-img
                  v-for="imageUrl in keyFeature.imageUrls"
                  :key="imageUrl"
                  :src="keyFeature.imageUrls[0]"
                ></v-img>
              </div>
              <p>
                {{ keyFeature.description }}
              </p>
            </div>
          </section>
        </div>
      </Container>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import Container from '~/components/atoms/Container.vue';
import RadarChart from '~/components/molecules/RadarChart.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { Container, RadarChart },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
h2 {
  position: relative;
  display: flex;
  height: 160px;
  align-items: center;

  > span {
    position: absolute;
    top: 45%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }

  .background-text {
    font-family: 'DJB Get Digital', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    color: #eef3f7;
    font-size: 120px;
    line-height: 160px;
    letter-spacing: 8px;

    &.background-text--wide {
      letter-spacing: 24px;
    }
  }
}

.organisms-spike-detail-introduction-tab {
  > section {
    display: flex;
    padding: 48px 0 96px;
    flex-direction: column;
    align-items: center;
  }
}

.spike-introduction-top-section {
  .spike-introduction-top-section-content {
    display: flex;
    flex-wrap: wrap;

    > * {
      display: inline-flex;
      width: 100px;
      padding: 0 32px;
      flex-direction: column;
      justify-content: center;
      flex: 1 1 auto;

      + * {
        min-width: 370px;
        flex: 0 0 50%;
      }
    }
  }
}

::v-deep .spike-introduction-recommended-for {
  ul {
    padding: 0 24px 24px;
    list-style: square;

    > li {
      list-style: square;
    }
  }
}

.spike-introduction-recommended-for {
  > h3 {
    + * {
      margin-top: 16px;
    }
  }
}

@media screen and (max-width: 768px) {
  .spike-introduction-top-section {
    > .atoms-container {
      flex-direction: column;

      > * {
        width: 100%;
      }
    }
  }
}

/**
 * 特徴のバリエーション１
 */
.spike-introduction-key-features-section {
  h2 + div {
    display: flex;
    flex-wrap: wrap;
  }

  .key-feature-item {
    width: 48%;
    padding: 32px;

    > div {
      display: flex;
      flex-wrap: wrap;

      > * {
        flex: 1;
      }

      + p {
        margin-top: 16px;
        line-height: 1.6;
      }
    }
  }
}

/**
 * 特徴のバリエーション２
 */
.spike-introduction-key-features-section2 {
  .key-feature-item {
    width: 100%;
    padding: 32px;

    h3 {
      + * {
        margin-top: 16px;
      }
    }

    > div {
      display: flex;
      flex-wrap: wrap;

      > * {
        flex: 1;
        width: 1px;

        + * {
          margin-left: 48px;
        }

        > * + * {
          margin-top: 48px;
        }
      }
    }
  }
}
</style>
