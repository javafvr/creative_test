<template>
  <div class="timer">
    <div class="timer__label">Время:</div>
    <div class="timer__counter">{{ timeString }}</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import store from '../store';

export default {
  name: 'Timer',
  data() {
    return {
      time: {
        minutes: 0,
        seconds: 0,
      },
    };
  },
  computed: {
    ...mapGetters(['timeString']),
  },
  methods: {
    ...mapActions(['resetTimer', 'incrementTimer']),
    reset() {
      this.resetTimer();
    },
    start() {
      if (store.state.isGameRun) {
        setTimeout(() => {
          this.incrementTimer();
          this.start();
        }, 1000);
      }
    }
  },
  created() {
    this.$watch(
      () => store.state.isGameRun,
      (isGameRun) => {
        if (isGameRun) {
          this.reset();
          this.start();
        } else {
          this.reset();
        }
      }
    );
  },
};
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
