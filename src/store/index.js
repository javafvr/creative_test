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
        },
        {
            title: 'Cat-10',
            img: 'image-10.webp',
            isFlipped: false,
            timer: 5

        },
        {
            title: 'Cat-11',
            img: 'image-11.webp',
            isFlipped: false,
            timer: 5

        },
        {
            title: 'Cat-12',
            img: 'image-12.webp',
            isFlipped: false,
            timer: 5

        },
        {
            title: 'Cat-13',
            img: 'image-13.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-14',
            img: 'image-14.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-15',
            img: 'image-15.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-16',
            img: 'image-16.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-17',
            img: 'image-17.webp',
            isFlipped: false,
            timer: 5
        },
        {
            title: 'Cat-18',
            img: 'image-18.webp',
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
    },
    results: []
}

const mutations = {
    addCardToFlipped (state, card) {
        state.flippedCards.push(card)
    },
    startGame (state) {
        state.isGameRun = true
    },
    fillResults (state, results ) {
        if(results) state.results = results
    },
    resetTimer (state) {
        state.time.minutes = 0
        state.time.seconds = 0
    },
    incrementTimer (state) {
        if (state.isGameRun) {
            if (state.time.seconds < 59 ) {
                state.time.seconds++
            } else {
                state.time.seconds = 0
                state.time.minutes++
            }
        }
    },
    addResult (state, newRecord) {
        state.results.push(newRecord)
    },
    sortResults (state) {
        state.results.sort(function(a, b){
            let arrTimeA = a.time.split(':')
            let arrTimeB = b.time.split(':')

            return (parseInt(arrTimeA[0])*60 + parseInt(arrTimeA[1])) - (parseInt(arrTimeB[0])*60 + parseInt(arrTimeB[1]))
            
        })
    },
}

const actions = {
    incrementTimer: ({ commit }) => {commit('incrementTimer')},
    fillResults: ({ commit }) => { 
        commit('fillResults', JSON.parse(localStorage.getItem('tableResults')))
        commit('sortResults')
    },
    startGame: ({ commit }) => commit('startGame'),
    resetTimer: ({ commit }) => commit('resetTimer'),
    addResult: ({ commit }, newRecord ) => commit('addResult', newRecord)
}

const getters = {
    timeString: function(state) {
        let time = {
            minutes: '00',
            seconds: '00'
        }

        if (state.time.seconds < 10) {
            time.seconds = '0' + state.time.seconds
        } else {
            time.seconds = state.time.seconds
        }

        if (state.time.minutes < 10) {
            time.minutes = '0' + state.time.minutes
        } else {
            time.minutes = state.time.minutes
        }

        return time.minutes + ':' + time.seconds
    },
    tableResults: function(state) {
        return state.results
    }
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})