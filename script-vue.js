const makeGETRequest = (url, callback) => {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addToBasketUrl = '/addToBasket.json';
const removeFromBasketUrl = '/deleteFromBasket.json';

document.addEventListener('DOMContentLoaded', () => {
    const app = new Vue({
        el: '#app',
        data: {
            goods: [],
            goodsInCart: [],
            query: '',
            basketName: 'Добавить в корзину',
            isBasketOpen: false,
        },
        methods: {
            fetchData(callback) {
                makeGETRequest(`${baseUrl}${getListUrl}`, (data) =>{
                    data = (JSON.parse(data));
                    this.goods = this.transformData(data);
                });
            },

            fetchCartData(callback) {
                makeGETRequest(`${baseUrl}${getBasketUrl}`, (data) =>{
                    data = (JSON.parse(data));
                    this.goodsInCart = this.transformCartData(data);
                });
            },

            transformCartData(list) {
                return list.contents.map((item) => ({
                    title: item.product_name,
                    price: item.price,
                    quantity: item.quantity,
                    id: item.id_product
                }));
            },

            transformData(list) {
                return list.map((item) => ({
                    title: item.product_name,
                    price: item.price,
                    id: item.id_product
                }));
            },

            basketButton() {
                this.fetchCartData();
                this.isBasketOpen = !this.isBasketOpen;
            },

            searchButton() {
                this.query = document.querySelector('.header-input').value;
            },

            clearSearchButton() {
                document.querySelector('.header-input').value = '';
                this.query = '';
            },
        },
        computed: {
            filteredGoods() {
                return this.goods.filter((product) => (new RegExp(this.query, 'i').test(product.title)))
            },
            cartGoods() {
                const basketPlaceholder = document.querySelector('.basket');
                basketPlaceholder.style.display = this.isBasketOpen ? 'block': 'none';
                return this.goodsInCart;
            }
        },
        mounted() {
            this.fetchData();
            this.fetchCartData();
        }
    })
})