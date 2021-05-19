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

document.addEventListener('DOMContentLoaded', () => {
    const app = new Vue({
        el: '#app',
        data: {
            goods: [],
            query: '',
            basketName: 'Добавить в корзину',
        },
        methods: {
            fetchData(callback) {
                makeGETRequest(`${baseUrl}${getListUrl}`, (data) =>{
                    data = (JSON.parse(data));
                    this.goods = this.transformData(data);
                });
            },

            transformData(list) {
                return list.map((item) => ({
                    title: item.product_name,
                    price: item.price,
                    id: item.product_name
                }));
            }
        },
        computed: {
            filteredGoods() {
                return this.goods.filter((product) => (new RegExp(this.query, 'i').test(product.title)))
            }
        },
        mounted() {
            this.fetchData();
        }
    })
})