"use strict";

const registerForm = document.querySelector(".registerForm");
const submitBtn = document.querySelector(".submit");
const pIdEl = document.getElementById("pid");
const pNameEl = document.getElementById("pname");
const pImgEl = document.getElementById("pimg");
const previewImg = document.getElementById("preview");
const pPriceEl = document.getElementById("pprice");
const pDescEl = document.getElementById("pdesc");
const tableData = document.getElementById("table__data");
const fileInput = document.querySelector('input[type="file"]');
const filterbyId = document.querySelector("#searchById");
const sortBtn = document.getElementById("sort");

let imgUrl;
let product_data = JSON.parse(localStorage.getItem("product_data")) || [];

// submit button to prevent refresh and store the values in local storage
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  tableData.innerHTML = "";
  dataRegistration();
  getDataFromLocal();
  previewImg.classList.toggle("hidden");
  registerForm.reset("");
});

const dataRegistration = function () {
  product_data.push({
    id: pIdEl.value,
    name: pNameEl.value,
    img: imgUrl == undefined ? "NO IMAGE" : imgUrl,
    price: pPriceEl.value,
    desc: pDescEl.value,
  });
  localStorage.setItem("product_data", JSON.stringify(product_data));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your Product was Registered!",
    showConfirmButton: true,
  });
};

const getDataFromLocal = function () {
  console.log(product_data);
  product_data.forEach((data, index) => {
    const html = `<tr index=${index} id="tr-${index}">
    <td>${index + 1}</td>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td align="center"><img src="${data.img}" alt="No image" width="70"></td>
    <td>₹${data.price}</td>
    <td>${data.desc}</td>
    <td>
    <button class="view-btn" onclick="viewFun(${index})">
      <i class="fa-sharp fa-solid fa-eye" style="color: #ffffff"></i>
      </button>
      <button class="edit-btn" onclick="editFun(${index})" >
      <i class="fa-solid fa-pen" style="color: #ffffff"></i>
      </button>
      <button class="delete-btn" onclick="deleteFun(${index})">
      <i class="fa-solid fa-trash" style="color: #ffffff">
      </i>
      </button>
    </td>
  </tr>`;
    tableData.insertAdjacentHTML("beforeend", html);
  });
};

// loading the data as soon as the page loads
getDataFromLocal();

// previewing the img in form, setting the img url in localstorage
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imgUrl = reader.result;
    previewImg.src = imgUrl;
    previewImg.classList.toggle("hidden");
  };
});

// DELETE
function deleteFun(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(index);
      product_data.splice(index, 1);
      localStorage.setItem("product_data", JSON.stringify(product_data));
      document.getElementById("tr-" + index).remove();
      tableData.innerHTML = "";
      getDataFromLocal();
      Swal.fire({
        position: "center",
        title: "Your product has been successfully deleted!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });
}

// VIEW
function viewFun(index) {
  localStorage.setItem("viewData", JSON.stringify(index));
  window.location.replace("view.html");
}

//EDIT
function editFun(index) {
  localStorage.setItem("editData", JSON.stringify(index));
  window.location.replace("edit.html");
}

// SEARCH BY ID
filterbyId.addEventListener("input", () => {
  const searchedId = filterbyId.value;
  let products = JSON.parse(localStorage.getItem("product_data"));
  let eachProduct = products.filter((pKey) => pKey.id.includes(searchedId));
  if (eachProduct.length === 0) {
    Swal.fire({
      position: "center",
      title: "Enter a valid product",
      showConfirmButton: true,
    });
  } else {
    renderTable(eachProduct);
  }
});

function renderTable(eachProduct) {
  tableData.innerHTML = "";
  eachProduct.forEach((eachProduct, index) => {
    const html = `<tr index=${index} id="tr-${index}">
    <td>${index + 1}</td>
    <td>${eachProduct.id}</td>
    <td>${eachProduct.name}</td>
    <td align="center"><img src="${
      eachProduct.img
    }" alt="No image" width="70"></td>
    <td>${eachProduct.price}</td>
    <td>${eachProduct.desc}</td>
    <td>
    <button class="view-btn" onclick="viewFun(${index})">
      <i class="fa-sharp fa-solid fa-eye" style="color: #ffffff"></i>
      </button>
      <button class="edit-btn" onclick="editFun(${index})" >
      <i class="fa-solid fa-pen" style="color: #ffffff"></i>
      </button>
      <button class="delete-btn" onclick="deleteFun(${index})">
      <i class="fa-solid fa-trash" style="color: #ffffff">
      </i>
      </button>
    </td>
  </tr>`;
    tableData.insertAdjacentHTML("beforeend", html);
  });
}

// SORT
sortBtn.addEventListener("click", () => {
  let temp_p;
  const nameData = JSON.parse(localStorage.getItem("product_data"));
  if (sortBtn.value === "id") {
    temp_p = [...nameData].sort((a, b) => a.id - b.id);
    renderTable(temp_p);
  } else if (sortBtn.value === "name") {
    temp_p = [...nameData].sort((a, b) => a.name.localeCompare(b.name));
    renderTable(temp_p);
  } else if (sortBtn.value === "price") {
    temp_p = [...nameData].sort((a, b) => a.price - b.price);
    renderTable(temp_p);
  }
});
