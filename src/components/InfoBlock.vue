<script setup>

    defineProps({
        title: String,
        description: String,
        imageUrl: String
    })

</script>

<template>

    <div class="flex items-center flex-col text-center w-72 mx-auto">

        <img height="80" width="80"  :src="imageUrl" alt="Info image">
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400 text-center">{{ description }}</p>


    </div>
</template>