<template>
  <div class="page">
    <div class="top-panel">
      <div class="button">Старт</div>
    </div>
    <div class="cardboard">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="cardboard__item"
        :class="{'cardboard__item--flipped': card.isFlipped, 'cardboard__item--disabled': card.isDisabled}"
        v-on:click="flipCard(card)"
      >
        <Card v-bind:title="card.title" v-bind:isFlipped="card.isFlipped" v-bind:img="card.img"></Card>
      </div>
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
      cards: [],
      countDown: 5
    }
  },
  components: {
    Card
  },
  computed: {
    isMatch: function() {
      return store.state.flippedCards[0].title === store.state.flippedCards[1].title
    },
  },
  methods: {
    countDownTimer() {
      if(this.countDown > 0 && store.state.flippedCards.length < 2) {
          setTimeout(() => {
            console.log('counter ',this.countDown);
            
              this.countDown -= 1
              this.countDownTimer()
          }, 1000)
      } else {
        this.countDown = 5
        return
      }
    },
    /*for reset flipped cards*/
    resetFlip: function() {
      setTimeout(() => {
        store.state.flippedCards.forEach(card => {
          card.isFlipped = false
        })
        store.state.flippedCards = []
      }, 900)
    },
    flipCard: function(card) {
      
      if (card.isDisabled) return

      card.isFlipped = !card.isFlipped
      store.commit('addCardToFlipped', card)
      console.log(store.state.flippedCards.length);
      if(store.state.flippedCards.length < 2) {
        this.countDownTimer()
        this.resetFlip()
      }
      if(store.state.flippedCards.length === 2) {
        if (this.isMatch) {
            setTimeout(() => {
            store.state.flippedCards.forEach(card => {
              card.isDisabled = true
            })
            store.state.flippedCards = []
          }, 900)
        } else {
          setTimeout(() => {
            store.state.flippedCards.forEach(card => {
              card.isFlipped = false
            })
            store.state.flippedCards = []
          }, 900)
        }
      }
    }
  },
  created(){
    store.state.cards.forEach((card) => {
        card.isFlipped = false
    });

    let tmpCards1 = store.state.cards.slice();
    let tmpCards2 = store.state.cards.slice();

    store.state.cards = this.cards.concat(tmpCards1, tmpCards2)

    /*Deep clone array))*/
    store.state.cards = JSON.parse(JSON.stringify(store.state.cards))

    /*Fisher-Yeats shuffle*/
    for (let i = store.state.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [store.state.cards[i], store.state.cards[j]] = [store.state.cards[j], store.state.cards[i]];
    }
    this.cards = store.state.cards
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

.top-panel {
  display: flex;
  margin: 0 auto;
  max-width: 876px;
  min-width: 876px;
}

.button {
  cursor: pointer;
  padding: 13px, 20px;
  background-color: #fff;
  color: #ffffff;
  font-size: 18px;
  line-height: 1.55;
  font-weight: 400;
  border-width: 1px;
  border-radius: 2px;
  border-color: transparent;
  border-style: solid;
  background-color: #3d1df7;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:hover {
  background-color: #3d1da6;
  }
}

.cardboard {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 876px;
  min-width: 876px;
  transition: all 300ms ease-in-out;
  margin: 0 auto;

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
          opacity: 1;
        }
        &__text {
          opacity: 1;
          transform: rotateY(-180deg), translate(-50%, -50%);
        }
        transform: rotateY(180deg);
      }
    }

    &--disabled {
      .card {
        opacity: 0;
      }
    }
  }
}
</style>
