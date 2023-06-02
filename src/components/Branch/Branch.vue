<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h4><b>MANAGE BRANCH</b>
        </h4>
        <hr />
          <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-md-2 form-group">
                    <small class="float-left ml-2 mb-2" for
                    ><b> Search:</b></small>
                    <select
                      v-model="query_params.typeSearch"
                      class="form-control"
                    >
                      <option value="branch_code">Branch Code</option>
                      <option value="branch_name">Branch Name</option>
                    </select>
                  </div>  

                  <div class="col-md-4 mt-1 form-group">
                    <br/>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Type for Searching..."
                      v-model="query_params.search"
                    />
                  </div>

                  <div class="col-md-4"></div>

                  <div class="col-md-1 pl-2 form-group">
                      <small class="float-left ml-1 mb-2" for>
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
                <div class="row">
                  <div class="col-md-1 form-group">
                    <button @click="bulkCreate()"
                          class="btn btn-success btn-sm">
                          <i class="fa fa-upload"></i> Upload
                        </button>
                  </div>
                </div>
              </div>
          </div>

      </div>

      <div class="card-body">
          <div v-if="isLoading" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          
        <b-table v-else
          :responsive="true"
          striped
          hover
          :items="datas.data"
          :fields="fields"
          show-empty
          :tbody-transition-props="transProps">

          <template #cell(actions)="row">
                <router-link :to="{ 
                  name: 'branch.branch_detail', 
                  params: {branch_code: row.item ? row.item.branch_code : ''} 
                  }" 
                class="btn btn-info btn-sm text-white"><i class="fa fa-eye"></i>
                </router-link>
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
                v-if="datas.data && datas.data.length > 0">
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
import { read, utils } from 'xlsx';


export default {
  name: "DataBranch",
  async created() {
    this.$store.commit("branch/SET_SIZE", 5);
    this.$store.commit("branch/SET_LOADING", true);
    await this.getbranch();
  },
  data() {
    return {
      fields: [
        { key: "branch_code", label: "Branch Code" },
        { key: "branch_name", label: "Branch Name" },
        { key: "actions", label: "Action" },
      ],
      transProps: {
        name: "flip-list",
      },
      isBusy: false,

      query_params: {
        size: this.$store.state.branch.size,
        typeSearch: "branch_code",
        search: "",
        forSearchSelect: "",
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
    search: {
      get() {
        return this.query_params.search;
      },
    },
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
      this.getbranch(this.query_params);
    },
    size() {
      this.$store.commit("branch/SET_SIZE", this.query_params.size);
      this.getbranch(this.query_params);
    },
    search() {
      this.getbranch(this.query_params);
    },
  },
  methods: {
    ...mapActions("branch", [
      "getbranch",
      "bulkCreateBranch"
    ]),

    async bulkCreate(){
      const {value: file}= await Swal.fire({
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
              "branch_code": element[0],
              "branch_name": element[1]
            })
          }
          
          this.$store.commit("branch/SET_LOADING", true);
          this.bulkCreateBranch({"branches": bulkData})
        }

        reader.readAsBinaryString(file);
      }
    },
  },
};
</script>
