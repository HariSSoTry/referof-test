<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <div id="app">
    <CreatePromoButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreatePromoButton from './components/promo-code/CreatePromoButton.vue';

export default defineComponent({
  name: 'App',
  components: {
    CreatePromoButton
  }
});
</script>

<style>
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>