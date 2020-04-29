"use strict";
// const str =
//   "Fjhhfhchc 'fjsgfgshfs' fvdgdgdgd aren't dvhsgsh 'cshf' aren't 'vfdv' xbbbdg";

// const regexp = /^'|(\s)'|'(\s)|'$/g;

// console.log(str);

// console.log(str.replace(regexp, '$1"$2'));

// Имя содержит только буквы.
// b.  Телефон имеет вид +7(000)000-0000.
// c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d.  Текст произвольный.

let form = document.querySelector("form");
let button = document.querySelector(".button");
let fields = form.querySelectorAll(".fieldStyle");

let generateError = function (text) {
  let error = document.createElement("div");
  error.className = "error";

  error.innerHTML = text;
  return error;
};

let removeValidation = function () {
  let errors = form.querySelectorAll(".error");

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
};

let checkFieldsPresence = function () {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log("field is blank", fields[i]);
      let error = generateError("Fill this field");
      fields[i].parentElement.insertBefore(error, fields[i]);
    }
  }
};

let checkMatch = function () {
  let name = form.querySelector(".name");
  console.log(name);
  let dd = /\w+/;
  if (!dd.test(name.value)) {
    console.log("not equals");
    let error = generateError("Juast a-b");
    console.log(error);

    name.parentElement.insertBefore(error, name);
  }
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("clicked on validate");

  removeValidation();

  checkFieldsPresence();
  checkMatch();
});
