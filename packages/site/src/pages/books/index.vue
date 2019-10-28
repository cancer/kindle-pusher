<template>
    <ul>
        <li v-for="book in state.books">
            <img :src="book.productUrl"><br>
            タイトル: <a :href="book.detailPageUrl">{{book.title}}</a><br>
            ASIN: {{book.asin}}<br>
            ブラックリスト: {{book.ignored}}
        </li>
    </ul>
</template>

<script lang="ts">
  import { onMounted, reactive } from "@vue/composition-api";
    import { fetchBooks } from "./fetch-books";

    export default {
      setup() {
        const state = reactive({
          books: [],
        })
        onMounted(async () => {
          const books = await fetchBooks();
          state.books = books;
        });

        return {
          state,
        };
      }
    }
</script>