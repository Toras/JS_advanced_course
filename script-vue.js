const makeGETRequest = (url, callback) => {
    let xhr;

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
};

const makePOSTRequest = (url, data, callback) => {
    let xhr;

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

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.send(data);
};

// const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// const getListUrl = '/catalogData.json';
// const getBasketUrl = '/getBasket.json';
// const addToBasketUrl = '/addToBasket.json';
// const removeFromBasketUrl = '/deleteFromBasket.json';

const baseUrl = '';
const getListUrl = '/catalogData';
const getBasketUrl = '/getBasket';
const addToBasketUrl = '/addToBasket';
const removeFromBasketUrl = '/removeFromBasket';


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
            queryChange: function(queryNewValue) {
                this.query = queryNewValue;
            },
            isBasketChange: function(result) {
                this.isBasketOpen = result[0];
                this.goodsInCart = result[1].slice();
            },
},

        components: {
            'HeaderButton': {
                template: `
                <div class="header-button">
                    <div class="search-block">
                      <input type="text" class="header-input" placeholder="Найти товар..." />
                      <button v-on:click="searchButton" type="button">Найти</button>
                      <button v-on:click="clearSearchButton" type="button">X</button>
                    </div>
                    <button @click=basketButton class="cart-button" type="button">Корзина</button>
                </div>
                `,
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
            },
            'Basket': {
                template: `
                <div class="basket">
                    <div class="basket-list">
                      <div v-for="item in cartGoods" class="cart-item">
                        <p>{{ item.title }} {{ item.price }} {{ item.quantity }}</p>
                        <button class="cart-del-button" href="#" @click="() => removeFromBasket(item)" type="button"> X </button>
                      </div>
                    </div>
                </div>
                `,

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
            },
            'GoodsList': {
                template: `
                <div class="goods-list">
                <div v-for="item in filteredGoods" class="goods-item">
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
                `,
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
        }
    })
});
