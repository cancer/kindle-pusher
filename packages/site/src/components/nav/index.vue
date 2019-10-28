<template>
  <div class="Nav">
    <div class="Nav_Logo">
      <router-link  :to="{ path: '/' }">
        <b-icon icon="book-open" size="is-small"></b-icon>
        <span>Kindle Pusher</span>
      </router-link>
    </div>
    <div class="Nav_MenuItem">

    </div>
    <b-dropdown aria-role="list" position="is-bottom-left">
      <button v-if="state.user" slot="trigger" class="Nav_UserIcon" type="button">
        <img class="Nav_UserIconImg" :src=state.user.picture :alt=state.user.name>
      </button>
      <b-dropdown-item aria-role="listitem" has-link>
        <router-link :to="{ path: '/settings/' }">
          設定
        </router-link>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
  import { createComponent, onMounted, reactive } from "@vue/composition-api";
  import { createAuthClient } from '../../shared/auth-client';

  export default createComponent({
    setup() {
        const state = reactive({
          user: null
        });
        onMounted(async () => {
          const client = await createAuthClient();
          let user: any;
          try {
            state.user = await client.getUser();
          } catch(e) {
            throw e;
          }
        });
        return {
          state
        }
    }
  })
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
.Nav {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: $black-bis;
  padding: 10px 10px 10px 30px;
  height: 60px;
  &_Logo {
    a {
      color: $white;
      font-size: 24px;
    }
    .icon {
      margin-right: 5px;
    }
  }
  &_MenuItem {
    padding-left: 10px;
    margin-left: auto;
  }
  &_UserIcon {
    appearance: none;
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 100%;
    padding: 0;
    &::after {
      content: "";
      position: absolute;
      top: calc(100% + 1px);
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 0;
      border-width: 4px;
      border-color: white transparent transparent transparent;
      border-style: solid;
    }
  }
  &_UserIconImg {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 100%;
  }
}
</style>