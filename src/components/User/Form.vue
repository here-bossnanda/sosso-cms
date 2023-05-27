<template>
  <div>
    <div class="form-group">
        <label for>Email</label>
        <input type="email" class="form-control" v-model="user.email" placeholder="Email">
    </div>
    <div class="form-group">
        <label for>Password</label>
        <input type="password" class="form-control" v-model="user.password" placeholder="Password">
    </div>
    <div class="form-group">
      <label for>
        Role
      </label>
      <select v-model="user.role" class="form-control">
        <option value="admin">Admin</option>
        <option value="super_admin">Super Admin</option>
        <option value="kasir">Kasir</option>
        <option value="nakes">Nakes</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FormUser',
  data () {
    return {
      user: {
        email: '',
        password: '',
        role: "admin",
      }
    }
  },
  computed: {
    ...mapState(['errors']),
    ...mapState('user', {
      categories: state => state.category
    })
  },
  methods: {
    ...mapActions('user', [
      'getUsers',
      'addUser',
      'editUser',
      'updateUser',
    ]),

    clearForm () {
      this.user = {
        email: '',
        password: '',
        role: '',
      }
    },

    submit () {
      if (this.$route.name === 'user.add') {
        this.addUser(this.user)
      } else if (this.$route.name === 'user.edit') {
        Object.assign(this.user, { id: this.$route.params.id })
        this.updateUser(this.user)
      }
    }
  },
  created () {
    if (this.$route.name === 'user.edit') {
      this.editUser(this.$route.params.id).then(res => {
        this.user = {
          email: res.data.email,
          password: '',
          role: res.data.role,
        }
      })
    }
  }
}
</script>
