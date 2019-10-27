<template>
  <b-navbar type="is-black">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Kindle Pusher
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div>
          顔
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
  import { createComponent, onMounted, reactive } from "@vue/composition-api";

  export default createComponent({
    setup() {
        const state = reactive({
          user: null
        });
        onMounted(async () => {
        });
    }
  })
</script>