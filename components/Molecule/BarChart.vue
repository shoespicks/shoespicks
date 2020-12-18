<script>
import { Radar } from "vue-chartjs";
export default {
  extends: Radar,
  data() {
    return {
      chartdata: {
        labels: ["軽さ", "広さ", "ソールの反り", "グリップ力", "反発性"],
        datasets: [
          {
            label: ["Data One"],
            backgroundColor: "rgba(6, 147, 200, 0.4)",
            data: [4, 5, 1, 2, 3],
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
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
