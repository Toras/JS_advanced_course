<template>
    <div class="header-button">
        <div class="search-block">
            <input type="text" class="header-input" placeholder="Найти товар..." />
            <button v-on:click="searchButton" type="button">Найти</button>
            <button v-on:click="clearSearchButton" type="button">X</button>
        </div>
        <button @click=basketButton class="cart-button" type="button">Корзина</button>
    </div>
</template>

<script>
export default {
    name: 'HeaderButton',
    props: {
        query: {
            type: String,
            default: ''
        },
        isBasketOpen: {
            type: Boolean
        },
    },
    data() {
        return {
            goodsInCart: [],
        };
    },

    methods: {
        fetchCartData(callback) {
            makeGETRequest(`${baseUrl}${getBasketUrl}`, (data) => {
                if (data != '[]') {
                    data = (JSON.parse(data));
                    this.goodsInCart = this.transformCartData(data);
                } else { this.goodsInCart = []; }
            });
        },

        transformCartData(list) {
            return list.map((item) => ({
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                id: item.title
            }));
        },

        basketButton() {
            this.fetchCartData();
            this.$emit('onisbasketchange', [!this.isBasketOpen, this.goodsInCart]);
        },

        searchButton() {
            let query = document.querySelector('.header-input').value;
            this.$emit('onquerychange', query);
        },

        clearSearchButton() {
            document.querySelector('.header-input').value = '';
            this.$emit('onquerychange', '');
        },
    },
    mounted() {
        this.fetchCartData();
    }
}
</script>