<template>
  <spinner-load :show="loading">
    <product-details
      v-if="aProduct != null"
      :product="aProduct"
    ></product-details>
    <n-button tertiary round @click="addElementToCart(product)" class="btn btn-success">Añadir al carrito</n-button>
    
  </spinner-load>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductDetails from "@/components/ProductDetails.vue";
import SpinnerLoad from "@/components/SpinnerLoad.vue";
import { NButton } from "naive-ui";
import { Product } from "@/models/product";
import productsService from "@/services/productsService";
import { useCart } from "@/composables/useCart";
import useProducts from "@/composables/useProducts";


export default defineComponent({
  name: "A-product",

  components: {
    ProductDetails,
    SpinnerLoad,
    NButton,
   
  },
  data(): { aProduct: Product | null } {
    return {
      aProduct: null,
    };
  },
  methods: {
    async fetchProduct(id: number) {
      this.loading = true;
      const product = await productsService.oneProduct(id);
      this.aProduct = product;
      this.loading = false;
    },
  },
  mounted() {
    const id = Number(this.$route.params.id);
    this.fetchProduct(id);
  },
  setup() {
    const { addElementToCart } = useCart();
    const { product } = useProducts();
    return { 
      product,
      addElementToCart,
      loading: ref(false),
    };
  },
});
</script>

