"use strict";

class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  //метод, определяющий суммарную стоимость всех товаров
  getPrice() {
    let summ = 0;
    this.goods.forEach((good) => {
      summ += good.price;
    });
  }
}
//класс для элемента корзины
class BasketItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}
//класс для корзины товаров
class BasketList {
  constructor() {
    this.basket = [];
  }
  //метод для заполнения козины элементами, пока фиксированные элементы
  fetchBasket() {
    this.basket = [
      { title: "Shirt", price: 150 },
      { title: "Shoes", price: 250 },
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".basket-list").innerHTML = listHtml;
  }
  //метод для подсчета суммы элементов корзины
  getPrice() {
    let summ = 0;
    this.basket.forEach((good) => {
      summ += good.price;
    });
  }
}
const list = new GoodsList();
list.fetchGoods();
list.render();
list.getPrice();
