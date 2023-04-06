<template>
  <div>
    <h2>Liste des tweets</h2>
    <ul>
      <li v-for="tweet in tweets" :key="tweet.id">
        <p>{{ tweet.text }}</p>
        <p v-if="tweet.user != null">{{ tweet.user.username }}</p>
        <button @click="likeTweet(tweet.id)">Like</button>
      </li>
    </ul>
    <form @submit.prevent="submitTweet">
      <label>
        Texte du tweet:
        <input type="text" v-model="newTweet.text" />
      </label>
      <button type="submit">Poster</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweets: [],
      newTweet: {
        text: ''
      }
    }
  },
  created() {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(data => {
        this.tweets = data;
      });
  },
  methods: {
    likeTweet(tweetId) {
      fetch(`http://localhost:3000/tweets/${tweetId}/like`, { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
        });
    },
    submitTweet() {
      fetch('http://localhost:3000/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newTweet)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.newTweet.text = '';
          this.tweets.push(data.tweet);
        });
    }
  }
};
</script>
