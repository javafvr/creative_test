<template>
  <div class="cardboard">
    <div 
      v-for="card in cards" 
      :key="card.title" 
      class="cardboard__item"
      :class="{ 'cardboard__item--flipped': card.isFlipped }"
      v-on:click="flipCard(card)"
    >
      <Card v-bind:title="card.title" v-bind:isFlipped="card.isFlipped" v-bind:img="card.img"></Card>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import store from './store'

export default {
  name: 'App',
  data() {
    return {
      cards: store.state.cards
    }
  },
  components: {
    Card
  },
  methods: {
    flipCard: function(card) {
        console.log(card);
        card.isFlipped = !card.isFlipped
    }
  },
  created(){
    store.state.cards.forEach((card) => {
        card.isFlipped = false
    });
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cardboard {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 400px;
  transition: all 300ms ease-in-out;

  &__item {
    .card {
      transform: rotateY(0deg);
      &__text {
        opacity: 0;
      }
    }
    margin: 15px;
    &--flipped {
      .card {
        &__image {
          opacity: 0;
        }
        &__text {
          opacity: 1;
          transform: rotateY(-180deg), translate(-50%, -50%);
        }
        transform: rotateY(180deg);
      }
    }
  }
}
</style>
