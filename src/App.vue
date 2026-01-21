<script setup>
import { ref,watch, provide, computed } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';


// корзина !!
const cart = ref([])

const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
)
 
const vatPrice = computed(
    () => Math.round((totalPrice.value * 5) / 100)
)

const drawerOpen = ref(false);

const onChangeDrawerClose = () => {
    drawerOpen.value = false
}

const onOpenDrawer = () => {
    drawerOpen.value = true
}

const addToCart = (item) => {
    cart.value.push(item)
    item.isAdded = true
}

const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
}


watch(
    cart, 
    () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
    },
    {  deep: true}
)

provide('cart', {
    cart,
    onChangeDrawerClose,
    onOpenDrawer,
    addToCart,
    removeFromCart
})

// корзина!!

// fetch запрос onMounted(()=> {
//     fetch('https://604781a0efa572c1.mokky.dev/items')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })
// })

</script> 

<template>
    <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice"></Drawer>
    <div class="bg-white w-4/5 m-auto h-auto rounded-xl shadow-xl mt-14">

        <Header :total-price="totalPrice" @onOpenDrawer="onOpenDrawer"></Header>

        <div class="p-10">
    
            <router-view>



            </router-view>

        </div>

    </div>
</template>

<style scoped>

</style>
