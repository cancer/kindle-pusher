<template>
    <p>{{msg}}</p>
</template>

<script lang="ts">
  import { onMounted } from "@vue/composition-api";
  import { createAuthClient } from '../../shared/auth-client';

  export default {
      setup() {
        onMounted(async () => {
          const client = await createAuthClient();
          let user: any;
          try {
            user = await client.getUser();
            console.log(user);
          } catch(e) {
            throw e;
          }

          if (typeof user === 'undefined') {
            client.loginWithRedirect()
          }
        });

        return {
          msg: 'Hello World'
        }
      }
    };
</script>