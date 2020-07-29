<template>
  <div>
    <!-- loading 效果 -->
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/admin">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
       data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mr-5">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">後台首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/productsmanage">產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/ordersmanage">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/couponsmanage">優惠劵管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/picturesmanage">圖片管理</router-link>
          </li>
        </ul>
        <a href="#" @click.prevent="logout()">登出</a>
      </div>
    </nav>
    <router-view :token="token" v-if="checkSuccess"/>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isLoading: false,
      token: '',
      checkSuccess: false,
    };
  },
  methods: {
    // 登出
    logout() {
      const vm = this;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      vm.isLoading = true;
      vm.$http({
        method: 'post',
        url: `${process.env.VUE_APP_APIPATH}/auth/logout`,
        data: { api_token: token },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then(() => {
        // 清空 cookie - 注意: path 需相同
        document.cookie = 'hexToken=;expires=;path=/';
        vm.checkSuccess = false;
        vm.isLoading = false;
        vm.$router.push('/login');
      }).catch((err) => {
        vm.isLoading = false;
        // eslint-disable-next-line no-console
        console.log('錯誤', err.response);
      });
    },
    checkLogin() {
      const vm = this;
      vm.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      vm.$http({
        method: 'post',
        url: `${process.env.VUE_APP_APIPATH}/auth/check`,
        data: { api_token: vm.token },
        headers: {
          authorization: `Bearer ${vm.token}`,
        },
      }).then(() => {
        vm.checkSuccess = true;
      }).catch((err) => {
      // eslint-disable-next-line no-console
        console.log('錯誤，請重新登入', err.response);
        // 導入首頁
        vm.$router.push('/login');
      });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
