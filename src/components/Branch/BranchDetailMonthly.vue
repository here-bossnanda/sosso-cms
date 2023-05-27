<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h4><b>DETAIL MONTHLY BRANCH</b></h4>
        <hr />
          <div class="row">
              <div class="col-10">
              </div>
              <div class="col-2">
                <div class="col-md-12">
                  <div class="row">
                    <small class="float-left ml-1 mb-2" for>
                      <b> Size:</b>
                    </small>
                  </div>
                  <div class="row">
                    <div class="col-md-6 pl-2 form-group">
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
      </div>
      <div class="card-body">
        <b-table
          :responsive="true"
          striped
          bordered
          hover
          :busy.sync="isBusy"
          :items="datas.data"
          :fields="fields"
          show-empty
          outlined
          :tbody-transition-props="transProps"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(status)="row">
            <div v-if="role == 0">
                <span v-if="row.item.status == 1" class="badge bg-success text-white">Success</span>
                <span v-else class="badge bg-warning text-white">In Progress</span>
            </div> 
            <div v-else>
               <select v-model="row.item.status" class="form-control">
                <option value="0">On Progress</option>
                <option value="1">Ok</option>
              </select>
            </div>
          </template>
          <template v-slot:cell(upload_proof_url)=row>
                 <div class="form-group" :hidden="role == 0 ? false : true">
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
  name: "DataBranchDetailMonthly",
  created() {
    this.$store.commit("branch/SET_PAGE", 1);
    this.$store.commit("branch/SET_SIZE", 5);
    this.$store.commit("branch/SET_LOADING", true);
    this.$store.commit("branch/SET_BRANCH_DETAIL_ID", this.$route.params.id);
    this.getBranchDetailMonthly();
  },
  data() {
    return {
      fields: [
        { key: "month", label: "Month" },
        { key: "score", label: "Score" },
        { key: "upload_proof_url", label: "Evidance" },
        { key: "status", label: "Status" },
      ],
      branch :{
        upload_proof_url: ""
      },
      transProps: {
        name: "flip-list",
      },
      isBusy: false,

      query_params: {
        size: this.$store.state.branch.size,
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
      this.getDranchDetail(this.query_params);
    },

    size() {
      this.$store.commit("branch/SET_SIZE", this.query_params.size);
      this.getDranchDetail(this.query_params);
    },
  },
  methods: {
    ...mapActions("branch", [
      "getBranchDetailMonthly",
      "updateEvidence",
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
  },
};
</script>
