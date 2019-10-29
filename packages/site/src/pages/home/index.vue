<template>
  <div>
    <h2 class="title  is-1">本棚</h2>
    <h3 class="subtitle  is-5">所持している本（全{{ state.books.length }}冊）の一覧です。</h3>

    <div class="block">
      <b-radio v-model="state.visibility"
        name="name"
        native-value="all">
        すべて
      </b-radio>
      <b-radio v-model="state.visibility"
        name="name"
        native-value="onlyNotIgnored">
        通知設定あり
      </b-radio>
      <b-radio v-model="state.visibility"
        name="name"
        native-value="onlyIgnored">
        通知設定なし
      </b-radio>
    </div>

    <ul :class="[
      'Books',
      {
        '-all': state.visibility === 'all',
        '-onlyIgnored': state.visibility === 'onlyIgnored',
        '-notOnlyIgnored': state.visibility === 'onlyNotIgnored',
      }]"
    >
        <li
          :class="[
            'Books_Item',
            {
              '-ignored': book.ignored,
            }
          ]"
          v-for="book in state.books"
          :key="book.asin"
        >
            <a class="Books_Link" :href="book.detailPageUrl">
              <img class="Books_Img" :src="book.productUrl"  loading="lazy">
              <span class="Books_Title">{{book.title}}</span>
            </a>
            <button class="Books_Button" type="button" :title="book.ignored ? 'この本を通知する' : 'この本を通知しない' ">
              <b-icon icon="star"></b-icon>
              <span class="Books_ButtonText" v-if="book.ignored">除外</span>
              <span class="Books_ButtonText" v-else>通知</span>
            </button>
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { onMounted, reactive } from "@vue/composition-api";
  import { createAuthClient } from '../../shared/auth-client';
  import { fetchBooks } from "./fetch-books";

  export default {
      setup() {
        const state = reactive({
          books: [],
          visibility: 'all'
        })
        onMounted(async () => {
          const client = await createAuthClient();
          let user: any;
          try {
            user = await client.getUser();
            const books = await fetchBooks();
            state.books = books;
          } catch(e) {
            throw e;
          }

          if (typeof user === 'undefined') {
            client.loginWithRedirect()
          }
        });

        return {
          state,
        }
      }
    };
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

.Books {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  &_Item {
    position: relative;
    // "通知設定あり"のみを表示：通知設定あり要素を表示
    .-notOnlyIgnored &:not(.-ignored) {
      display: block;
    }
    // "通知設定あり"のみを表示：通知設定なし要素を非表示
    .-notOnlyIgnored &.-ignored {
      display: none;
    }
    // "通知設定なし"のみを表示：通知設定なし要素を表示
    .-onlyIgnored &.-ignored {
      display: block;
    }
    // "通知設定なし"のみを表示：通知設定あり素を表示
    .-onlyIgnored &:not(.-ignored) {
      display: none;
    }
  }
  &_Link {
    display: block;
    &:hover {
      color: $cyan;
    }
    .-ignored & {
      color: $grey-lighter;
    }
  }
  &_Title {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.3;
    word-break: break-all;
  }
  &_Img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    .-ignored & {
      opacity: 0.1;
    }
  }
  &_Button {
    -webkit-appearance: none;
    position: absolute;
    top: 115px;
    right: 5px;
    width: 30px;
    height: 30px;
    padding: 0;
    border: 0;
    background: transparent;
    color: $yellow;
    cursor: pointer;
    transition: 0.2s color $easing;
    &:hover {
      color: lighten($yellow, 20%);
    }
    .-ignored & {
      color: $white;
      &:hover {
        color: lighten($yellow, 20%);
      }
    }
    .icon {
      font-size: 20px;
      width: 30px;
      height: 30px;
      color: inherit;
      text-shadow: 0 0 3px #000;
    }
  }
  &_ButtonText {
    position: absolute !important;
    clip: rect(1px, 1px, 1px, 1px);
    padding:0 !important;
    border:0 !important;
    height: 1px !important; 
    width: 1px !important; 
    overflow: hidden;
  }
}
</style>