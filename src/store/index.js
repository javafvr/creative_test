import { createStore } from 'vuex'

const state = {
    initialData: [
        {
            title: 'Cat-1',
            img: 'image-1.webp',
            isFlipped: false,
            timer: 5

        },
        {
            title: 'Cat-2',
            img: 'image-2.webp',
            isFlipped: false,
            timer: 5

        },
        {
            title: 'Cat-3',
            img: 'image-3.webp',
            isFlipped: false,
            timer: 5

        },
        {
            title: 'Cat-4',
            img: 'image-4.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-5',
            img: 'image-5.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-6',
            img: 'image-6.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-7',
            img: 'image-7.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-8',
            img: 'image-8.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-9',
            img: 'image-9.webp',
            isFlipped: false,
            timer: 5
        }
    ],
    cards: [],
    flippedCards: [],
    isGameRun: false,
    time: {
        minutes: 0,
        seconds: 0
    }
}

const mutations = {
    addCardToFlipped (state, card) {
        state.flippedCards.push(card)
    },
    startTimer (state) {
        state.isGameRun = true
    }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})