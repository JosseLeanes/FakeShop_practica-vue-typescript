<template>
    <div class="cart">
      <div class="cart-header">
        <h2>My Cart {{ cartItems.length }}</h2>
      </div>
      <div class="cart-items">
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            <div class="element-name">
              {{ item.title }}
            </div>
            <div class="actions">
              <n-button tertiary round @click="removeElementFromCart(item)" >
                Delete
              </n-button>
            </div>
          </li>
        </ul>
      </div>
      <div class="cart-footer"> 
        <n-button @click="toggleCart">
            <template #icon>
                <n-icon >
                    <CreditCard/>
                </n-icon>
            </template>
          Check Out 
        </n-button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { NIcon, NButton } from "naive-ui";
  import { useCart } from "../composables/useCart";
  import { CreditCard as CreditCard} from "@vicons/fa";
  
  

  

  export default defineComponent({
    components: { NButton, CreditCard, NIcon },
    setup() {
      const { cartItems, removeElementFromCart, toggleCart } = useCart();
  
      return {
        activeKey: ref<string | null>(null),
        cartItems,
        removeElementFromCart,
        toggleCart,
      };
    },
  });
  </script>
  
  
  <style scoped>
  .cart {
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    border: 1px solid black;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    background-color: black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  .cart-header,
  .cart-footer {
    background-color: #61067a;
    height: 50px;
    width: 100%;
    text-align: center;
    color: white;
  }
  
  .cart-items ul {
    list-style: none;
  }
  li {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .cart-footer {
    padding-top: 5px;
  }
  </style>