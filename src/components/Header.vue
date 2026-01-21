<script setup>

    const emit = defineEmits(['onOpenDrawer'])

    defineProps({
        totalPrice: Number
    })

</script>


<template>

    <header class="flex justify-between border-b border-slate-200 px-10 py-8">

            <router-link to="/">

                <div class="flex items-center">

                <img src="/logo.png" alt="Logo" class="w-10 mr-5">

                <div>
                     
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-400">Магазин лучших кроссовок</p>

                </div>

            </div>

            </router-link>

            <ul class="flex items-center gap-10">
                <li class="flex items-center gap-3 cursor-pointer group" @click="() => emit('onOpenDrawer')">
                    <img src="/cart.svg" alt="Cart">
                    <b class="text-gray-500 group-hover:text-black">{{ totalPrice }} руб.</b>
                </li>

                <router-link to="/favorites">

                    <li class="flex items-center gap-3 cursor-pointer group">
                        <img src="/heart.svg" alt="Cart">
                        <span class="text-gray-500 group-hover:text-black">Закладки</span>
                    </li>

                </router-link>

                <li class="flex items-center gap-3 cursor-pointer group">
                    <img src="/profile.svg" alt="Cart">
                    <span class="text-gray-500 group-hover:text-black">Профиль</span>
                </li>

                
            </ul>

        </header>

</template>