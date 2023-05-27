<template>
    <div class="col-md-12 mt-2">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title"> <b>Tambah User</b></h5>
            </div>
            <div class="card-body">
                <user-form ref="formUser"></user-form>
                <div class="form-group">
                    <button class="btn btn-primary btn-sm btn-block" @click.prevent="submit">
                        <i class="fa fa-save"></i> Tambah
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormUser from './Form'

export default {
  name: 'AddUser',
  methods: {
    submit () {
      this.$refs.formUser.submit()
    }
  },
  components: {
    'user-form': FormUser
  }
}
</script>
