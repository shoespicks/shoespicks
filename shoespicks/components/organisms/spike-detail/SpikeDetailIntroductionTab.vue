<template>
  <div class="organisms-spike-detail-introduction-tab">
    <section class="spike-introduction-top-section">
      <h2>
        <span>
          基本性能
        </span>
        <span class="background-text background-text--wide">
          01
        </span>
      </h2>
      <v-container>
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
      </v-container>
    </section>
    <section class="spike-introduction-key-features-section">
      <h2>
        <span>
          特徴
        </span>
        <span class="background-text">
          02
        </span>
      </h2>
      <div>
        <v-container>
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
        </v-container>
      </div>
    </section>
    <div
      v-if="spike.athletesInterview"
      v-html="$md.render(spike.athletesInterview)"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import RadarChart from '~/components/molecules/RadarChart.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { RadarChart },
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
  > .container {
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
    > .container {
      flex-direction: column;

      > * {
        width: 100%;
      }
    }
  }
}

.spike-introduction-key-features-section {
  .container {
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
    }

    p {
      line-height: 1.6;
    }
  }
}
</style>
