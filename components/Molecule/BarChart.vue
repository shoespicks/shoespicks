<script>
import { Radar } from "vue-chartjs";
import { contentfulClient } from "~/plugins/contentful";
export default {
  extends: Radar,
  data() {
    // var spikes = [1, 1, 1, 1, 1];
    console.log("テスト1");
    return {
      spike: [],
      chartdata: {
        labels: ["軽さ", "広さ", "ソールの反り", "グリップ力", "反発性"],
        datasets: [
          {
            label: ["Data One"],
            backgroundColor: "rgba(6, 147, 200, 0.4)",
            data: [1, 1, 1, 1, 1],
            // data: this.spike,
            // data: spike,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scale: {
          pointLabels: {
            fontSize: 14,
          },
          ticks: {
            //目盛りの設定
            suggestedMin: 0,
            suggestedMax: 5,
            stepSize: 1,
          },
        },
      },
    };
    console.log("これだ：　" + this.spike);
    console.log("テスト");
  },
  mounted() {
    // this.renderChart(this.chartdata, this.options);
    // this.getChartData();
    this.renderChart(this.chartdata, this.options);
  },
  methods: {
    getChartData() {
      contentfulClient
        .getEntries({
          content_type: "spike",
          "fields.spike.spikeWeight[lt]": 5,
          "fields.spike.spikeWidth[lt]": 5,
          "fields.spike.spikeGlip[lt]": 5,
          "fields.spike.spikeAngle[lt]": 5,
          "fields.spike.spikeResilience[lt]": 5,
        })
        .then(({ items }) => (this.spike = items))
        .catch(console.error);
    },
  },
};
</script>
