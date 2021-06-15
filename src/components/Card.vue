<template>
    <div class="card">
        <img v-if="isFlipped" class="card__image card__image--back" alt="{{ title }}" src="@/assets/logo.png">
        <img v-if="!isFlipped" class="card__image card__image--front" alt="Vue logo" src="@/assets/logo.png">
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import store from '../store';

export default {
    props:{
        title: String,
        isFlipped: Boolean,
        img: String
    },
  computed: {
    ...mapGetters([
        'evenOrOdd',
    ]),
    imgUrl: function () {
        return '@/assets/' + this.img
    }
  },
  methods: {
    ...mapActions([
        'increment',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
    ]),
    flipCard: function() {
        console.log(this);
    }
  }
}
</script>
<style lang="scss" scoped>
    .card {
        width: 80px;
        height: 100px;
        border: 1px solid $color-second;
        position: relative;
        transition: all 300ms ease-in-out;

        &__image {
            width: 100%;
        }

        &__text, &__image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &--front {
            transform: rotateY(180deg);
        }

        &--flipped {
            &__image {
                opacity: 0;
            }
        }
    }
</style>