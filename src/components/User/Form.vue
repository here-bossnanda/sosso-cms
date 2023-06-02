<template>
  <div>
    <div class="form-group">
        <label class="float-left" for>Email</label>
        <input type="email" :disabled="this.$route.name === 'user.edit'" class="form-control" v-model="user.email" placeholder="Email">
    </div>
    <div class="form-group">
        <label class="float-left" for>Password</label>
        <input type="password" class="form-control" v-model="user.password" placeholder="Password">
    </div>
    <div class="form-group">
      <label class="float-left" for>
        Role
      </label>
      <select  v-model="user.role" class="form-control">
        <option value="1">Admin</option>
        <option value="2">User</option>
      </select>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label class="float-left" for>
          Branch
        </label>

          <Multiselect
            v-model="this.user.branches"
            mode="tags"
            placeholder="Select branch"
            :options="this.$store.state.branch.branch.data"
            label="label"
            trackBy="label"
            :searchable="true"
          >

          <template v-slot:multipleLabel="{ values }">
            <div class="multiselect-multiple-label">
              {{ values.label }}
            </div>
        </template>

          <template v-slot:option="{ option }">
            {{ option.value }} - {{ option.label }}
          </template> 
        </Multiselect>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Multiselect from '@vueform/multiselect'

export default {
  name: 'FormUser',
  data () {
    return {
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
    ...mapActions('branch', ['getbranch']),
    clearForm () {
      this.user = {
        email: '',
        password: '',
        role: '',
        branches: []
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
    this.$store.commit("branch/SET_LOADING", true);
    this.$store.commit("branch/SET_SIZE", 100);
    this.getbranch({"search":"","typeSearch":"","forSearchSelect": true});
    if (this.$route.name === 'user.edit') {
      this.editUser(this.$route.params.id).then(res => {
        this.user = {
          email: res.data.email,
          password: '',
          role: res.data.role,
          branches: res.data.branches
        }
      })
    }
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>