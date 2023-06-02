import router from "../router";
import $axios from "../api/axios";

const state = () => ({
  branch_info: {},
  branch: [],
  dashboardInfo: {},
  dashboardInfoTable: {},
  dashboardChartAllInfo: {},
  dashboardChartBengkelInfo: {},
  dashboardChartFinanceInfo: {},
  dashboardChartUnitInfo: {},
  dashboardChartAnotherInfo: {},
  category: [],
  branch_code: "",
  branch_detail_id: 0,
  branch_name: "",
  page: 1,
  pageTableDashbord: 1,
  categoryID: 0,

  size: 5,
  sizeTableDashbord: 5,

  sizeBranchDashboard: 100,
  isLoading: false,
  isLoadingChart: false,
});

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.branch = payload;
  },
  ASSIGN_BRANCH_INFO(state, payload) {
    state.branch_info = payload;
  },
  ASSIGN_DASHBOARD(state, payload) {
    state.dashboardInfo = payload;
  },
  ASSIGN_DASHBOARD_DATA_TABLE(state, payload) {
    state.dashboardInfoTable = payload;
  },
  ASSIGN_DASHBOARD_CHART_ALL_INFO(state, payload) {
    state.dashboardChartAllInfo = payload;
  },

  ASSIGN_DASHBOARD_CHART_BENGKEL_INFO(state, payload) {
    state.dashboardChartBengkelInfo = payload;
  },

  ASSIGN_DASHBOARD_CHART_FINANCE_INFO(state, payload) {
    state.dashboardChartFinanceInfo = payload;
  },

  ASSIGN_DASHBOARD_CHART_UNIT_INFO(state, payload) {
    state.dashboardChartUnitInfo = payload;
  },

  ASSIGN_DASHBOARD_CHART_ANOTHER_INFO(state, payload) {
    state.dashboardChartAnotherInfo = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  SET_CATEGORY(state, payload) {
    state.categoryID = payload;
  },
  SET_SIZE(state, payload) {
    state.size = payload;
    state.page = 1;
  },

  SET_PAGE_DASHBOARD(state, payload) {
    state.pageTableDashbord = payload;
  },
  SET_SIZE_DASHBOARD(state, payload) {
    state.sizeTableDashbord = payload;
    state.pageTableDashbord = 1;
  },
  SET_SIZE_BRANCH_DASHBOARD(state, payload) {
    state.sizeBranchDashboard = payload;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },

  SET_LOADING_CHART(state, payload) {
    state.isLoadingChart = payload;
  },
  SET_BRANCH_DETAIL_ID(state, payload) {
    state.branch_detail_id = payload;
  },
  SET_BRANCH_CODE(state, payload) {
    state.branch_code = payload;
  },
  SET_BRANCH_NAME(state, payload) {
    state.branch_name = payload;
  },
};

const actions = {
  getbranch({ commit, state }, payload) {
    let search = typeof payload !== "undefined" ? payload.search : "";
    let typeSearch = typeof payload !== "undefined" ? payload.typeSearch : "";
    let forSearchSelect =
      typeof payload !== "undefined" ? payload.forSearchSelect : "";

    $axios
      .get(
        `/branch?page=${state.page}&size=${state.size}&type_search=${typeSearch}&search=${search}&for_search_select=${forSearchSelect}`
      )
      .then((response) => {
        commit("ASSIGN_DATA", response.data);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
      });
  },

  getBranchDetail({ commit, state }, payload) {
    let category_name = typeof payload !== "undefined" ? payload.category : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/${state.branch_code}?page=${state.page}&size=${state.size}&category_name=${category_name}&month=${month}`
      )
      .then((response) => {
        commit("SET_BRANCH_NAME", false);
        commit("ASSIGN_DATA", response.data);
        commit("ASSIGN_BRANCH_INFO", response.data.branch);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
      });
  },

  getBranchDetailMonthly({ commit, state }, payload) {
    $axios
      .get(
        `/branch/detail/${state.branch_detail_id}?page=${state.page}&size=${state.size}`
      )
      .then((response) => {
        commit("SET_BRANCH_NAME", false);
        commit("ASSIGN_DATA", response.data);
        commit("ASSIGN_BRANCH_INFO", response.branch);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
      });
  },

  updateEvidence({ dispatch }, data) {
    let payload = {};

    if (data.upload_proof_url != "") {
      payload["upload_proof_url"] = data["upload_proof_url"];
    }

    $axios
      .patch(`/branch/detail/${data.id}`, payload)
      .then((response) => {
        dispatch("getBranchDetail").then(() => {
          Swal.fire("Success!", `Successfully updated data`, "success");
        });
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }

        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  updateStatusBranchDetailMonthly({ dispatch }, data) {
    $axios
      .patch(`/branch/detail/status/${data.id}`, data)
      .then((response) => {
        dispatch("getBranchDetail").then(() => {
          Swal.fire("Success!", `Successfully updated data`, "success");
        });
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }

        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getTableData({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let month = typeof payload !== "undefined" ? payload.month : "";
    let category_id = typeof payload !== "undefined" ? payload.category_id : "";

    $axios
      .get(
        `/branch/dashboard/detail?page=${state.pageTableDashbord}&size=${state.sizeTableDashbord}&branch_code=${branch}&month=${month}&category_id=${category_id}`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD_DATA_TABLE", response.data);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getChartData({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let category_id = typeof payload !== "undefined" ? payload.category_id : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/dashboard/chart-bar?branch_code=${branch}&category_id=${category_id}&month=${month}`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD", response.data);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getPieAll({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let checkList = typeof payload !== "undefined" ? payload.check_list : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/dashboard/chart-pie?branch_code=${branch}&check_list=${checkList}&month=${month}&category_id=`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD_CHART_ALL_INFO", response.data);
        commit("SET_LOADING_CHART", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getPieBengkel({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let checkList = typeof payload !== "undefined" ? payload.check_list : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/dashboard/chart-pie?branch_code=${branch}&check_list=${checkList}&month=${month}&category_id=3`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD_CHART_BENGKEL_INFO", response.data);
        commit("SET_LOADING_CHART", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getPieFinance({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let checkList = typeof payload !== "undefined" ? payload.check_list : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/dashboard/chart-pie?branch_code=${branch}&check_list=${checkList}&month=${month}&category_id=2`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD_CHART_FINANCE_INFO", response.data);
        commit("SET_LOADING_CHART", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getPieAnother({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let checkList = typeof payload !== "undefined" ? payload.check_list : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/dashboard/chart-pie?branch_code=${branch}&check_list=${checkList}&month=${month}&category_id=4`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD_CHART_ANOTHER_INFO", response.data);
        commit("SET_LOADING_CHART", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  getPieUnit({ commit, state }, payload) {
    let branch = typeof payload !== "undefined" ? payload.branch_code : "";
    let checkList = typeof payload !== "undefined" ? payload.check_list : "";
    let month = typeof payload !== "undefined" ? payload.month : "";

    $axios
      .get(
        `/branch/dashboard/chart-pie?branch_code=${branch}&check_list=${checkList}&month=${month}&category_id=1`
      )
      .then((response) => {
        commit("ASSIGN_DASHBOARD_CHART_UNIT_INFO", response.data);
        commit("SET_LOADING_CHART", false);
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },

  bulkCreateBranch({ dispatch, commit }, data) {
    $axios
      .post(`/branch/bulk`, data)
      .then((response) => {
        dispatch("getbranch").then(() => {
          commit("SET_LOADING", false);
          Swal.fire("Success!", `Successfully bulk create data`, "success");
        });
      })
      .catch((error) => {
        if (error.response.data.errors === "jwt expired") {
          localStorage.setItem("token", null);
          localStorage.setItem("role", null);
          commit("SET_TOKEN", null, { root: true });
          commit("SET_ROLE", null, { root: true });
          router.push({ name: "login" });
        }
        Swal.fire("Error!", `${error.response.data.errors}`, "error");
      });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
