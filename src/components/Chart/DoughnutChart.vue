<template>
  <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-success">Final Score {{name}}</h6>
          <div @click="filterChart" style="cursor: pointer;">
            <button class="btn btn-secondary btn-sm">
              <i class="fa fa-cog text-white"></i> Filter
            </button>
          </div>
      </div>
      <!-- Card Body -->
      <div class="card-body">
        <DoughnutChart v-bind="doughnutChartProps" />
      </div>
  </div>

  <ModalChart :datas="datas" :title="title" :isVisible="isVisible" @isVisible="closeModal" :categoryID="categoryID" />
</template>

<script>
import { computed, ref } from 'vue';
import { DoughnutChart, useDoughnutChart  } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useStore,mapState } from "vuex";

import ModalChart from './ModalChart.vue'
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
  name: 'DoughnutChartLocal',
  components: { DoughnutChart, ModalChart },
  props: ["chartData", "categoryID", "name"],
  setup(props, context) {
    const store = useStore()

    console.log(props.categoryID, "sebelum masuk ke variable");
    let categoryID = props.categoryID
    console.log(categoryID, "sesudah masuk ke variable");

    let query_params =  {
      branch_code: "",
      check_list: "",
      month: "",
      category_id: categoryID
    }

    let title = props.chartData.title

    let isVisible = ref(false);

    // doughnut all data chart
    const doughnutChartDataAll = computed(() => ({
      labels: props.chartData.labels,
      datasets: [
        {
          data: props.chartData.data,
          backgroundColor: props.chartData.color,
        },
      ],
    }));

    const optionsDoughnutAll = computed(() => ({
      scales: {
        myScale: {
          type: "logarithmic",  
        },
      },
      plugins: {
        responsive: true,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: props.chartData.title,
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
      },
      onClick: (c,e) => {
        if (e.length > 0) {
          store.commit("branch/SET_PAGE_DASHBOARD", 1)
          store.commit("branch/SET_SIZE_DASHBOARD", 5)
          store.commit("branch/SET_CATEGORY", categoryID)
          store.dispatch("branch/getTableData", query_params) 
          isVisible.value = true
        }
      },
    }));

    const { doughnutChartProps, doughnutChartRef } = 
    useDoughnutChart({
      chartData: doughnutChartDataAll,
      options: optionsDoughnutAll
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
        // selected="selected"
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
            query_params.category_id = props.categoryID

            switch (+props.categoryID) {
              case 1:
                store.dispatch('branch/getPieUnit', query_params)
                break;
              case 2:
                store.dispatch('branch/getPieFinance', query_params)
                break;
              case 3:
                store.dispatch('branch/getPieBengkel', query_params)
                break;
              case 4:
                store.dispatch('branch/getPieAnother', query_params)
                break;

              default:
                store.dispatch('branch/getPieAll', query_params)
                break;
            }
            
        }
    }

    const closeModal = () => {
      isVisible.value = false
    }

    return {
      query_params,
      doughnutChartProps, 
      doughnutChartRef,
      filterChart,
      isVisible,
      closeModal,
      title,
      categoryID
      };
  },
  computed: {
    ...mapState("branch", {
      datas: (state) => state.dashboardInfoTable,
    }),
  }
}
</script>

<style>

</style>