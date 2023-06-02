<template>
  <div id="dasboardContent">
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <div class="row">
          <!-- Area Chart -->
          <div class="col-xl-6 col-lg-12">
            <DoughnutChartLocal v-if="!isLoading" :chartData="chartAllDataDoughnut"  categoryID="" name="All Category"/>
          </div>

          <div class="col-xl-6 col-lg-12">
            <DoughnutChartLocal v-if="!isLoading" :chartData="chartBengkelDataDoughnut"  categoryID="3" name="Category Bengkel"/>
          </div>

          <div class="col-xl-4 col-lg-12">
            <DoughnutChartLocal v-if="!isLoading" :chartData="chartFinanceDataDoughnut"  categoryID="2" name="Category Finance"/>
          </div>

          <div class="col-xl-4 col-lg-12">
            <DoughnutChartLocal v-if="!isLoading" :chartData="chartUnitDataDoughnut" categoryID="1" name="Category Unit"/>
          </div>

          <div class="col-xl-4 col-lg-12">
            <DoughnutChartLocal v-if="!isLoading" :chartData="chartAnotherDataDoughnut" categoryID="4" name="Category Another"/>
          </div>
      </div>
        <!-- Content Row -->

      <div class="row">
          <!-- Area Chart -->
          <div class="col-xl-12 col-lg-11">
              <BarChartLocal v-if="!isLoading" :chartData="chartDataInfo"  />
          </div>
      </div>
  </div>
</div>

</template>

<script>


import { computed, defineComponent, watch} from 'vue';
import { Chart, registerables } from "chart.js";
import { useStore } from "vuex";
import DoughnutChartLocal from './Chart/DoughnutChart.vue'
import BarChartLocal from './Chart/BarChart.vue'

import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default defineComponent({
  name: 'Home',
  components: { BarChartLocal, DoughnutChartLocal },
  setup() {
    const store = useStore()
    store.dispatch("branch/getChartData")
    store.dispatch("branch/getPieAll")
    store.dispatch("branch/getPieBengkel")
    store.dispatch("branch/getPieUnit")
    store.dispatch("branch/getPieAnother")
    store.dispatch("branch/getPieFinance")

    store.commit("branch/SET_LOADING", true);
    store.commit("branch/SET_SIZE", 100);

    store.dispatch("branch/getbranch")

    const isLoading = computed(() => {
      return store.state.branch.isLoading
    })

    watch(isLoading, (newLoading, oldLoading) => {
      if(newLoading) {
        swal = Swal.fire({
          title: "Please, waiting...",
          imageUrl: 'https://raw.githubusercontent.com/gist/brudnak/aba00c9a1c92d226f68e8ad8ba1e0a40/raw/e1e4a92f6072d15014f19aa8903d24a1ac0c41a4/nyan-cat.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showConfirmButton: false
        })
      } else {
        swal.close();
      }
    })
      

    const chartAllDataDoughnut = computed(() => {
      return store.state.branch.dashboardChartAllInfo
    })

    const chartBengkelDataDoughnut = computed(() => {
      return store.state.branch.dashboardChartBengkelInfo
    })

    const chartAnotherDataDoughnut = computed(() => {
      return store.state.branch.dashboardChartAnotherInfo
    })

    const chartFinanceDataDoughnut = computed(() => {
      return store.state.branch.dashboardChartFinanceInfo
    })

    const chartUnitDataDoughnut = computed(() => {
      return store.state.branch.dashboardChartUnitInfo
    })

    const chartDataInfo = computed(() => {
      return store.state.branch.dashboardInfo
    })

    return {
      chartAllDataDoughnut,
      chartBengkelDataDoughnut,
      chartAnotherDataDoughnut,
      chartFinanceDataDoughnut,
      chartUnitDataDoughnut,
      chartDataInfo,
      isLoading
    };
  },
});
</script>
