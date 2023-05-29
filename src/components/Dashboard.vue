<template>
  <div id="dasboardContent">
    <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>

    <div class="row">
        <!-- Area Chart -->
        <div class="col-xl-6 col-lg-11">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Welcome to Dashboard</h6>
                    
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
        <div class="col-xl-12 col-lg-11">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">Percentage Final Score Branch</h6>
                    <div @click="filterChart" style="cursor: pointer;">
                        <button
                    class="btn btn-secondary btn-sm"
                    >
                    <i class="fa fa-cog text-white"></i> Filter
                    </button>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                    <BarChart v-if="!isLoading" v-bind="barChartProps" />
                </div>
            </div>
        </div>
    </div>
</div>
    
</div>
</template>

<script>

 
import { ref, computed, defineComponent } from 'vue';
import { BarChart, useBarChart  } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { mapActions,mapState, useStore } from "vuex";

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  created() {
    this.getChartData();
    this.$store.commit("branch/SET_LOADING", true);

    this.$store.commit("branch/SET_SIZE", 100);
    this.getbranch()
  },
  components: { BarChart },
  setup() {
    const store = useStore()

    let query_params =  {
        branch_code: "",
        check_list: "",
        month: "",
      }

    const chartData = computed(() => ({
      labels: store.state.branch.dashboardInfo.labels,
      datasets: [
        {
          data: store.state.branch.dashboardInfo.data,
          backgroundColor: store.state.branch.dashboardInfo.color,
        },
      ],
      
    }));

    const options = computed(() => ({
         plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: store.state.branch.dashboardInfo.title
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
                    callback: (value, index, values) => {
                        return `${value}.0%`
                    }
                }
            }
        },
        indexAxis: 'y',
        
        
      }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options
    });

    return {  barChartProps, barChartRef, query_params };
  },
  computed: {
    ...mapState("branch", {
      datas: (state) => state.dashboardInfo,
    }),
    isLoading: {
      get() {
        return this.$store.state.branch.isLoading;
      },
    },
    //  branch_code: {
    //   get() {
    //     return this.query_params.branch_code;
    //   },
    //  },
    //   check_list: {
    //   get() {
    //     return this.query_params.check_list;
    //   },
    //   },
    //   month: {
    //   get() {
    //     return this.query_params.month;
    //   },
    //   }
  },
  watch: {
    isLoading(){
      if(this.isLoading) {
      swal = Swal.fire({
          title: "Please, waiting...",
          imageUrl: 'https://raw.githubusercontent.com/gist/brudnak/aba00c9a1c92d226f68e8ad8ba1e0a40/raw/e1e4a92f6072d15014f19aa8903d24a1ac0c41a4/nyan-cat.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showConfirmButton: false
        })
      }else {
        swal.close();
      }
    },

    //  branch_code: {
    //   get() {
    //     return this.query_params.branch_code;
    //   },
    // },
    // check_list: {
    //   get() {
    //     return this.query_params.check_list;
    //   },
    // },
    // month: {
    //   get() {
    //     return this.query_params.month;
    //   },
    // },
  },
  methods: {
    ...mapActions("branch", [
        "getbranch",
        "getChartData",
    ]),
    async filterChart(item) {
        let dataBranchOption = ""
       this.$store.state.branch.branch.data.forEach(a => {
        dataBranchOption += `<option value='${a.branch_code}'>${a.branch_name}</option>`
      });
      const { value: formValues } = await Swal.fire({
        title: 'Filter Chart',
        html:
            `<div class="col-md-12 pl-2 form-group"> <small class="float-left" for>
                      <b> Branch:</b>
                    </small> 
            <select id='swal-branch' class='swal2-input'> <option value="">All</option> ${dataBranchOption} </select> 
            </div>`+
            `<div class="col-md-12 pl-2 form-group"> <small class="float-left" for>
                      <b> Check List:</b>
                    </small> 
            <select id='swal-check-list' class='swal2-input'> <option value="">All</option> <option value='HO'>HO</option> <option value='Tambahan'>Tambahan</option> </select> 
            </div>`+
            `<div class="col-md-12 pl-2 form-group"> <small class="float-left" for>
                      <b> Month:</b>
                    </small> 
            <select id='swal-month' class='swal2-input'>  
                        <option value="">All</option>
                        <option value="Januari">January</option>
                        <option value="Februari">February</option>
                        <option value="Maret">March</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">June</option>
                        <option value="Juli">July</option>
                        <option value="Agustus">August</option>
                        <option value="September">September</option>
                        <option value="Oktober">October</option>
                        <option value="November">October</option>
                        <option value="Desember">December</option></select> 
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return {
                branch_code: document.getElementById('swal-branch').value,
                check_list: document.getElementById('swal-check-list').value,
                month: document.getElementById('swal-month').value
            }
            
        }
        })

        if (formValues) {
            this.$store.commit("branch/SET_LOADING", true);
            this.getChartData(formValues)
        }
  }
  }
});
</script>
