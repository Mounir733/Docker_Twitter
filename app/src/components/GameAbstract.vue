<script setup>
defineProps({
  game: { required: true }
})

</script>

<template>

  <article>
    <h3>{{ game.name }}</h3>

    <p class="illus"><img :src="game.image"/></p>
    <p class="price">{{ game.price }}€</p>

    <ul>
      <li v-for="category in game.categories">
        {{ category }}
      </li>
    </ul>

    <RouterLink :to="'/game/' + game.id">En savoir plus...</RouterLink>

  </article>

</template>



<style scoped>
  article {
    position: relative;
    margin: 20px;

    flex: 0 0 300px;
  }
  h3 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    background-color: rgba(0,0,0,0.7);
    padding: 10px;
    font-weight: normal;
    text-transform: uppercase;
  }
  img {
    width: 100%;
  }
  li {
    display: inline-block;
    background-color: #000044;
    margin: 3px;
    padding: 3px;
    font-size: 0.7em;
  }
  .price {
    position: absolute;
    top: 60px;
    right: -10px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50px;
    color: #004;
    border: solid 2px #004;
    background-color: rgba(255,255,255,0.7);
    text-align: center;
  }
</style>
