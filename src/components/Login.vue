<template>
    <div >
        <div class="container">
            <!-- Outer Row -->
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9 mt-5">
                    <div class="card o-hidden border-0 shadow-lg my-5 m-lg-5 pb-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h3 class="h4 text-gray-900 mb-1">Optimalisasi Supervisi SO</h3>
                                            <h1 class="h5 text-gray-900 mb-4">Welcome Back! </h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="email" v-model="data.email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address...">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" v-model="data.password" class="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password">
                                            </div>
                                            <a @click.prevent="login" class="btn btn-success btn-user btn-block">
                                                Login
                                            </a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    if (this.isAuth) {
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['errors']),
    isLoading: {
      get() {
        return this.$store.state.auth.isLoading;
      },
    },
  },
  watch: {
    isLoading(){
      if(this.isLoading) {
        swal = Swal.fire({
          imageUrl: 'https://raw.githubusercontent.com/gist/brudnak/aba00c9a1c92d226f68e8ad8ba1e0a40/raw/e1e4a92f6072d15014f19aa8903d24a1ac0c41a4/nyan-cat.gif',
          title: "Loading...",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Loading image',
          showConfirmButton: false
        })
      }
    },
  },
  methods: {
    ...mapActions('auth', ['submit']),
    ...mapMutations(['CLEAR_ERRORS']),

    login () {
      this.$store.commit("auth/SET_LOADING", true);
      this.submit(this.data)
      this.data.email = ''
      this.data.password = ''
    }
  }
}
</script>

<style scoped>
.bg-login-image {
    background: url('../assets/login-page.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 25rem;
}
</style>
