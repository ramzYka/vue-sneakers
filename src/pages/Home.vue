<script setup>
    import { watch } from 'vue';
    import axios from 'axios';
    import CardList from '../components/CardList.vue';
    import { inject } from 'vue';
    import { reactive } from 'vue';
    import { ref } from 'vue';
    import { onMounted } from 'vue';

    const { cart ,addToCart, removeFromCart} = inject('cart')

    const items = ref([]) // {value: []}

    // Filters
    const filters = reactive({
        sortBy: 'title',
        searchQuery: '',
    })


    // API USE
    const addToFavorite = async (item) => {
        try {
            
            if(!item.isFavorite) {
                const obj = {
                parentID: item.id,
                item
            }
            item.isFavorite = true;
            const { data } = await axios.post('https://ec165d3abd6f3e49.mokky.dev/favorites', obj); 
            item.favoriteId = data.id
            } else {
                item.isFavorite = false;
                await axios.delete(`https://ec165d3abd6f3e49.mokky.dev/favorites/${item.favoriteId}`)
                item.favoriteId = null;
            }

        } catch (err) {
            console.log(err)
        } 
    }

    const fetchFavorites = async () => {
        try {

            const { data:favorites } = await axios.get('https://ec165d3abd6f3e49.mokky.dev/favorites');

            items.value = items.value.map((item) => {
                const favorite = favorites.find(favorite => favorite.parentID === item.id)

                if(!favorite) {
                    return item
                }

                return {
                    ...item,
                    isFavorite: true,
                    favoriteId: favorite.id
                }

            });
        } catch(err) {
            console.log(err)
        }
    }

    const fetchItems = async () => {
        try {

            const params = {
                sortBy: filters.sortBy,
            }

            if(filters.searchQuery)  {
                params.title = `*${filters.searchQuery}*`
            }

            const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {params});
            
            // Фильтруем только элементы с данными
            const filteredItems = data.filter(item => 
                item && 
                item.title && // проверяем наличие названия
                item.price && // проверяем наличие цены
                item.imageUrl // проверяем наличие изображения
            );
            
            console.log('Отфильтрованные элементы:', filteredItems.length);
            items.value = filteredItems.map((obj) => ({
                ...obj,
                imageUrl: `/sneakers/${obj.imageUrl.split('/').pop()}`,  // Извлекает имя файла и добавляет /sneakers/
                isFavorite: false,
                favoriteId: null,
                isAdded: false
            }));

            await fetchFavorites();
        } catch(err) {
            console.log(err)
        }
    }

    // Functions

    const onClickAddCart = (item) => {
        if(!item.isAdded) {
            addToCart(item)
        } else {
            removeFromCart(item)
        }
    }

    const onChangeSelect = event => {
        filters.sortBy = event.target.value
    }

    const onChangeSearchInput = event => {
        filters.searchQuery = event.target.value
    }

    //

    onMounted( async () => {
        const localCart = localStorage.getItem('cart')
        cart.value = localCart ? JSON.parse(localCart) : []

        await fetchItems();

        items.value = items.value.map((item) => ({
            ...item,
            isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
        }))
    })


    // watch

    // Не глубокая проверка,
    //  то есть если добавил item, то ничего не будет, в плане того, что он не реагирует
    //  на добавление и удаление элемента из массива items,
    //  если же мы добавим глубокую проверку deep: true, то он будет реагировать на добавление и удаление объектов в массиве

    watch(cart, () => {
        items.value = items.value.map((item) => ({
            ...item,
            isAdded: false
        }))
    })



    watch(filters, fetchItems)




</script>


<template>

    <div class="flex justify-between items-center mb-8">

        <h2 class="text-3xl font-bold">Все кроссовки</h2>

            <div class="flex gap-4">

                 <select @change="onChangeSelect" name="" id="" class="py-2 px-3 border rounded-md outline-none border-gray-200 focus:border-gray-400">
                    <option value="">Без сортировки</option>
                    <option value="name">По названию</option>
                    <option value="price">По цене (дешевые)</option>
                    <option value="-price">По цене (дорогие)</option>
                </select>


                <div class="relative">

                    <img class="absolute left-4 top-3.5" src="/search.svg" alt="">
                    <input @input="onChangeSearchInput" class="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Поиск">

                </div>

            </div>

        </div>

        <CardList :items="items" @addToFavorite="addToFavorite" @onClickAddCart="onClickAddCart"></CardList>

</template>