<template>
  <b-menu class="SideMenu">
    <b-menu-list>
      <b-menu-item
        label="本棚"
        icon="th"
        tag="router-link"
        to="/">
      </b-menu-item>
      <b-menu-item
        label="新しく出た漫画一覧"
        icon="book"
        tag="a"
        target="_blank"
        href="https://kindle-newer-book.netlify.com/">
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script lang="ts">
  import { createComponent } from "@vue/composition-api";

  export default createComponent({
    setup() {
        return {
        }
    }
  })
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

.SideMenu {
  padding: 10px;
  background-color: $grey-darker;
  & .menu-list a {
    color: #fff;
    &:hover {
      color: #363636;
    }
    &.is-active:hover {
      color: #fff;
    }
  }
}
@media screen and (max-width: $desktop) {
  .SideMenu {
    & .menu-list a span:not(.icon) {
      position: absolute !important;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
      clip: rect(1px, 1px, 1px, 1px);
      padding:0 !important;
      border:0 !important;
      height: 1px !important; 
      width: 1px !important; 
      overflow: hidden;
    }
    & .menu-list a .icon {
      $_size: 30px;
      font-size: $_size;
      width: $_size;
      height: $_size;
    }
  }
}
</style>