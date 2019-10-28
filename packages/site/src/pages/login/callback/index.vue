<template>
</template>

<script lang="ts">
  import { onMounted } from "@vue/composition-api";
  import { createUser } from './create-user';
  import { handleRedirect } from './handle-redirect';

  export default {
      setup() {
        onMounted(async () => {
          try {
            await handleRedirect();
            await createUser();
            //window.location.assign(window.location.origin)
          } catch(e) {
            throw e;
          }
        })
      }
    }
</script>