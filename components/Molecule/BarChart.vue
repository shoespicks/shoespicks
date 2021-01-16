<script>
import { Radar } from "vue-chartjs";
import { contentfulClient } from "~/plugins/contentful";
export default {
  // 親（id.vue）からspikeの情報を取得
  props: ["parameter", "parameter2"],
  // チャートを5角形に設定
  extends: Radar,
  data() {
    return {
      chartdata: {
        labels: ["軽さ", "広さ", "ソールの反り", "グリップ力", "反発性"],
        datasets: [
          {
            label: ["Data One"],
            backgroundColor: "rgba(6, 147, 200, 0.4)",
            data: [
              this.parameter.fields.spikeWeight,
              this.parameter.fields.spikeWidth,
              this.parameter.fields.spikeAngle,
              this.parameter.fields.spikeGlip,
              this.parameter.fields.spikeResilience,
            ],
          },
          {
            label: ["Data two"],
            backgroundColor: "rgba(254,147,0, 0.4)",
            data: [
              this.parameter2.fields.spikeWeight,
              this.parameter2.fields.spikeWidth,
              this.parameter2.fields.spikeAngle,
              this.parameter2.fields.spikeGlip,
              this.parameter2.fields.spikeResilience,
            ],
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
  },
  mounted() {
    // チャートでどこのデータ・どんな設定を使うか指定
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
