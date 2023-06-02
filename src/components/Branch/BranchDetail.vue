<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h4><b>DETAIL BRANCH {{branchName}}</b></h4>
        <hr />
          <div class="row">
             <div class="col-5">
                  <div class="row">
                    <div class="col-md-5 form-group">
                      <small class="float-left mb-2" for>
                      <b> Filter by Category:</b></small>
                      <select
                        v-model="query_params.category"
                        class="form-control"
                      >
                        <option value="all">All</option>
                        <option value="Finance">Finance</option>
                        <option value="Bengkel">Bengkel</option>
                        <option value="Unit">Unit</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div class="col-md-5 form-group">
                       <small class="float-left mb-2" for>
                      <b> Filter by Month:</b></small>
                      <select
                        v-model="query_params.month"
                        class="form-control"
                      >
                        <option value="all">All</option>
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
                        <option value="Desember">December</option>
                      </select>
                    </div>

                    <div class="col-md-2 form-group">
                       <small class="float-left mb-2" for>
                          <b> Size:</b>
                        </small>
                      <select v-model="query_params.size" class="form-control">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div class="card-body">
         <template v-if="isLoading">
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

        <b-table v-else
          :responsive="true"
          striped
          hover
          :items="datas.data"
          :fields="fields"
          show-empty
          :tbody-transition-props="transProps"
        >
          <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
          <template #head()="scope">
            <div class="text-nowrap">
              {{ scope.label }}
            </div>
          </template>

          <template v-slot:cell(branchDetailArea)="row">
            <div style="width: 12rem">
              {{row.item ? row.item.branchDetail.area : ''}}
            </div>
          </template>

          <template v-slot:cell(branchDetailPointCheck)="row">
            <div style="width: 12rem">
              {{ row.item ? row.item.branchDetail.point_check : '' }}
            </div>
          </template>

          <template v-slot:cell(branchDetailList)="row">
            <div style="width: 25rem">
              {{ row.item ? row.item.branchDetail.list : '' }}
            </div>
          </template>

          <template v-slot:cell(branchDetailCheckList)="row">
            <div >
              {{ row.item ? row.item.branchDetail.check_list : '' }}
            </div>
          </template>

          <template v-slot:cell(branchDetailCategoryName)="row">
            <div >
              {{ row.item ? row.item.branchDetail.category.name : '' }}
            </div>
          </template>

          <template v-slot:cell(branchDetailNoPrio)="row">
            <div >
              {{ row.item ? row.item.branchDetail.no_prio : '' }}
            </div>
          </template>

          <template v-slot:cell(status)="row">
            <div v-if="role == 2">
                <span v-if="row.item.status == 1" class="badge bg-success text-white">Success</span>
                <span v-else class="badge bg-warning text-white">In Progress</span>
            </div> 
            <div  style="width: 10rem"  v-else>
                <span v-if="row.item.status == 1" class="badge bg-success text-white " style="cursor: pointer;" @click="updateStatus(row.item)">Success</span>
                <span v-else class="badge bg-warning text-white" @click="updateStatus(row.item)" style="cursor: pointer;">In Progress</span>
            </div>
          </template>

          <template v-slot:cell(score)="row">
            <div  style="width: 10rem">
              <span v-if="row.item.score <=0" class="badge bg-danger text-white " >X</span>
              <span v-else class="badge bg-success text-white">V</span>
            </div>
          </template>

          <template v-slot:cell(upload_proof_url)=row>
              <div style="width: 25rem" class="form-group" :hidden="role == 2 ? false : true">
              <div class="image-preview" v-if="row.item.upload_proof_url.length > 0">
                  <img class="preview" :src="row.item.upload_proof_url">
              </div>
              <br />
              <button
                v-if="row.item.score <= 0"
                class="btn btn-info btn-sm ml-1"
                @click="uploadEvidancev2(row.item)"
              >
                <i class="fa fa-upload"></i> Upload
              </button>
            </div>

            <div class="form-group" :hidden="role == 1 ? false : true">
              <div class="image-preview" v-if="row.item.upload_proof_url.length > 0">
                  <img class="preview" :src="row.item.upload_proof_url">
              </div>
              <br />
            </div>
          </template>
        </b-table>

        <div class="row">
          <div class="col-md-6">
            <p v-if="datas.data" class="float-left">
              <i class="fa fa-bars"></i> {{ datas.data.length }} item dari
              {{ datas.total_items }} total data
            </p>
          </div>
          <div class="col-md-6">
            <div class="float-right">
              <b-pagination
                v-model="page"
                :total-rows="datas.total_items"
                :per-page="datas.total_item_page"
                aria-controls="datas.data"
                v-if="datas.data && datas.data.length > 0"
              >
              </b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
  </div>
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "DataBranchDetail",
  async created() {
    this.$store.commit("branch/SET_PAGE", 1);
    this.$store.commit("branch/SET_SIZE", 5);
    this.$store.commit("branch/SET_LOADING", true);
    this.$store.commit("branch/SET_BRANCH_CODE", this.$route.params.branch_code);
    await this.getBranchDetail();
  },
  data() {
    return {
      fields: [
        { key: "branchDetailCheckList", label: "Check List" },
        { key: "branchDetailCategoryName", label: "Category" },
        { key: "branchDetailArea", label: "Area" },
        { key: "branchDetailPointCheck", label: "Point Check",  tdClass: 'text-left'},
        { key: "branchDetailNoPrio", label: "No" },
        { key: "branchDetailList", label: "List",  tdClass: 'text-left'},
        { key: "month", label: "Month" },
        { key: "score", label: "Grade" },
        { key: "upload_proof_url", label: "Evidance" },
        { key: "status", label: "Status" },
      ],
      transProps: {
        name: "flip-list",
      },
      isBusy: false,
      branch :{
          upload_proof_url: ""
      },
      query_params: {
        size: this.$store.state.branch.size,
        category: "all",
        month: "all"
      },
    };
  },
  computed: {
    ...mapState("branch", {
      datas: (state) => state.branch,
    }),
    isLoading: {
      get() {
        return this.$store.state.branch.isLoading;
      },
    },
    role: {
      get() {
          return this.$store.state.role;
        },
    },
    branchName: {
      get() {
        return this.$store.state.branch.branch_info.branch_name
      }
    },
    branch_code: {
      get() {
          return this.$route.params.branch_code;
        },
    },
    page: {
      get() {
        return this.$store.state.branch.page;
      },
      set(val) {
        this.$store.commit("branch/SET_PAGE", val);
      },
    },
    size: {
      get() {
        return this.query_params.size;
      },
    },
    category: {
      get() {
        return this.query_params.category;
      },
    },
    month: {
      get() {
        return this.query_params.month;
      },
    }
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
    page() {
      this.getBranchDetail(this.query_params);
    },
    size() {
      this.$store.commit("branch/SET_SIZE", this.query_params.size);
      this.getBranchDetail(this.query_params);
    },
    category() {
      this.getBranchDetail(this.query_params);
    },
    month() {
      this.getBranchDetail(this.query_params);
    },
  },
  methods: {
    ...mapActions("branch", [
      "getBranchDetail",
      "updateEvidence",
      "updateStatusBranchDetailMonthly"
    ]),

    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
              // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
              // Read image as base64 and set to imageData
              this.branch.upload_proof_url = e.target.result;
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);
      }
    },

    async uploadEvidancev2(item) {
      const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmation",
      cancelButtonText: "Back",
    })

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
         let payload = {
          "id": item.id,
          "upload_proof_url": e.target.result
        }
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture',
          imageWidth: 700,
          imageHeight: 400,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Upload",
          cancelButtonText: "Back",
        }).then((result) => {
        if (result.isConfirmed) {
          this.updateEvidence(payload);
        }
        })
      }
      reader.readAsDataURL(file)
    }
    },

    async updateStatus(item) {
      let payload = {
        "id": item.id,
      }

    Swal.fire({
        title: "Apakah anda yakin?",
        input: 'select',
        inputOptions: {
          '0': 'OnProgress',
          '1': 'OK'
        },
        inputValue: item.status,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ya, ubah!",
      }).then((result) => {
        if (result.isConfirmed) {
          payload['status'] = result.value
          this.updateStatusBranchDetailMonthly(payload);
        }
      });
    },

    bulkCreate(){
      const {value: file}=  Swal.fire({
        title: 'Select File',
        input: 'file',
        inputAttributes: {
          'accept': '.csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
          'aria-label': 'Bulk Create Branch'
        },
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Upload",
        showCloseButton: true,
        showCancelButton: true
      })

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = utils.sheet_to_json(ws, { header: 1 });

          let bulkData = []
          for (let index = 1; index < data.length; index++) {
            const element = data[index];
            
            if (element.length <= 0) {
              continue
            }

            bulkData.push({
              "check_list": element[0],
              "category_id": element[1],
              "area": element[2],
              "point_check": element[3],
              "no_prio": element[4],
              "list": element[5],
              "month": element[6],
              "actual": element[7],
              "score": element[8],
              "grade": element[9],
              "status": element[10],
              "branch_id": element[11],
              "branch_detail_id": element[12],
            })
          }
          
          this.$store.commit("branch/SET_LOADING", true);
          this.bulkCreateBranch({"branches": bulkData})
        }

        reader.readAsBinaryString(file);
      }
    },
  }
};
</script>
