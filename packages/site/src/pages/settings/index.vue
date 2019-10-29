<template>
  <div>

    <h2 class="title  is-1">設定</h2>
    <h3 class="subtitle  is-5">新刊通知先の登録や、蔵書APIの登録を行えます</h3>

    <div class="field">
      <label class="label">Incoming Webhook URL</label>
      <input type="url" size="is-medium" @input="updatePushDestination($event)" :value="state.pushDestination">
    </div>

    <div class="field">
      <label class="label">蔵書API URL</label>
      <input type="url" size="is-medium" @input="updateBookShelfApi($event)" :value="state.bookShelfApi">
    </div>

    <div class="field">
      <div class="control">
        <b-button type="is-info" size="is-medium" @click="submitSetting()" :loading="state.isSubmitting">設定を保存する</b-button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { onMounted, reactive } from "@vue/composition-api";
  import { fetchUser } from "./fetch-user";
  import { updateUser } from './update-user';

  interface State {
    pushDestination: string;
    bookShelfApi: string;
    isSubmitting: boolean;
  }

  export default {
      setup() {
        const state = reactive<State>({
          pushDestination: '',
          bookShelfApi: '',
          isSubmitting: false,
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
          state.isSubmitting = true;
          await updateUser({
            ...state,
          })
          state.isSubmitting = false;
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