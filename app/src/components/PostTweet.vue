<template>
  <div>
    <h1>Poster un tweet</h1>
    <form @submit.prevent="submitTweet">
      <label>
        Texte du tweet :
        <input type="text" v-model="tweetText">
      </label>
      <button type="submit">Poster</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweetText: ''
    }
  },
  methods: {
    submitTweet() {
      fetch('http://localhost:3000/tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: this.tweetText,
            userId: 1 // ID de l'utilisateur qui a créé le tweet
        })
        }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création du tweet.');
        }
        return response.json();
        }).then(tweet => {
        console.log('Tweet créé :', tweet);
        }).catch(error => {
        console.error(error);
        });
    }
  }
}
</script>
