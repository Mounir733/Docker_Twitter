<script setup>
import { ref, computed, reactive } from 'vue'
  import { twitterStore } from "../stores/twitter.js"
  const twitter = twitterStore()
  
  const content = ref("")

 function add(){
        twitter.sendTweet(content)
    }
</script>

<template>
    <textarea v-model="content"></textarea>
    <button @click="add">Tweeter</button>
</template>

<style scoped>
    div{
        margin: 4vh;

    }
    textarea {
        margin:2vh;
        width: 60vw;
        background-color: #444;
        color: white;
        border: solid 2px #222;
        padding: 1vh;
        border-radius:20px;
    }
    button{
        background-color:#00acee;
        border:0;
        color:white;
        padding:1vh;
        padding-left:2vh;
        padding-right:2vh;
        border-radius:20px;
    }
    button:hover{
        background-color:#00acee;
        transform:scale(0.95);
        cursor:pointer;
    }

</style>