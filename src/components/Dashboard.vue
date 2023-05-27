<template>
  <div id="dasboardContent">
    <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                    </div>

                    <!-- Content Row -->
                    <!-- <div class="row"> -->

                        <!-- Earnings (Monthly) Card Example -->
                        <!-- <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Registration</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{datas.allTotal}}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <!-- Earnings (Monthly) Card Example -->
                        <!-- <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total Swab Success</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{datas.totalSuccess}}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <!-- Earnings (Monthly) Card Example -->
                        <!-- <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Registration Today
                                            </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{datas.totalRegistrationToday}}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <!-- Pending Requests Card Example -->
                        <!-- <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Total Pending</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{datas.totalPending}}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    <!-- </div> -->

                    <!-- Content Row -->

                    <div class="row">
                        <!-- Area Chart -->
                        <div class="col-xl-12 col-lg-11">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-success">Welcome to Dashboard</h6>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                        <div class="text-center">
                                          <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 20rem;" src="@/assets/login-page.svg" alt="">
                                        </div>
                                        <h4>Welcome to Dashboard Optimalisasi Supervisi SO</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     <!-- Content Row -->

                    <div class="row">
                        <!-- Area Chart -->
                        <div class="col-xl-6 col-lg-11">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-success">Percentage Final Score Branch</h6>
                                    <div class="dropdown no-arrow">
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                    </div>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <!-- <Bar
                                        id="my-chart-id"
                                        :options="chartOptions"
                                        :data="chartData"
                                    /> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import { Bar } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'Dashboard',
  
  created() {
    this.getDashboardData();
  },
   data() {
    return {
    //   chartData: {
    //     labels: [ 'January', 'February', 'March' ],
    //     datasets: [ { data: [40, 20, 12] } ]
    //   },
    //   chartOptions: {
    //     responsive: true
    //   }
    }
  },
//   components: { Bar },
  computed: {
    ...mapState("userRegistration", {
      datas: (state) => state.dashboardInfo,
    }),
  },
  methods: {
    ...mapActions("userRegistration", [
      "getDashboardData",
    ]),
  }
}
</script>

<style>

</style>
