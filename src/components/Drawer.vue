<script setup>
    import { ref, watch, computed, inject } from 'vue';
    import axios from 'axios';

    import DrawerHead from './DrawerHead.vue';
    import CartItemList from './CartItemList.vue';
    import InfoBlock from './InfoBlock.vue';

    const props = defineProps({
        totalPrice: Number,
        vatPrice: Number,
    })    

    const {cart, closeDrawer} = inject('cart')

    const isCreating = ref(false)
    const orderId = ref(null)

    const createOrder = async () => {
    try {
        isCreating.value = true
        const cartCopy = cart.value.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            imageUrl: item.imageUrl
        }));

        const {data} = await axios.post('https://ec165d3abd6f3e49.mokky.dev/orders', {
            items: cartCopy.value,
            totalPrice: props.totalPrice.value
        })

        cart.value = []

        orderId.value = data.id
    } catch(err) {
        console.log(err)
    } finally {
        isCreating.value = false
    }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const btnDisabled = computed ( () => isCreating.value || cartIsEmpty)


console.log('cart.value:', cart.value)
console.log('cartIsEmpty.value:', cartIsEmpty.value)
console.log('isCreating.value:', isCreating.value)
console.log('btnDisabled.value:', btnDisabled.value)
</script>

<template>

    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">

        <DrawerHead></DrawerHead>



        <div v-if="cartIsEmpty || orderId" class="flex h-full items-center">

            <InfoBlock v-if="orderId" orderId title="Заказ оформлен" :description="`Ваш заказ №${orderId} успешно оформлен`" image-url="/order-success-icon.png"></InfoBlock>

            <InfoBlock v-if="cartIsEmpty && !orderId" title="Корзина пустая" description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" image-url="/package-icon.png"></InfoBlock>

        </div>

        <div v-else>

            <CartItemList></CartItemList>


            <div class="flex flex-col gap-5 mb-5 my-7">

                <div class="flex gap-2">

                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dashed opacity-10"></div>
                    <b>{{totalPrice}} руб.</b>

                </div>

                <div class="flex gap-2">

                    <span>Налог:</span>
                    <div class="flex-1 border-b border-dashed opacity-10"></div>
                    <b>{{ vatPrice }} руб.</b>

                </div>

                <button :disabled="btnDisabled.value" class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 disabled:bg-slate-400 active:bg-lime-700 cursor-pointer"
                @click="createOrder()">
                    Оформить заказ
                </button>

            </div>

        </div>


    </div>

</template>