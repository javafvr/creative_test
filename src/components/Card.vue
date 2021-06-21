<template>
    <div class="card">
        <img v-if="isFlipped" class="card__image card__image--back" :alt="title" :src="require('../assets/image/'+img)">
        <img v-if="!isFlipped" class="card__image card__image--front" alt="Vue logo" src="@/assets/image/logo.png">
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import store from '../store';

export default {
    props:{
        title: String,
        isFlipped: Boolean,
        img: String
    },
}
</script>
<style lang="scss" scoped>
    .card {
        width: 110px;
        height: 150px;
        border: 1px solid $color-second;
        border-radius: 5px;
        position: relative;
        transition: all 300ms ease-in-out;
        overflow: hidden;

        &__image {
            width: 100%;
        }

        &__text, &__image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>