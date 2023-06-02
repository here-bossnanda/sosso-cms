<template>
  <div class="card shadow mb-4">
      <!-- Card Header - Dropdown -->
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-success">Percentage Bar Chart Final Score Branch</h6>
          <div @click="filterChart" style="cursor: pointer;">
            <button class="btn btn-secondary btn-sm">
              <i class="fa fa-cog text-white"></i> Filter
            </button>
          </div>
      </div>
      <!-- Card Body -->
      <div class="card-body">
          <BarChart v-bind="barChartProps"  />
      </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { BarChart, useBarChart, } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {  useStore } from "vuex";


Chart.register(...registerables, ChartDataLabels);

export default {
  name: 'BarChartLocal',
  components: { BarChart },
  props: ["chartData"],
  setup(props) {
    const store = useStore()

     let query_params =  {
      branch_code: "",
      check_list: "",
      month: "",
    }
    
    // bar chart
    const barChartData = computed(() => ({
        labels: props.chartData.labels,
        datasets: [
          {
            data: props.chartData.data,
            backgroundColor: props.chartData.color,
          },
        ],
      })
    );

    const options = computed(() => ({
    plugins: {
      legend: {
          display: false
      },
      title: {
          display: true,
          text: props.chartData.title
      },
        datalabels: {
        color: 'white',
          textAlign: 'center',
          font: {
            weight: "bold",
            size: 16
          },
        formatter: (value, ctx) => {
            return value+"%";
        },
      },
      responsive: true,
        animation: {
          onComplete: () => {
              delayed = true;
          },
          delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
          },
        }
      },
      scales: {
          x: {
              beginAtZero: true,
              max: 100,
              ticks: {
                  callback: (v, i, vals) => {
                      return `${v}.0%`
                  }
              }
          }
      },
      indexAxis: 'y',  
      }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData: barChartData,
      options
    });

    const filterChart = async () => {
        let dataBranchOption = ""
        let monthOption = ""

        const month = [
          {"value": "", "name":"All"},
          {"value": "Januari", "name":"January"},
          {"value": "Februari", "name":"February"},
          {"value": "Maret", "name":"March"},
          {"value": "April", "name":"April"},
          {"value": "Mei", "name":"Mei"},
          {"value": "Juni", "name":"June"},
          {"value": "Juli", "name":"July"},
          {"value": "Agustus", "name":"August"},
          {"value": "September", "name":"September"},
          {"value": "Oktober", "name":"October"},
          {"value": "November", "name":"November"},
          {"value": "Desember", "name":"December"},
        ]

        month.forEach(data => {
          if (data.value == query_params.month) {
            monthOption += `<option selected value="${data.value}">${data.name}</option>`
            
          }else {
            monthOption += `<option value="${data.value}">${data.name}</option>`
          }
        }) 

      store.state.branch.branch.data.unshift({"branch_code": "", "branch_name": "All"})
      store.state.branch.branch.data.forEach(a => {
        if (a.branch_code == query_params.branch_code) {
          dataBranchOption += `<option selected="selected" value='${a.branch_code}'>${a.branch_name}</option>`
        } else {
          dataBranchOption += `<option value='${a.branch_code}'>${a.branch_name}</option>`
        }
      });
      store.state.branch.branch.data.shift()
      const { value: formValues } = await Swal.fire({
        title: 'Filter Chart',
        html:
            `<div class="col-md-12 pl-2 form-group"> 
            <small class="float-left" for> <b> Branch:</b> </small> 
            <select id='swal-branch' class='swal2-input'> ${dataBranchOption} </select>  </div>`
            +
            `<div class="col-md-12 pl-2 form-group"> 
            <small class="float-left" for>  <b> Month:</b> </small> 
            <select id='swal-month' class='swal2-input'> ${monthOption} </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return {
                branch_code: document.getElementById('swal-branch').value,
                month: document.getElementById('swal-month').value
            }
            
        }
        })

        if (formValues) {
            query_params.branch_code = formValues.branch_code
            query_params.month = formValues.month

            store.dispatch("branch/getChartData", query_params)
        }
    }

    return{ barChartProps, barChartRef, filterChart}
  }
}
</script>

<style>

</style>