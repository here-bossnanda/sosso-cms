import $axios from '../api/axios'
import router from '../router'
import Swal from 'sweetalert2'

const state = () => ({
    isLoading: false,
});

const mutations = {
    SET_LOADING(state, payload) {
        state.isLoading = payload;
    },
};

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem('token', null)
        localStorage.setItem('role', null)
        commit('SET_TOKEN', null, { root: true })
        commit("SET_ROLE", null, { root: true });

        $axios.post('/login', payload)
            .then((response) => {
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem("role", response.data.role);

                commit('SET_TOKEN', response.data.access_token, { root: true })
                commit("SET_ROLE", response.data.role, { root: true });
                commit("SET_LOADING", false);
                router.push({ name: 'home' })
                Swal.fire(
                    'success!',
                    `Login successfully`,
                    'success'
                )
            })
            .catch((error) => {
                commit("SET_LOADING", false);
                Swal.fire(
                    'error!',
                    `${error.response.data.errors}`,
                    'error'
                )
            })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};