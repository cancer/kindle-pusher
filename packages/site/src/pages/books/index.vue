<template>
    <ul>
        <li v-for="book in state.books">
            <img :src="book.productUrl">
            {{book.title}} / {{book.asin}} / {{book.detailPageUrl}}
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