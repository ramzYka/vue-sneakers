<script setup>


     defineProps({
       id: Number,
       imageUrl: String,
       title: String,
       price: Number,
       isFavorite: Boolean,
       isAdded: Boolean,

       onClickFavorite: Function,
       onClickAddCart: Function
    })



</script>


<template>

    <div class="relative bg-white border border-slate-100 rouded-3xl p-8 cursor-pointer transition hover:-translate-y-2">

        <img @click="$emit('clickFavorite')" class="absolute top-0 left-0" :src="!isFavorite ? '/like-1.svg': '/like-2.svg'" alt="Like 1">


        <img :src="imageUrl" alt="Sneaker">
        <p class="mt-2">{{ title }}</p>

        <div class="flex justify-between mt-5">

            <div class="flex flex-col">

                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} руб.</b>

            </div>

            <img @click="onClickAddCart" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus">

        </div>
    </div>

</template>