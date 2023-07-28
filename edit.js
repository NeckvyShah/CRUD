"use strict";
const submitBtn = document.querySelector(".back");
const productName = document.getElementById("pname");
const productId = document.getElementById("pid");
const productImg = document.getElementById("preview");
const productPrice = document.getElementById("pprice");
const productDesc = document.getElementById("pdesc");
const fileInput = document.querySelector('input[type="file"]');
const previewImg = document.getElementById("preview");

let index = localStorage.getItem("editData");
let products = localStorage.getItem("product_data");
const productArray = JSON.parse(products);
const product = productArray[index];
console.log(product);

// viewing the old values in form
productName.value = product.name;
productImg.src = product.img;
productId.value = product.id;
productPrice.value = product.price;
productDesc.value = product.desc;

// previewwing the img
let imgUrl;
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imgUrl = reader.result;
    previewImg.src = imgUrl;
  };
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  product.id = productId.value;
  product.name = productName.value;
  product.img = productImg.src;
  product.price = productPrice.value;
  product.desc = productDesc.value;
  localStorage.setItem("product_data", JSON.stringify(productArray));
  window.location.replace("index.html");
});
