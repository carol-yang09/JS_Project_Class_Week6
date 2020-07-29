<template>
  <div class="container my-5">
    <!-- loading 效果 -->
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <ValidationObserver v-slot="{invalid}" tag="form" @submit.prevent="login()">
      <h1 class="h3 text-center font-weight-normal">登入</h1>

      <validation-provider class="form-group" name="Email" rules="required|email" tag="div"
       v-slot="{ errors, classes }">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" placeholder="請輸入 Email"
         :class="classes" v-model="auth.email" required>
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider class="form-group" name="密碼" rules="required" tag="div"
       v-slot="{ errors, classes }">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" placeholder="請輸入密碼"
          :class="classes" v-model="auth.password" required>
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </validation-provider>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" :disabled="invalid">
        確認
      </button>
    </ValidationObserver>
    <router-link to="/">&larr; 回到首頁</router-link>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isLoading: false,
      auth: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;
      vm.isLoading = true;
      if (vm.auth.email === '' || vm.auth.password === '') {
        // eslint-disable-next-line no-alert
        alert('請輸入正確資訊');
      } else {
        vm.$http.post(api, vm.auth).then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          // eslint-disable-next-line no-console
          console.log(res);
          document.cookie = `hexToken=${token};expires=${new Date(expired * 1000)}; path=/`;
          vm.isLoading = false;
          this.$router.push('/admin/productsmanage');
        }).catch((err) => {
          vm.isLoading = false;
          // eslint-disable-next-line no-console
          console.log('登入失敗', err.response);
        });
      }
    },
    checkLogin(token) {
      const vm = this;
      vm.isLoading = true;
      vm.$http({
        method: 'post',
        url: `${process.env.VUE_APP_APIPATH}/auth/check`,
        data: { api_token: token },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then(() => {
        vm.isLoading = false;
        vm.$router.push('/admin/productsmanage');
      }).catch((err) => {
        vm.isLoading = false;
        // eslint-disable-next-line no-console
        console.log('錯誤', err.response);
      });
    },
  },
  created() {
    // 如果 cookie 有 hexToken 則 驗證登入狀態
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
      this.checkLogin(token);
    }
  },
};
</script>
