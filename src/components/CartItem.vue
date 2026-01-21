<script setup> 

const emit = defineEmits(['onClickRemove'])

    defineProps({
        id:Number,
        title: String,
        imageUrl: String,
        price: Number,
    })

</script>


<template>

    <div class="flex items-center border border-slate-100 p-4 rouded-xl mt-3">

        <img class="w-16 h-16" :src="imageUrl" :alt="title">

        <div class="flex flex-col justify-between">

            <p>{{ title }}</p>

            <div class="flex justify-between mt-2">

                <b>{{price}} руб.</b>

                <img @click="emit('onClickRemove')" class="opacity-40 hover:opacity-100 cursor-pointer" src="/close.svg" alt="">

            </div>

        </div>

    </div>

</template>