import axios from "axios";
import store from "../store.js";

const $axios = axios.create({
  baseURL: "https://sosso-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use(
  function(config) {
    const token = store.state.token;
    if (token) config.headers.access_token = token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default $axios;
