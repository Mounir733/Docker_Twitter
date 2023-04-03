<script setup>
import {computed} from 'vue'
const props = defineProps({
    tweet: {
        required: true
    }
})

const delay = computed(() => {
    return Math.round((Date.now() - props.tweet.timestamp) / (1000 *60))
})

const theContent = computed(() => {
    return "<i>" + props.tweet.content.replace(/http.*\s/ig,"<a href='$&'>$&</a>") + "</i>"
})

</script>

<template>
<article>

</article>

        <div class="tweet">
          <img class="tweet__author-logo" src="./images/profile-image-1.jpg" />
          <div class="tweet__main">
            <div class="tweet__header">
              <div class="tweet__author-name">
                {{tweet.user}} 
              </div>
              <div class="tweet__author-slug">
                @{{tweet.user}}
              </div>
              <div class="tweet__publish-time">
                {{delay}}m
              </div>
            </div>
            <div class="tweet__content">
                <p class="content" v-html="theContent"></p>
            </div>
          </div>
        </div>
</template>

<style scoped>
/*article{
    margin-left: 25vh;
        margin-right: 25vh;

    padding: 2vh;
    border-top: solid 2px #444;

}
article .pdp{
    background-color:white;
    width:50px;
    height:50px;
    border-radius:100px;
}
.delay{
    color:#D3D3D3;
    font-size:13px;
}*/

</style>