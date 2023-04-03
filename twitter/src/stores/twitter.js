
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const twitterStore = defineStore('twitter', () => {

  const tweets = reactive([  ])

  const lastTimestamp = ref(0)
  const nbTweetsToLoad = ref(0)
  const user = ref("luc")

  // Chargement initial
  axios.get("http://51.83.36.122:81/read")
    .then(response => {
      response.data.forEach(tweet => {
        tweets.push(tweet)
      })
      lastTimestamp.value = response.data[0].timestamp
    })

    // Verification de 'existence de nouveau tweets sur le serv
    // fais avec websockets normalement
    setInterval( _ => {
      axios.get("http://51.83.36.122:81/nbafter?timestamp="+lastTimestamp.value).then(response => {
        console.log(response.data)
        nbTweetsToLoad.value = response.data.nb
      })
    }, 2000)

    // Envoi de tweet
  function sendTweet(content){
    axios.post("http://51.83.36.122:81/create", {
      user: user.value,
      content : content.value
    })
    .then(response => {
      console.log(response)
    })
  }

  function refresh(){
    axios.get("http://51.83.36.122:81/after?timestamp=" + lastTimestamp.value)
    .then(response => {
      if(response.data.length > 0){
        tweets.splice(0,0,...response.data)
        lastTimestamp.value = response.data[0].timestamp            
      }

    })
  }

  return { tweets, user, sendTweet, nbTweetsToLoad, refresh }
})
