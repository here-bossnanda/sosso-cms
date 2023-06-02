<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h4><b>MANAGE USER</b></h4>
        <hr>
        <div class="float-left">
          <router-link :to="{ name: 'user.add' }" class="btn btn-primary btn-flat"><i class="fa fa-plus"></i> Tambah</router-link>
        </div>
        <div class="float-right">
            <input type="text" class="form-control"  placeholder="Cari..." v-model="search">
        </div>
      </div>
      
      <div class="card-body">
          <b-table
            :responsive="true"
            striped
            hover
            :items="datas.data"
            :fields="fields"
            show-empty
            :tbody-transition-props="transProps">
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>

            <template v-slot:cell(actions)="row">
                <router-link :to="{ name: 'user.edit', params: {id: row.item.id} }" class="btn btn-warning btn-sm"><i class="fa fa-pencil-alt"></i></router-link>
                <button class="btn btn-danger btn-sm ml-1" @click="deleteUser(row.item.id)"><i class="fa fa-trash"></i></button>
            </template>

            <template v-slot:cell(role)="row">
                <span v-if="row.item.role == 1" class="badge bg-success text-white" >Admin</span>
                <span v-else class="badge bg-warning text-white">User</span>
            </template>
        </b-table>

        <div class="row">
            <div class="col-md-6">
                <p v-if="datas.data" class="float-left"><i class="fa fa-bars"></i> {{ datas.data.length }} item dari {{ datas.total_items }} total data</p>
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'
import Multiselect from '@vueform/multiselect'

export default {
  name: 'DataUser',
  async created () {
   await this.getUsers();
  },
  data () {
    return {
      fields: [
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'actions', label: 'Action' }
      ],
      search: '',
      transProps: {
        name: 'flip-list'
      },
      isBusy: false,
      user: {
        email: '',
        password: '',
        role: 1,
        branches: []
      },
    }
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('user', {
      datas: state => state.users
    }),
    page: {
      get () {
        return this.$store.state.user.page
      },
      set (val) {
        this.$store.commit('user/SET_PAGE', val)
      }
    }
  },
  watch: {
    page () {
      this.getUsers()
    },
    search () {
      this.getUsers(this.search)
    }
  },
  methods: {
    ...mapActions('user', ['getUsers', 'removeUser']),

    deleteUser (id) {
      Swal.fire({
        title: 'Apakah anda yakin?',
        text: "data yang sudah dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ya, hapus!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeUser(id)
        }
      })
    },
  }
}
</script>
