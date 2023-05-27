import Swal from "sweetalert2";
import router from "../router";
import $axios from "../api/axios";

const state = () => ({
    users: [],
    category: [],
    page: 1,
    size: 5,
});

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.users = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload;
    },
};

const actions = {
    getUsers({ commit, state }, payload) {
        let search = typeof payload !== "undefined" ? payload : "";
        $axios
            .get(`/users?page=${state.page}&size=${state.size}&q=${search}`)
            .then((response) => {
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
    addUser({ dispatch }, payload) {
        console.log(payload);
        $axios
            .post(`/users/register`, payload)
            .then((response) => {
                dispatch("getUsers").then(() => {
                    Swal.fire("Success!", `berhasil menambah user`, "success");
                    router.push({ name: "user.data" });
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
    editUser({ commit }, payload) {
        return $axios.get(`/users/${payload}`);
    },
    updateUser({ dispatch }, payload) {
        $axios
            .put(`/users/${payload.id}`, payload)
            .then((response) => {
                dispatch("getUsers").then(() => {
                    Swal.fire("Success!", `Successfully updated data`, "success");
                });
                router.push({ name: "user.data" });
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
    removeUser({ dispatch, commit }, payload) {
        $axios
            .delete(`/users/${payload}`)
            .then((response) => {
                dispatch("getUsers").then(() => {
                    commit("SET_PAGE", 1);
                    Swal.fire("Deleted!", `${response.data.message}`, "success");
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