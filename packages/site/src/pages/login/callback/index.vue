<template>
</template>

<script lang="ts">
  import { onMounted, SetupContext } from "@vue/composition-api";
  import { createUser } from './create-user';
  import { existUser } from './exist-user';
  import { handleRedirect } from './handle-redirect';

  export default {
      setup(_, context: SetupContext) {
        onMounted(async () => {
          try {
            await handleRedirect();
          } catch(e) {
            throw e;
          }

          try {
            const exists = await existUser();
            if (exists) {
              context.root.$router.push('/');
              return;
            }

            await createUser();
            context.root.$router.push('/settings');
          } catch(e) {
            throw e;
          }
        })
      }
    }
</script>