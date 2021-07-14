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
            <div class="key-feature-item-content">
              <div
                v-if="keyFeature.imageUrls"
                class="key-feature-item-content__image-container"
              >
                <v-img
                  v-for="(imageUrl, index) in keyFeature.imageUrls"
                  :key="index"
                  :src="imageUrl"
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
// この画面幅を超えたときレーダーチャートのセクションを2列配置に
$RadorTwoColBreakPoint: 1024px;

// この画面幅を超えたとき特徴セクションを2列配置に
$keyFeaturesTwoColBreakPoint: 1100px;

// この画面幅を超えたときサイドナビを表示
$sideNavBreakPoint: 768px;

// TODO 見出しは別コンポーネント化
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
    padding: 48px 264px 96px 32px;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: $sideNavBreakPoint) {
      padding: 48px 32px 96px;
    }
  }
}

/**
 * 基本性能セクション
 */
.spike-introduction-top-section {
  .spike-introduction-top-section-content {
    display: flex;
    flex-wrap: wrap;

    > * {
      display: inline-flex;
      width: 100px;
      flex-direction: column;
      justify-content: center;
      flex: 1 1 auto;

      + * {
        margin-left: 64px;
      }
    }

    @media screen and (max-width: $RadorTwoColBreakPoint) {
      flex-direction: column;

      > * {
        width: 100%;

        + * {
          margin-left: 0;
        }
      }
    }

    ::v-deep .spike-introduction-recommended-for {
      > h3 {
        + * {
          margin-top: 16px;
        }
      }
      ul {
        padding: 0 24px 24px;
        list-style: square;

        > li {
          list-style: square;
        }
      }
    }
  }
}

/**
 * 特徴セクション
 */
.spike-introduction-key-features-section {
  .key-feature-item {
    width: 100%;
    padding: 32px 0;

    h3 {
      + * {
        margin-top: 16px;
      }
    }

    .key-feature-item-content {
      display: flex;
      flex-wrap: wrap;

      > * {
        flex: 1;
        width: 1px;

        + * {
          margin-left: 48px;
        }

        &.key-feature-item-content__image-container {
          > * {
            + * {
              margin-top: 48px;
            }
          }
        }
      }
    }

    @media screen and (max-width: $keyFeaturesTwoColBreakPoint) {
      .key-feature-item-content {
        display: block;

        > * {
          width: 100%;

          &.key-feature-item-content__image-container {
            display: flex;

            > * {
              width: 1px;
              flex: 1;

              + * {
                margin-top: 0;
                margin-left: 16px;
              }
            }
          }

          + * {
            margin-left: 0;
            margin-top: 16px;
          }

          > * + * {
            margin-top: 24px;
          }
        }
      }
    }
  }
}
</style>
