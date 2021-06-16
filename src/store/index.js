import { createStore } from 'vuex'

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    cards: [
        {
            title: 'Cat-1',
            img: 'image-1.webp',
            isFlipped: false

        },
        {
            title: 'Cat-2',
            img: 'image-2.webp',
            isFlipped: false

        },
        {
            title: 'Cat-3',
            img: 'image-3.webp',
            isFlipped: false

        },
        {
            title: 'Cat-4',
            img: 'image-4.webp',
            isFlipped: false
        },
        {
            title: 'Cat-5',
            img: 'image-5.webp',
            isFlipped: false
        },
        {
            title: 'Cat-6',
            img: 'image-6.webp',
            isFlipped: false
        },
        {
            title: 'Cat-7',
            img: 'image-7.webp',
            isFlipped: false
        },
        {
            title: 'Cat-8',
            img: 'image-8.webp',
            isFlipped: false
        },
        {
            title: 'Cat-9',
            img: 'image-9.webp',
            isFlipped: false
        }
    ],
    flippedCards: []
}

const mutations = {
    addCardToFlipped (state, card) {
        state.flippedCards.push(card)
    },
    increment (state) {
        state.count++
    },
    decrement (state) {
        state.count--
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