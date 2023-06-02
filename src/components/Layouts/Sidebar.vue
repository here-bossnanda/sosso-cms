<template>
<!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" type="button">
          <div class="sidebar-brand-text mx-3">Optimalisasi supervisi SO</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <router-link class="nav-item"  style="text-decoration:none;"  :to="{ name: 'home' }" >
        <a class="nav-link"   type="button">
          <i class="fas fa-fw fa-home"></i>
          <span >Dashboard</span>
        </a>
      </router-link>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
          Master
      </div>

      <!-- Nav Item - Branch -->
      <router-link class="nav-item"   style="text-decoration:none;" :to="{ name: 'branch.data' }" >
        <a class="nav-link"  type="button">
          <i class="fas fa-fw fa-building"></i>
          <span>Branch</span>
        </a>
      </router-link>

      <!-- Nav Item - User -->
      <router-link  class="nav-item" style="text-decoration:none;" :hidden="this.role == 1 ? false : true"  :to="{ name: 'user.data' }" >
        <a class="nav-link" type="button">
          <i class="fas fa-fw fa-users"></i>
          <span>User</span>
        </a>
      </router-link>

      <!-- Nav Item - User -->
      <!-- <router-link  class="nav-item" :hidden="this.role == 'super_admin' ? false : true"  tag="li" :to="{ name: 'user.data' }" >
        <a class="nav-link" type="button">
          <i class="fas fa-fw fa-users"></i>
          <span>User</span>
        </a>
      </router-link> -->

  </ul>
<!-- End of Sidebar -->
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      role: localStorage.getItem('role')
    }
  },
  
}
</script>
