<script setup> 
import Card from './Card.vue';

const props = defineProps({
    items: Array,
    isFavorites:Boolean
})

const emit = defineEmits(['addToFavorite', 'onClickAddCart'])

</script>


<template>

<div v-auto-animate class="grid grid-cols-4 gap-5">
    <Card 
    v-for="item in items"
    :key="item.id"
    :id="item.id"
    :title="item.title" 
    :imageUrl="`${item.imageUrl}`" 
    :price="item.price" 
    :isFavorite="item.isFavorite"
    :isAdded="item.isAdded"
    :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
    :onClickAddCart="isFavorites ? null : () => emit('onClickAddCart', item)"
    >

    </Card>
</div>

</template>