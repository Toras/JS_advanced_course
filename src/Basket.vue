<template>
<div class="basket">
    <div class="basket-list">
        <div v-for="item in cartGoods" :key="item.title" class="cart-item">
        <p>{{ item.title }} {{ item.price }} {{ item.quantity }}</p>
        <button class="cart-del-button" href="#" @click="() => removeFromBasket(item)" type="button"> X </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    mame: 'Basket',
    props: {
        goodsInCart: {
            type: Array
        },

        isBasketOpen: {
            type: Boolean
        }
    },

    methods: {
        removeFromBasket(item) {
            makePOSTRequest('/removeFromBasket', JSON.stringify(item), () => {
                console.log('removed product from cart:', item);
                app.$refs.headerL.fetchCartData();
            });
        },
    },

    computed: {
        cartGoods: {
            get: function(){
                return this.goodsInCart;
            },
            set: function(){}
        },
        openBasket: {
            get: function() {
                return this.isBasketOpen;
            },
            set: function(){}
        }
    },
}
</script>