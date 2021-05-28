<script>
import HeaderButton from './HeaderButton.vue';
import Basket from './Basket.vue';
import GoodsList from './GoodsList.vue';

export default {
    name: 'app',
    data() {
        return {
            goods: [],
            goodsInCart: [],
            query: '',
            basketName: 'Добавить в корзину',
            isBasketOpen: false,
        };
    },

    methods: {
        queryChange: function(queryNewValue) {
            this.query = queryNewValue;
        },
        isBasketChange: function(result) {
            this.isBasketOpen = result[0];
            this.goodsInCart = result[1].slice();
        },
    },

    components: { HeaderButton, Basket, GoodsList }
}
</script>