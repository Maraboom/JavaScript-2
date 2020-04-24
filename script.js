"use strict";
function makeGETRequest(url, callback) {
  var xhr;

  // const browser = function () {
  //   const promise = new Promise((resolve, reject) => {
  //     if (window.XMLHttpRequest) {
  //       resolve(xhr = new XMLHttpRequest());
  //     } else if(window.ActiveXObject) {
  //       resolve(xhr = new ActiveXObject("Microsoft.XMLHTTP"));
  //     }
  //   });
  //   return promise;
  // };

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    const promise = new Promise((resolve, reject) => {
      if (xhr.readyState === 4) {
        resolve(callback(xhr.responseText));
      }
    });

    return promise;
  };
  // browser()
  // .then (xhr.open("GET", url, true))
  // .then (xhr.send())

  //   .then(() => {
  //     return xhr.onreadystatechange();
  // })
  // .then(() => {});
  xhr.onreadystatechange();

  xhr.open("GET", url, true);
  xhr.send();
}

class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    });
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
    console.log(this.goods);
  }
}

//методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

//класс для корзины товаров
class BasketList {
  constructor() {
    this.basket = [];
  }
  //   //метод для заполнения козины элементами, пока фиксированные элементы
  fetchBasket() {
    makeGETRequest(`${API_URL}/getBasket.json`, (basket) => {
      this.basket = JSON.parse(basket);
      console.log(this.basket);
    });
  }
  delItem() {
    makeGETRequest(`${API_URL}/deleteFromBasket.json`, (basket) => {
      this.basket = JSON.parse(basket);
      console.log(this.basket);
    });
  }
  //метод для подсчета суммы элементов корзины
  getPrice() {
    let summ = 0;
    this.basket.forEach((good) => {
      summ += good.price;
    });
  }
}

class BasketItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
  // delItem() {
  //   makeGETRequest(`${API_URL}/deleteFromBasket.json`, (basket) => {
  //     this.basket = JSON.parse(basket);
  //     console.log(this.basket);
  //   });
  // }
}

const chosenItem = new BasketItem();
const chosenList = new BasketList();
const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});
chosenList.fetchBasket();
//chosenItem.delItem();
//chosenList.delItem();
//chosenList.fetchBasket();
