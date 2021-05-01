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
    const catalogData = await catalogDataJson.json();
    render(catalogPlaceholder, catalogData, renderGoodsItem);

    const basketBtnPlaceholder = document.querySelector('.cart-button');

    basketBtnPlaceholder.addEventListener('click', async () => {
        const basketPlaceholder = document.querySelector('.basket');
        isBasketOpen = !isBasketOpen;
        basketPlaceholder.style.display = isBasketOpen ? 'block': 'none';
        const basketDataJson = await fetch(`${baseUrl}${getBasketUrl}`);
        const basketData = await basketDataJson.json();
        isBasketOpen ? render(basketPlaceholder, basketData["contents"], renderBasketList) : '';
    })
});
