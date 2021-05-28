import Vue from 'vue'
import App from './App.vue'

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
        render: h => h(App)
    })
})