"use strict";
const backBtn = document.querySelector(".back");
const productName = document.getElementById("pname");
const productId = document.getElementById("pid");
const productImg = document.getElementById("preview");
const productPrice = document.getElementById("pprice");
const productDesc = document.getElementById("pdesc");

let index = localStorage.getItem("viewData");
let products = localStorage.getItem("product_data");
const productArray = JSON.parse(products);
const product = productArray[index];

// setting the values
productName.value = product.name;
productImg.src = product.img;
productId.value = product.id;
productPrice.value = product.price;
productDesc.value = product.desc;

backBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.replace("index.html");
});
