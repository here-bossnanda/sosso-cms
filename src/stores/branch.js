import router from "../router";
import $axios from "../api/axios";

const state = () => ({
  branch_info: {},
  branch: [],
  dashboardInfo: {},
  category: [],
  branch_code: "",
  branch_detail_id: 0,
  branch_name: "",
  page: 1,
  size: 5,
  isLoading: false,
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
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  SET_SIZE(state, payload) {
    state.size = payload;
    state.page = 1;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
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

    $axios
      .get(
        `/branch?page=${state.page}&size=${state.size}&type_search=${typeSearch}&search=${search}`
      )
      .then((response) => {
        commit("SET_LOADING", false);
        commit("ASSIGN_DATA", response.data);
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
        commit("SET_LOADING", false);
        commit("SET_BRANCH_NAME", false);
        commit("ASSIGN_DATA", response.data);
        commit("ASSIGN_BRANCH_INFO", response.branch);
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
        commit("SET_LOADING", false);
        commit("SET_BRANCH_NAME", false);
        commit("ASSIGN_DATA", response.data);
        commit("ASSIGN_BRANCH_INFO", response.branch);
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

    console.log(data);

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
  // getDashboardData({ commit, state }, payload) {
  //   $axios
  //     .get(`/users-registration/dashboard`)
  //     .then((response) => {
  //       commit("ASSIGN_DASHBOARD", response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response.data.errors === "jwt expired") {
  //         localStorage.setItem("token", null);
  //         localStorage.setItem("role", null);
  //         commit("SET_TOKEN", null, { root: true });
  //         commit("SET_ROLE", null, { root: true });
  //         router.push({ name: "login" });
  //       }
  //     });
  // },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
