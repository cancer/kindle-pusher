<template>
  <div class="kp-Main">
    <Nav class="kp-Main_Nav"></Nav>
    <SideMenu class="kp-Main_Menu"></SideMenu>
    <div class="kp-Main_View">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import Nav from "./components/nav/index.vue";
  import SideMenu from "./components/side-menu/index.vue";
  import { createComponent } from "@vue/composition-api";

  export default createComponent({
    components: {
      Nav,
      SideMenu
    },
    setup() {
    },
  })
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

$family-sans-serif: 'Noto Sans JP', sans-serif;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

html {
  font-size: 16px;
}

html, body {
  height: 100%;
}

.kp-Main {
  display: grid;
  grid-template:
    "nav   nav"  auto
    "menu  view" 1fr
    /auto 1fr
  ;
  height: 100%;
  &_Nav {
    grid-area: nav;
  }
  &_Menu {
    grid-area: menu;
  }
  &_View {
    grid-area: view;
    padding: 20px;
  }
}
</style>