<template>
  <div>

    <h2 class="title  is-1">設定</h2>
    <h3 class="subtitle  is-5">新刊通知先の登録や、蔵書APIの登録を行えます</h3>

    <div class="field">
      <label class="label">Incoming Webhook URL</label>
      <input class="input  is-medium" type="url" @input="updatePushDestination($event)" :value="settings.pushDestination">
    </div>

    <div class="field">
      <label class="label">蔵書API URL</label>
      <input class="input  is-medium" type="url" @input="updateBookShelfApi($event)" :value="settings.bookShelfApi">
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

  interface Settings {
    pushDestination: string;
    bookShelfApi: string;
  }

  interface State {
    isSubmitting: boolean;
  }

  export default {
      setup() {
        const settings = reactive<Settings>({
          pushDestination: '',
          bookShelfApi: '',
        });

        const state = reactive<State>({
          isSubmitting: false,
        })

        const updatePushDestination = (event: Event) => {
          settings.pushDestination = (event.target as HTMLInputElement).value;
        };

        const updateBookShelfApi = (event: Event) => {
          settings.bookShelfApi = (event.target as HTMLInputElement).value;
        };

        onMounted(async () => {
          const user = await fetchUser();
          settings.pushDestination = user.pushDestination;
          settings.bookShelfApi = user.bookShelfApi;
        });

        const submitSetting = async () => {
          state.isSubmitting = true;
          await updateUser({
            ...settings,
          })
          state.isSubmitting = false;
        }

        return {
          settings,
          state,
          submitSetting,
          updatePushDestination,
          updateBookShelfApi
        }
      }
    };
</script>