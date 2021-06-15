import { createStore } from 'vuex'

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    cards: [
        {
            title: 'Cat-1',
            img: 'image-1.png',
            isFlipped: false

        },
        {
            title: 'Cat-2',
            img: 'image-2.png',
            isFlipped: false

        },
        {
            title: 'Cat-3',
            img: 'image-3.png',
            isFlipped: false

        },
        {
            title: 'Cat-4',
            img: 'image-4.jpeg',
            isFlipped: false
        },
        {
            title: 'Cat-5',
            img: 'image-5.png',
            isFlipped: false
        },
        {
            title: 'Cat-6',
            img: 'image-6.png',
            isFlipped: false
        }
    ],
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
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

// getters are functions.
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default createStore({
  state,
  getters,
  actions,
  mutations
})