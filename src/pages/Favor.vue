<script  setup>

    import axios from 'axios';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import CardList from '@/components/CardList.vue';

    const favorites = ref([])


    onMounted( async () => {
        try {
            const {data} = await axios.get('https://ec165d3abd6f3e49.mokky.dev/favorites')
            console.log(data)
            favorites.value = data.map(obj => obj.item);
            
        } catch (err) {
            console.log(err)
        } 
    })
</script>

<template>

    <h2 class="text-3xl font-bold">Мои закладки</h2>


    <div class="mt-10">
        <CardList :items="favorites" is-favorites></CardList>
    </div>
</template>