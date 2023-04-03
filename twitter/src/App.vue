<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { twitterStore } from "./stores/twitter.js"
const twitter = twitterStore()


</script>



<template>
  <!--<header>
    <nav>
      <RouterLink to="/"><span class="material-symbols-outlined">
home
</span></RouterLink>
    </nav>
    <div id="auth">
      <input v-model="twitter.user">
    </div>
  </header>-->

  <RouterView />
  
</template>

<style scoped>
  header {
    padding: 20px;
    background-color: #00acee;
    font-size:30px;
  }
  nav a {
    display: inline-block;
    text-decoration: none;
    color: white;
    margin: 5px;
    background-color: white;
    color: #000044;
    border-radius:30px;
    padding:1vh;
  }

  header h1, header nav, header #auth {
    flex: 1 1 auto;
  }
</style>
