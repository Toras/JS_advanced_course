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
    // Vue.component('HeaderButton', {
    //     template: `
    //     <div class="header-button">
    //         <div class="search-block">
    //           <input type="text" class="header-input" placeholder="Найти товар..." />
    //           <button v-on:click="searchButton" type="button">Найти</button>
    //           <button v-on:click="clearSearchButton" type="button">X</button>
    //         </div>
    //         <button @click="isBasketOpen = !isBasketOpen" class="cart-button" type="button">Корзина</button>
    //     </div>
    //     `,
    //     props: {
    //         goodsInCart: {
    //             type: Array,
    //             default: () => []
    //         },
    //         // query: {
    //         //     type: String,
    //         //     default: ''
    //         // },
    //         isBasketOpen: {
    //             type: Boolean
    //         }
    //     },
    //      data() {
    //         return {
    //             query: '',
    //         };
    //     },
    //     methods: {
    //         fetchCartData(callback) {
    //             makeGETRequest(`${baseUrl}${getBasketUrl}`, (data) => {
    //                 data = (JSON.parse(data));
    //                 this.goodsInCart = this.transformCartData(data);
    //             });
    //         },

    //         transformCartData(list) {
    //             return list.contents.map((item) => ({
    //                 title: item.product_name,
    //                 price: item.price,
    //                 quantity: item.quantity,
    //                 id: item.id_product
    //             }));
    //         },

    //         basketButton() {
    //             this.fetchCartData();
    //             this.isBasketOpen = !this.isBasketOpen;
    //         },

    //         searchButton() {
    //             this.query = document.querySelector('.header-input').value;
    //             //app.$refs.ref.fetchData();
    //         },

    //         clearSearchButton() {
    //             document.querySelector('.header-input').value = '';
    //             this.query = '';
    //         },
    //     },
    // });

    // Vue.component('Basket', {
    //     template: `
    //     <div class="basket">
    //         <div class="basket-list">
    //           <div v-for="item in cartGoods" class="cart-item">
    //             <p>{{ item.title }} {{ item.price }} {{ item.quantity }}</p>
    //             <button class="cart-del-button" href="#" type="button"> X </button>
    //           </div>
    //         </div>
    //     </div>
    //     `,
    //     props: {
    //         goodsInCart: {
    //             type: Array,
    //             default: () => []
    //         },
    //         qauery: {
    //             type: Boolean,
    //         },

    //         isBasketOpen: {
    //             type: Boolean
    //         }
    //     },
    //     // data() {
    //     //     return {
    //     //         goodsInCart: [],
    //     //         query: '',
    //     //         basketName: 'Добавить в корзину',
    //     //         isBasketOpen: false,
    //     //     };
    //     // },
    //     computed: {
    //         cartGoods() {
    //             const basketPlaceholder = document.querySelector('.basket');
    //             basketPlaceholder.style.display = this.isBasketOpen ? 'block' : 'none';
    //             return this.goodsInCart;
    //         }
    //     }
    // });

    // Vue.component('GoodsList', {
    //     template: `
    //     <div class="goods-list">
    //     <div v-for="item in filteredGoods" class="goods-item">
    //       <div class="goods-item--body">
    //         <img />
    //         <h3>{{ item.title }}</h3>
    //         <p>{{ item.price }}</p>
    //       </div>
    //       <div class="goods-item--button">
    //         <button class="add-button" href="#" type="button">{{ basketName }}</button>
    //       </div>
    //     </div>
    //     </div>
    //     `,
    //     props: {
    //         // goods: {
    //         //     type: Array,
    //         //     default: () => []
    //         // },
    //         query: {
    //             type: String,
    //             default: ''
    //         }
    //     },
    //     data() {
    //         return {
    //             // query: '',
    //             goods: [],
    //             basketName: 'Добавить в корзину',
    //             isBasketOpen: false,
    //         };
    //     },
    //     methods: {
    //         fetchData(callback) {
    //             makeGETRequest(`${baseUrl}${getListUrl}`, (data) => {
    //                 data = (JSON.parse(data));
    //                 this.goods = this.transformData(data);
    //             });
    //         },

    //         transformData(list) {
    //             return list.map((item) => ({
    //                 title: item.product_name,
    //                 price: item.price,
    //                 id: item.id_product
    //             }));
    //         },
    //     },
    //     computed: {
    //         filteredGoods() {
    //             return this.goods.filter((product) => (new RegExp(this.query, 'i').test(product.title)))
    //         }
    //     },
    //     mounted() {
    //         this.fetchData();
    //         // this.fetchCartData();
    //     }
    // });

    const app = new Vue({
        el: '#app',
        data: {
            goods: [],
            goodsInCart: [],
            query: '',
            basketName: 'Добавить в корзину',
            isBasketOpen: false,
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
                    <button @click="isBasketOpen = !isBasketOpen" class="cart-button" type="button">Корзина</button>
                </div>
                `,
                props: {
                    goodsInCart: {
                        type: Array,
                        default: () => []
                    },
                    query: {
                        type: String,
                        default: ''
                    },
                    isBasketOpen: {
                        type: Boolean
                    },
                },
                methods: {
                    fetchCartData(callback) {
                        makeGETRequest(`${baseUrl}${getBasketUrl}`, (data) => {
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
        
                    basketButton() {
                        this.fetchCartData();
                        this.isBasketOpen = !this.isBasketOpen;
                    },
        
                    searchButton() {
                        this.query = document.querySelector('.header-input').value;
                        app.$refs.goodsL.fetchData();
                    },
        
                    clearSearchButton() {
                        document.querySelector('.header-input').value = '';
                        this.query = '';
                    },
                },
            },
            'Basket': {
                template: `
                <div class="basket">
                    <div class="basket-list">
                      <div v-for="item in cartGoods" class="cart-item">
                        <p>{{ item.title }} {{ item.price }} {{ item.quantity }}</p>
                        <button class="cart-del-button" href="#" type="button"> X </button>
                      </div>
                    </div>
                </div>
                `,
                props: {
                    goodsInCart: {
                        type: Array,
                        default: () => []
                    },
                    qauery: {
                        type: Boolean,
                    },
        
                    isBasketOpen: {
                        type: Boolean
                    }
                },
                // data() {
                //     return {
                //         goodsInCart: [],
                //         query: '',
                //         basketName: 'Добавить в корзину',
                //         isBasketOpen: false,
                //     };
                // },
                computed: {
                    cartGoods() {
                        const basketPlaceholder = document.querySelector('.basket');
                        basketPlaceholder.style.display = this.isBasketOpen ? 'block' : 'none';
                        return this.goodsInCart;
                    }
                }
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
                    <button class="add-button" href="#" type="button">{{ basketName }}</button>
                  </div>
                </div>
                </div>
                `,
                props: {
                    // goods: {
                    //     type: Array,
                    //     default: () => []
                    // },
                    query: {
                        type: String,
                        default: ''
                    }
                },
                data() {
                    return {
                        // query: '',
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
                            id: item.id_product
                        }));
                    },
                },
                computed: {
                    filteredGoods() {
                        return this.goods.filter((product) => (new RegExp(this.query, 'i').test(product.title)))
                    }
                },
                mounted() {
                    this.fetchData();
                    // this.fetchCartData();
                }
            }
        }
    })
})