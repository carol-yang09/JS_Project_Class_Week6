<template>
  <div class="container">
    <!-- loading 效果 -->
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <h2 class="my-5 h3 text-center">前台 - 產品列表</h2>

    <div class="card-columns">
      <div class="card" v-for="item in products" :key="item.id">
        <div class="card-tag">{{item.category}}</div>
        <div class="card-img" :style="{backgroundImage: 'url(' + item.imageUrl[0] + ')'}"></div>
        <div class="card-body py-3 text-center">
          <h5 class="card-title font-weight-bolder">{{item.title}}</h5>
          <p class="card-text">{{item.content}}</p>
          <p class="mb-0" v-if="item.origin_price == item.price">
            售價：<span>{{item.origin_price}}</span>
          </p>
          <div class="card-price" v-if="item.origin_price !== item.price">
            <del>售價：<span>{{item.origin_price}}</span></del>
            <p>特價：<span class="font-weight-bolder">{{item.price}}</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分頁 -->
    <pagination :pages="pagination" @get-products="getProducts" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'ProductsList',
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(apiUrl).then((res) => {
        vm.products = res.data.data;
        vm.pagination = res.data.meta.pagination;
        vm.isLoading = false;
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log('錯誤', err.response);
      });
    },
  },
  components: {
    Pagination,
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.card-tag {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem 1rem;
  border-bottom-right-radius: 0.25rem;
  background-color: #f59c98;
  color: #fff;
  font-size: 0.5rem;
  font-weight: bold;
}

.card-img {
  min-height: 13rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center ;
}

.card-price {
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    margin-bottom: 0;
  }
}
</style>
