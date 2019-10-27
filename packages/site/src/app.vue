<template>
  <div class="kp-Main">
    <div class="kp-Main_Nav">
      <Nav />
    </div>
    <div class="kp-Main_Menu  has-background-dark">
      <b-menu>
        <b-menu-list>
          <b-menu-item
            label="本棚（通知をうけるやつ一覧）"
            icon="bell"
            tag="router-link"
            to="/">
          </b-menu-item>
          <b-menu-item
            label="本棚（すべて）"
            icon="th"
            tag="router-link"
            to="/">
          </b-menu-item>
          <b-menu-item
            label="新しく出た漫画一覧"
            icon="book"
            tag="router-link"
            target="_blank"
            to="https://kindle-newer-book.netlify.com/">
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
    <div class="kp-Main_View">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import Nav from "./components/nav/index.vue";
  export default {
    components: {
      Nav
    },
    setup() {
    },
  }
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

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
    padding: 10px;
    .menu-list a {
      color: #fff;
      &:hover {
        color: #363636;
      }
      &.is-active:hover {
        color: #fff;
      }
    }
  }
  &_View {
    grid-area: view;
    padding: 10px;
  }
}
</style>