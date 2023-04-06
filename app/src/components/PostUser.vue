<template>
  <div>
    <h2>Ajouter un utilisateur</h2>
    <form @submit.prevent="addUser">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div>
        <label for="email">Adresse email:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Ajouter l'utilisateur</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    addUser() {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })
      })
        .then(response => {
          if (response.ok) {
            alert('L\'utilisateur a été ajouté avec succès !');
            this.username = '';
            this.email = '';
            this.password = '';
          } else {
            alert('Une erreur est survenue !');
          }
        })
        .catch(error => {
          console.error(error);
          alert('Une erreur est survenue !');
        });
    }
  }
}
</script>