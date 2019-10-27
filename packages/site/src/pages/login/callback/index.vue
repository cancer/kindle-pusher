<template>
</template>

<script lang="ts">
    import { onMounted } from "@vue/composition-api";
    import { createAuthClient } from "../../../shared/auth-client";

    export default {
      setup() {
        onMounted(async () => {
          const client = await createAuthClient();
          await client.handleRedirectCallback();
          window.location.assign(window.location.origin)
        })
      }
    }
</script>