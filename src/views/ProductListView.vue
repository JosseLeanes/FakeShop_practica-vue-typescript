<template>
  <div class="input-container">
    <n-input-group>
      <n-input
        :style="{ width: '100%' }"
        placeholder="Search products"
        v-model:value="search"
        @keyup.enter="onSearch"
        :status="searchStatus"
      />
      <n-button @click="onSearch" :type="searchStatus"> Search </n-button>
    </n-input-group>
    <n-alert v-if="searchStatus === 'error'" title="Error" type="error">
      At least 3 characters required 
    </n-alert>
  </div>
  <spinner-load :show="loading">
    <div>
      <n-grid
        v-if="products.length"
        cols="2 m:4"
        responsive="screen"
        :x-gap="24"
        :y-gap="36"
      >
        <n-grid-item v-for="product in products" :key="product.id"
          ><product-card :product="product"></product-card
        ></n-grid-item>
      </n-grid>
      <n-result
        v-else-if="page === 1"
        status="500"
        title="No found products"
        description="No matching products"
      ></n-result>
      <n-result
        v-else
        status="404"
        title="No more products"
        description="There´s no more products, try searching for a different one"
      >
      </n-result>
    </div>
    <div>
      <n-pagination v-model:page="page" :page-count="10" />
    </div>
  </spinner-load>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NAlert, NButton, NInput, NInputGroup, NGrid, NGridItem, NPagination, NResult } from "naive-ui";
import ProductCard from "@/components/ProductCard.vue";
import SpinnerLoad from "@/components/SpinnerLoad.vue";
import { Product } from "@/models/product";
import productsService from "@/services/productsService";

const LIMIT = 8;

export default defineComponent({
  name: "ProductList",
  components: {
    NAlert,
    NButton,
    NInput,
    NInputGroup,
    NGrid,
    NGridItem,
    NPagination,
    NResult,
    ProductCard,
    SpinnerLoad,
  },
  data() {
    const products: Product[] = [];
    return {
      products,
    };
  },
  setup() {
    return {
      page: ref(1),
      search: ref(""),
      searchStatus: ref<"success" | "error">("success"),
      loading: ref(false),
    };
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      const products = await productsService.findProducts(
        this.search,
        (this.page - 1) * LIMIT,
        LIMIT
      );
      this.products = products;
      this.loading = false;
    },
    onSearch() {
      if (this.search.length != 0 && this.search.length < 3) {
        this.searchStatus = "error";
      } else {
        this.searchStatus = "success";
        this.page = 1;
        this.fetchProducts();
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
  watch: {
    page() {
      this.fetchProducts();
    },
  },
});
</script>

<style scoped>
.input-container {

  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2rem 0;
}

.n-input {
  border-color: white;
  background-color: rgba(159, 102, 212, 0.316);
}

.n-result,
.n-pagination {
  margin: 6rem;
}

.n-alert {
  margin: 2rem 0;
  border-radius: 8px;
  max-width: 30%;
}

.n-button {
  color: white;
  background-color: blueviolet;
}
</style>
