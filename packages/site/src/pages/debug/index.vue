<template>
</template>

<script lang="ts">
  import { onMounted } from "@vue/composition-api";
  import { createAuthClient } from '../../shared/auth-client';

  export default {
      setup() {
        onMounted(async () => {
          const res = await fetch('/api/add-books', {
            method: 'POST',
            body: JSON.stringify({}),
          });
          console.log(await res.json());
        });

        return {
        }
      }
    };
</script>