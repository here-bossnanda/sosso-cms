<template>
  <Modal
  :title="this.datas.title"
  v-model:visible="this.isVisible" 
  :closable="false"
  :cancelButton="{text: 'Cancel', onclick: cancel}"
  :okButton="{ text: 'Ok', onclick: cancel }">
    <div class="card-body">
        <b-table
          :responsive="true"
          striped
          hover
          :items="this.datas.data"
          :fields="fields"
          show-empty
          :tbody-transition-props="transProps">
        </b-table>

        <div class="row">
          <div class="col-md-6">
            <p v-if="this.datas.data" class="float-left">
              <i class="fa fa-bars"></i> {{ this.datas.data.length }} item dari
              {{ this.datas.total_items }} total data
            </p>
          </div>
          <div class="col-md-6">
            <div class="float-right">
              <b-pagination
                v-model="page"
                :total-rows="this.datas.total_items"
                :per-page="this.datas.total_item_page"
                aria-controls="this.datas.data"
                v-if="this.datas.data && this.datas.data.length > 0">
              </b-pagination>
            </div>
          </div>
        </div>
      </div>
  </Modal>
</template>

<script>
import { computed } from 'vue';
import { mapActions,useStore } from "vuex";
import { Modal } from 'usemodal-vue3';

export default {
  name: 'ModalChart',
  components: { Modal },
  props: ["isVisible","title","datas", "categoryID"],
  setup(props) {
    const store = useStore()

    let title = computed(() => {
      return props.title
    })

      let query_params =  {
      branch_code: "",
      month: "",
      category_id: props.categoryID
    }

     const fields = [
        { key: "branch_code", label: "Branch Code" },
        { key: "branch_name", label: "Branch Name" },
        { key: "final_score", label: "Percetange" },
      ]
      const transProps = {
        name: "flip-list",
      }
      const isBusy = false

    return { title , fields, transProps, isBusy, query_params}
  },
  computed: {
    page: {
      get() {
        return this.$store.state.branch.pageTableDashbord;
      },
      set(val) {
        this.$store.commit("branch/SET_PAGE_DASHBOARD", val);
      },
    },
    size: {
      get() {
        return this.query_params.sizeTableDashboard;
      },
    },
  },
  watch: {
    page() {
      if (this.$props.categoryID == this.$store.state.branch.categoryID) {
        console.log(this.query_params);
        this.getTableData(this.query_params);
      }
    },
    size() {
      this.$store.commit("branch/SET_SIZE_DASHBOARD", this.query_params.size);
      this.getTableData(this.query_params);
    },
  },
  methods: {
    ...mapActions("branch", [
      "getTableData",
    ]),
    cancel() {
      this.$emit("isVisible", false)
    }
  }
}
</script>

<style>

</style>