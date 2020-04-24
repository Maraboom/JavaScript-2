"use strict";
function makeGETRequest(url, callback) {
  var xhr;
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
  xhr.onreadystatechange().then(() => {});

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

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

// class GoodsList {
//   constructor() {
//     this.goods = [];
//   }
//   fetchGoods() {
//     this.goods = [
//       { title: "Shirt", price: 150 },
//       { title: "Socks", price: 50 },
//     { title: "Jacket", price: 350 },
//     { title: "Shoes", price: 250 },
//   ];
// }
// render() {
//   let listHtml = "";
//   this.goods.forEach((good) => {
//     const goodItem = new GoodsItem(good.title, good.price);
//     listHtml += goodItem.render();
//   });
//     document.querySelector(".goods-list").innerHTML = listHtml;
//   }
//   //метод, определяющий суммарную стоимость всех товаров
//   getPrice() {
//     let summ = 0;
//     this.goods.forEach((good) => {
//       summ += good.price;
//     });
//   }
// }
// //класс для элемента корзины
// class BasketItem {
//   constructor(title, price) {
//     this.title = title;
//     this.price = price;
//   }
//   render() {
//     return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
//   }
// }
// //класс для корзины товаров
// class BasketList {
//   constructor() {
//     this.basket = [];
//   }
//   //метод для заполнения козины элементами, пока фиксированные элементы
//   fetchBasket() {
//     this.basket = [
//       { title: "Shirt", price: 150 },
//       { title: "Shoes", price: 250 },
//     ];
//   }
//   render() {
//     let listHtml = "";
//     this.goods.forEach((good) => {
//       const goodItem = new GoodsItem(good.title, good.price);
//       listHtml += goodItem.render();
//     });
//     document.querySelector(".basket-list").innerHTML = listHtml;
//   }
//   //метод для подсчета суммы элементов корзины
//   getPrice() {
//     let summ = 0;
//     this.basket.forEach((good) => {
//       summ += good.price;
//     });
//   }
// }
// const list = new GoodsList();
// list.fetchGoods();
// list.render();
// list.getPrice();
