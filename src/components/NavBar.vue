<template>
  
  <div v-if="isLoggedIn">
    <div class="title">Fake Shop
      
    </div>
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
      <div class="icon">
        <n-button>
          <n-icon @click="toggleCart">
            <ShoppingCart/>
          </n-icon>
        </n-button>
      </div>
   
  </div>

</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from "vue";
import { NIcon, NMenu, NButton } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  Home as HomeIcon,
  UserAlt as UserAltIcon,
  SignOutAlt as SignOutAltIcon,
  ShoppingCart as ShoppingCart,
} from "@vicons/fa";
import { RouterLink } from "vue-router";
import store from "@/store";
import router from "@/router";
import { useCart } from "@/composables/useCart";


function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function logout() {
  store.dispatch("user/logout");
  router.push({ name: "login" });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: { name: "home" },
        },
        { default: () => "All Products" }
      ),
    key: "home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        "a",
        {
          onClick: logout,
        },
        { default: () => "Logout" }
      ),
    key: "logout",
    icon: renderIcon(SignOutAltIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: { name: "profile" },
        },
        { default: () => "Profile" }
      ),
    key: "profile",
    icon: renderIcon(UserAltIcon),
  },
  
];

export default defineComponent({
  components: { NMenu, NButton, NIcon,  ShoppingCart },
  
  computed: {
    isLoggedIn() {
      return store.getters["user/isLoggedIn"];
    },
  },
  setup() {
    const { toggleCart } = useCart();

    return {
      activeKey: ref<string | null>(null),
      menuOptions,
      toggleCart,

     
    };
  },
});
</script>

<style scoped>

.title {
  height: 50px;
  font-size: 30px;
  padding-left: 15px;
  
}
.n-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #61067a;
  color: rgb(147, 142, 142);
}
.n-button {
  background-color: #61067a;
  
}
.icon {
  padding-top: 5px;
  padding-left: 5px;
  
}


</style>
