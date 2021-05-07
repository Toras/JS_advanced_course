'use strict'

const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addToBasketUrl = '/addToBasket.json';
const removeFromBasketUrl = '/deleteFromBasket.json';

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class Hamburger {
    size
    stuffing = []
    topping = []

    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
    }
    // Добавить добавку 
    addTopping(topping) {
        this.topping.push(topping);
    }
    // Убрать добавку 
    removeTopping(topping) { 
        this.topping.splice(this.topping.indexOf(topping), 1);
    }
    // Получить список добавок 
    getToppings(topping) {
        return this.topping;
    }
    // Узнать размер гамбургера
    getSize() { 
        return this.size;
    }
    // Узнать начинку гамбургера 
    getStuffing() {
        return this.stuffing;
    }
    // Узнать цену 
    calculatePrice() {
        let sum = 0;
        sum = (this.size == 'Маленький') ? 50 : 100;
        for (let i in this.stuffing) {
            switch (this.stuffing[i]) {
                case 'С сыром': sum += 10; break;
                case 'С салатом': sum += 20; break;
                case 'С картофелем': sum += 15;
            }
        }
        for (let i in this.topping) {
            switch (this.topping[i]) {
                case 'приправа': sum += 15; break;
                case 'майонез': sum += 20;
            }
        }

        return sum;
    }
    // Узнать калорийность
    calculateCalories() {
        let sum = 0;
        sum = (this.size == 'Маленький') ? 20 : 40;
        for (let i in this.stuffing) {
            switch (this.stuffing[i]) {
                case 'С сыром': sum += 20; break;
                case 'С салатом': sum += 5; break;
                case 'С картофелем': sum += 10;
            }
        }
        for (let i in this.topping) {
            switch (this.topping[i]) {
                case 'приправа': sum += 0; break;
                case 'майонез': sum += 5;
            }
        }

        return sum;
    }
}

class Product {
    id
    name
    price
    edIzm

    constructor (id, name, price, edIzm = 'шт.') {
        this.id = id;
        this.name = name;
        this.price = price;
        this.edIzm = edIzm;
    }

    render() {
        return `<div class="goods-item">
                    <div class="goods-item--body">
                        <img />
                        <h3>${this.name}, ${this.edIzm}</h3>
                        <p>${this.price}</p>
                    </div>
                    <div class="goods-item--button">
                        <button class="add-button" href="${baseUrl}${addToBasketUrl}" type="button">Добавить в корзину</button>
                    </div>
                </div>`;
    }

    sum(quantity) {
        return this.price * quantity;
    }
};

class Basket {
    productsInBasket = new Map();//{Продукт: количество}
    placeholder

    constructor (productsList, placeholder) {
        this.productsInBasket = productsList;
        this.placeholder = placeholder;
    }

    renderBasketElement(product, quantity) {
        return `<div class="cart-item">
                    <p>${product.name} ${product.price} ${quantity}</p>
                    <button class="cart-del-button" href="${baseUrl}${removeFromBasketUrl}" type="button"> X </button>
                </div>`;
    }
    
    render() {
        this.placeholder.innerHTML = "";
        for (let [key, value] of this.productsInBasket) {
            this.placeholder.innerHTML += this.renderBasketElement(key, value);
        }
    }

    sumInBasket() {
        let sum = 0
        for (let i in this.productsInBasket) {
            sum += this.productsInBasket[i].key.sum(this.productsInBasket[i].value);
        }
        return sum;
    }

    addToBasket(product, quantity) {
        this.productsInBasket.set(product, quantity);
    }

    removeFromBasket(product) {
        this.productsInBasket.delete(product);
    }
};

const renderGoodsItem = (title, price) => {
  return `<div class="goods-item">
            <div class="goods-item--body">
                <img />
                <h3>${title}</h3>
                <p>${price}</p>
            </div>
            <div class="goods-item--button">
                <button class="add-button" href="${baseUrl}${addToBasketUrl}" type="button">Добавить в корзину</button>
            </div>
          </div>`;
};

const renderBasketList = (title, price, quantity) => {
    return `<div class="cart-item">
                <p>${title} ${price} ${quantity}</p>
                <button class="cart-del-button" href="${baseUrl}${removeFromBasketUrl}" type="button"> X </button>
            </div>`;
}

const render = (placeholder, list, renderWorker) => {
    placeholder.innerHTML = "";
    list.map(item => placeholder.innerHTML += renderWorker(item.product_name, item.price, item.quantity));
}

const catalogPlaceholder = document.querySelector('.goods-list');

document.addEventListener("DOMContentLoaded", async () => {
    let isBasketOpen = false;
    const catalogDataJson = await fetch(`${baseUrl}${getListUrl}`);
    let catalogData = await catalogDataJson.json();
    catalogData = catalogData.map(item => new Product(item.id_product, item.product_name, item.price));
    catalogData.map(item => catalogPlaceholder.innerHTML += item.render());

    const basketBtnPlaceholder = document.querySelector('.cart-button');

    basketBtnPlaceholder.addEventListener('click', async () => {
        const basketPlaceholder = document.querySelector('.basket');
        const curBasket = new Basket(new Map(), basketPlaceholder);
        isBasketOpen = !isBasketOpen;
        basketPlaceholder.style.display = isBasketOpen ? 'block': 'none';
        const basketDataJson = await fetch(`${baseUrl}${getBasketUrl}`);
        const basketData = await basketDataJson.json();
        for (let i in basketData['contents']) {
            curBasket.addToBasket(new Product(basketData['contents'][i].id_product, basketData['contents'][i].product_name, basketData['contents'][i].price), basketData['contents'][i].quantity);
        }
       // isBasketOpen ? render(basketPlaceholder, basketData["contents"], renderBasketList) : '';
        isBasketOpen ? curBasket.render(): '';
    })
});
