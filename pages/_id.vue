<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{ spike.fields.spikeTitle }}
      </h1>
      <v-carousel :show-arrows="false" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item
          v-for="(spikeImg, id) in spike.fields.spikePhoto"
          :key="id"
          :src="spike.fields.spikePhoto[id].fields.file.url"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <p>参考価格：{{ spike.fields.spikePrice }}（税込）</p>
      <b-button pill variant="outline-secondary">今すぐネットで購入する</b-button>
      <p>{{ spike.fields.spikeDescription }}</p>

      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="詳細" active>
              <b-card-text>
                <BarChart />
                <b-button pill variant="primary">他の靴と比較する</b-button>

                <h2>基本情報</h2>

                <table
                  class="sougou-table"
                  style="border-collapse: collapse; width: 99.7709%; height: 243px"
                >
                  <tbody>
                    <tr>
                      <td style="width: 26.092%">定価価格</td>
                      <td style="width: 73.908%">{{ spike.fields.spikePrice }}円（税込）</td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">重さ</td>
                      <td style="width: 73.908%">
                        片足{{ spike.fields.spikeWeightNumber }}（26cm）
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">対応種目</td>
                      <td style="width: 73.908%">{{ spike.fields.spikeEvent }}</td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">サイズ</td>
                      <td style="width: 73.908%">
                        {{ spike.fields.spikeMinSiza }}cm〜{{ spike.fields.spikeMaxSize }}cm
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">対応環境</td>
                      <td style="width: 73.908%">{{ spike.fields.spikeEnvironment }}</td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">アッパー素材</td>
                      <td style="width: 73.908%">{{ spike.fields.spikeUpperMaterial }}</td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">ソール素材</td>
                      <td style="width: 73.908%">{{ spike.fields.spikeSoleMaterial }}</td>
                    </tr>
                    <tr>
                      <td style="width: 26.092%">備考</td>
                      <td style="width: 73.908%">
                        {{ spike.fields.spikePinLength }}mm{{ spike.fields.spikePinType }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <b-button pill variant="outline-secondary">今すぐネットで購入する</b-button>

                <h2>一流選手に聞いてみた！</h2>
                <div
                  class="blog-content"
                  v-html="$md.render(spike.fields.spikePlayerQuestion)"
                ></div>
                <b-img
                  :src="spike.fields.spikePlayerListPhoto[0].fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>

                <h2>商品紹介</h2>
                <h3>アッパーについて</h3>
                <b-img
                  :src="spike.fields.spikeUpperPhotoNear.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeUpperDiscription1 }}</p>

                <b-img
                  :src="spike.fields.spikeUpperPhotoFar.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeUpperDescription2 }}</p>

                <h3>ソールについて</h3>
                <b-img
                  :src="spike.fields.spikeSolePhotoFar.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <b-img
                  :src="spike.fields.spikeSolePhotoNear.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeSoleDiscription }}</p>
                <b-img
                  :src="spike.fields.spikeAnglePhoto.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeAngleDiscription }}</p>

                <h2>こんな人にオススメ</h2>
                <p>{{ spike.fields.spikeRecomend }}</p>

                <b-button pill variant="outline-secondary">今すぐネットで購入する</b-button>
              </b-card-text>
            </b-tab>
            <b-tab title="口コミ">
              <b-card-text>Tab contents 2</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";
import BarChart from "@/components/Molecule/BarChart.vue";

interface Data {
  spikeId: number;
  spike: any;
}

export default Vue.extend({
  components: {
    BarChart,
  },
  data(): Data {
    return {
      spikeId: 0,
      spike: {},
    };
  },
  async asyncData({ payload, params }) {
    const spike = !!payload
      ? payload
      : await contentfulClient
          .getEntries({
            content_type: "spike",
            "fields.id": params.id,
          })
          .then((e: any) => {
            e.items?.forEach((item: any, index: number) => {
              console.log(index + "つめdayo");
              console.log(item);
            });

            return e.items[0];
          });

    return { spikeId: spike.sys.id, spike };
  },
  created() {},
  methods: {},
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 800px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
