<template>
  <div class="container">
    <div>
      <h1 class="itemTitle">
        {{ spike.fields.spikeMaker[0] }}<br />{{ spike.fields.spikeTitle }} 評価レビュー
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
      <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn>
      <p>{{ spike.fields.spikeDescription }}</p>

      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="詳細" active>
              <b-card-text>
                <BarChart />
                <b-button pill variant="primary">他の靴と比較する</b-button>

                <h2>基本情報</h2>

                <table class="basicInfo">
                  <tbody>
                    <tr>
                      <td>定価価格</td>
                      <td>{{ spike.fields.spikePrice }}円（税込）</td>
                    </tr>
                    <tr>
                      <td>重さ</td>
                      <td>片足{{ spike.fields.spikeWeightNumber }}（26cm）</td>
                    </tr>
                    <tr>
                      <td>対応種目</td>
                      <td>{{ spike.fields.spikeEvent }}</td>
                    </tr>
                    <tr>
                      <td>サイズ</td>
                      <td>{{ spike.fields.spikeMinSiza }}cm〜{{ spike.fields.spikeMaxSize }}cm</td>
                    </tr>
                    <tr>
                      <td>対応環境</td>
                      <td>{{ spike.fields.spikeEnvironment }}</td>
                    </tr>
                    <tr>
                      <td>アッパー素材</td>
                      <td>{{ spike.fields.spikeUpperMaterial }}</td>
                    </tr>
                    <tr>
                      <td>ソール素材</td>
                      <td>{{ spike.fields.spikeSoleMaterial }}</td>
                    </tr>
                    <tr>
                      <td>備考</td>
                      <td>{{ spike.fields.spikePinLength }}mm{{ spike.fields.spikePinType }}</td>
                    </tr>
                  </tbody>
                </table>

                <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn>

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
                <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn>
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
import purchaseBtn from "@/components/Atom/purchaseBtn.vue";

interface Data {
  spikeId: number;
  spike: any;
}

export default Vue.extend({
  components: {
    BarChart,
    purchaseBtn,
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
});
</script>
