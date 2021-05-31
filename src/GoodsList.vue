<template>
    <div class="goods-list">
        <div v-for="item in filteredGoods" :key="item.title" class="goods-item">
            <div class="goods-item--body">
                <img />
                <h3>{{ item.title }}</h3>
                <p>{{ item.price }}</p>
            </div>
            <div class="goods-item--button">
                <button class="add-button" href="#" @click="() => addToBasket(item)" type="button">{{ basketName }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsList',
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            goods: [],
            basketName: 'Добавить в корзину',
            isBasketOpen: false,
        };
    },
    methods: {
        fetchData(callback) {
            makeGETRequest(`${baseUrl}${getListUrl}`, (data) => {
                data = (JSON.parse(data));
                this.goods = this.transformData(data);
            });
        },

        transformData(list) {
            return list.map((item) => ({
                title: item.product_name,
                price: item.price,
                quantity: 1,
                id: item.product_name
            }));
        },
        addToBasket(item) {
            makePOSTRequest('/addToBasket', JSON.stringify(item), () => {
                console.log('added product to cart:', item);
                app.$refs.headerL.fetchCartData();
            });
        },
    },
    computed: {
        filteredGoods() {
            return this.goods.filter((product) => (new RegExp(this.query, 'i').test(product.title)));
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>
