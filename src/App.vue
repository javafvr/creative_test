<template>
  <el-container>
    <el-header>
      <el-row>
        <Timer/>
        <el-button v-on:click="startGame()" type="primary">Старт</el-button>
      </el-row>
    </el-header>
    <el-main>
      <div class="cardboard" v-if="isGameRun">
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
      <Results v-if="!isGameRun"/>
    </el-main>
  </el-container>

</template>
<script>
import Card from './components/Card.vue'
import Timer from './components/Timer.vue'
import Results from './components/Results.vue'
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
    Card,
    Timer,
    Results
  },
  computed: {
    isMatch: function() {
      return store.state.flippedCards[0].title === store.state.flippedCards[1].title
    },
    isGameRun: function() {
      return store.state.isGameRun
    }
  },
  methods: {
    init() {
      setTimeout(() => {
        store.state.cards.forEach(card => {
          card.isFlipped = false
          card.isDisabled = false
        })
        store.state.flippedCards = []
        store.state.cards.forEach((card) => {
          card.isFlipped = false
        });
      }, 900)

      this.cards = []
      store.state.cards = []
      store.state.flippedCards = []

      let tmpCards1 = store.state.initialData.slice();
      let tmpCards2 = store.state.initialData.slice();
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
    startGame() {
      this.init()
      store.commit('startTimer')
    },
    cardTimer(card) {
      if(card.timer > 0 && store.state.flippedCards.length < 2) {
          setTimeout(() => {
            // console.log('counter ',card.timer)
            
              card.timer -= 1
              this.cardTimer(card)
          }, 1000)
      } else {
        if (store.state.flippedCards.length < 2) {
          card.isFlipped = false
          store.state.flippedCards = []
        }
      }
    },

    /*Check all cards for current state*/
    checkCardsStatus() {
      store.state.isGameRun = !this.cards.every(function(card) {
        return card.isDisabled
      })
      if(store.state.isGameRun) {
        localStorage.setItem("tableResults", JSON.stringify({'Dmitrii':{
          'date': '10.06.2021',
          'name': 'Dmitrii',
          'time': store.state.time
        }}));

      }
    },

    flipCard: function(card) {
      /*Cases when we prevent flipping */
      if (card.isDisabled) return
      if (store.state.flippedCards.length === 2) return

      if (card.isFlipped) {
        card.isFlipped = false
        card.timer = 5
        store.state.flippedCards = []
      } else {
        card.isFlipped = true
        store.commit('addCardToFlipped', card)
      }

      if(store.state.flippedCards.length < 2) {
        card.timer = 5
        this.cardTimer(card)
      }
    }
  },
  created(){
    this.init()

    this.$watch(() => store.state.flippedCards.length,
      (flippedCards) => {
        if(flippedCards === 2){
          if (this.isMatch) {
            setTimeout(() => {
              store.state.flippedCards.forEach(card => {
                card.isDisabled = true
              })
              store.state.flippedCards = []
              this.checkCardsStatus()
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
    )
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
