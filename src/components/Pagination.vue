<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled': pages.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous"
         @click.prevent="changePage(pages.current_page-1)">
          &laquo;
        </a>
      </li>
      <li class="page-item" :class="{'active': n === pages.current_page}"
       v-for="n in pages.total_pages" :key="n">
        <a class="page-link" href="#"  @click.prevent="changePage(n)">
          {{ n }}
        </a>
      </li>
      <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
        <a class="page-link" href="#" aria-label="Next"
         @click.prevent="changePage(pages.current_page+1)">
          &raquo;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    changePage(page) {
      this.$emit('get-products', page);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
