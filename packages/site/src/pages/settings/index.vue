<template>
    <div>
        push先登録: <input type="text" @change="updatePushDestination($event)" :value="state.pushDestination">
        蔵書API登録: <input type="text" @change="updateBookShelfApi($event)" :value="state.bookShelfApi">
        <button @click="submitSetting()">保存</button>
    </div>
</template>

<script lang="ts">
  import { onMounted, reactive } from "@vue/composition-api";
  import { fetchUser } from "./fetch-user";
  import { updateUser } from './update-user';

  interface State {
    pushDestination: string;
    bookShelfApi: string;
  }

  export default {
      setup() {
        const state = reactive<State>({
          pushDestination: '',
          bookShelfApi: '',
        });

        const updatePushDestination = (event: Event) => {
          state.pushDestination = (event.target as HTMLInputElement).value;
        };

        const updateBookShelfApi = (event: Event) => {
          state.bookShelfApi = (event.target as HTMLInputElement).value;
        };

        onMounted(async () => {
          const user = await fetchUser();
          state.pushDestination = user.pushDestination;
          state.bookShelfApi = user.bookShelfApi;
        });

        const submitSetting = async () => {
          await updateUser({
            ...state,
          })
        }

        return {
          state,
          submitSetting,
          updatePushDestination,
          updateBookShelfApi
        }
      }
    };
</script>