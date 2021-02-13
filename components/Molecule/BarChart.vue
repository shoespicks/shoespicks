<script>
import { Radar,mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
// import { contentfulClient } from "~/plugins/contentful";
export default {
  extends: Radar,
  mixins: [mixins.reactiveProp],
  
  
  // 親からspikeの情報を取得
  props: {
    parameter1:{
      type:Array,
      // default:null,
      },
    parameter2:{
      type:Array,
      // default:null,
      }
    },
  // props: ['parameter1', 'parameter2'],
  // チャートを5角形に設定
  watch: {
    parameter1:function(){    
      // data(parameter1, parameter2);
      console.log(this.chartdata.datasets);
      // this.chartdata.datasets[0].data = this.parameter1
      console.log("親Props変更");
      console.log(this.chartdata.datasets.data);
      this.renderChart(this.chartdata, this.options);
    },

    parameter2:function(){    
      // data(parameter1, parameter2);
      // this.chartdata.datasets[1].data = this.parameter2
      console.log("親Props変更");
      console.log(this.chartdata.datasets.data);
      this.renderChart(this.chartdata, this.options);
      }



      },


  data(parameter1, parameter2) {
    if(parameter2==null){
      console.log("parameter2はnull");
      // console.log(JSON.stringify(parameter1.parameter1));
      console.log(parameter1.parameter1)
      return {
        chartdata: {
          labels: ["軽さ", "広さ", "ソールの反り", "グリップ力", "反発性"],
          datasets: [
            {
              label: ["Data One"],
              backgroundColor: "rgba(6, 147, 200, 0.4)",
              borderColor: "rgba(6, 147, 200, 0.4)",
              fill:"origin",
              // data: [1,2,3,4,5],
              data: parameter1.parameter1,
              // data: JSON.stringify(parameter1.parameter1),
            }
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
    }
    else
    {
      console.log("両方あるよ");
      console.log(parameter1.parameter1);
      console.log(parameter2.parameter2);
      return {
      chartdata: {
        labels: ["軽さ", "広さ", "ソールの反り", "グリップ力", "反発性"],
        datasets: [
          {
            label: ["Data One"],
            backgroundColor: "rgba(6, 147, 200, 0.4)",
            borderColor: "rgba(6, 147, 200, 0.4)",
            fill:"origin",
            data: parameter1.parameter1,
            // data: JSON.stringify(parameter1.parameter1),
          },
          {
            label: ["Data two"],
            backgroundColor: "rgba(254,147,0, 0.4)",
            borderColor: "rgba(254,147,0, 0.4)",
            fill:"origin",
            data: parameter2.parameter2,
            // data: JSON.stringify(parameter2.parameter2),
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
  }
  },

  mounted() {
    // チャートでどこのデータ・どんな設定を使うか指定
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
