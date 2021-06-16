<template>
    <div class="timer">
        <div class="timer__label">Время:</div>
        <div class="timer__counter">{{timeStr.minutes}} : {{timeStr.seconds}}</div>
    </div>
</template>
<script>
import store from '../store'

export default {
    name: 'Timer',
    data() {
        return {
            time: {
                minutes: 0,
                seconds: 0
            },
            timeStr: {
                minutes: '00',
                seconds: '00'
            }
        }
    },
    props:{
        // time: String,
    },
    methods: {
        reset() {
            store.state.time = this.time;
            [this.time[0], this.time[1]] = [ 0, 0 ]
        },
        start() {
            if(store.state.isGameRun) {
                setTimeout(() => {
                    if (this.time.seconds < 59 ) {
                        this.time.seconds += 1
                        if (this.time.seconds < 10) {
                            this.timeStr.seconds = '0' + this.time.seconds
                        } else {
                            this.timeStr.seconds = this.time.seconds
                        }
                    } else {
                        this.time.seconds = 0
                        this.timeStr.seconds = '00'
                        this.time.minutes += 1
                        if (this.time.minutes < 10) {
                            this.timeStr.minutes = '0' + this.time.minutes
                        } else {
                            this.timeStr.minutes = this.time.minutes
                        }
                    }
                    this.start();
                }, 1000)
            }
        }
    },
    created(){
        // this.init()

        this.$watch(() => store.state.isGameRun,
        (isGameRun) => {
            if(isGameRun) {
                this.reset()
                this.start()
            } else {
                this.reset()
            }
        }
        )
    },
}
</script>
<style lang="scss" scoped>
    .timer {
        margin-right: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__label {
            font-weight: bold;
        }

        &__label + &__counter {
            margin-left: 8px;
        }

        &__counter {
            text-align: center;
            width: 50px;
        }
    }
</style>