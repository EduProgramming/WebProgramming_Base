// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Client-ID {{clientId}}");

// var formdata = new FormData();
// formdata.append(
//   "image",
//   "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
// );

// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: formdata,
//   redirect: "follow",
// };

// fetch("https://api.imgur.com/3/image", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

const imgInputList = document.querySelector(".product-img-input-list");
const imgContainer = document.querySelector(".product-img-ul");
const imgInput = document.getElementById("product-img-input");

const inputContent = document.getElementById('product-content');
const inputPrice = document.getElementById("product-price");
const createBtn = document.getElementById('product-create-btn');

imgInput.addEventListener("change", (e) => {
  const files = e.target.files;
  for (let file of files) {
    imagePreView(file);
  }
});

imagePreView = function (file) {
  const reader = new FileReader();
  reader.onload = function (element) {
    const list = document.createElement("li");
    list.setAttribute("class", "product-img-list");
    const img = document.createElement("img");
    img.src = element.target.result;
    list.appendChild(img);
    img.setAttribute("class", "w-100 h-100");
    imgContainer.appendChild(list);
  };
  reader.readAsDataURL(file);
};

inputContent.addEventListener('input', (e) => {
  let value = e.target.value;
  let contentCount = document.querySelector('.product-content-count');
  contentCount.innerText = value.length;
})

inputPrice.addEventListener("input", (e) => {
  let value = e.target.value;
  e.target.value = value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
  value = e.target.value;
  value = Number(value.replaceAll(",", ""));
  const formatValue = value.toLocaleString("ko-KR");
  inputPrice.value = formatValue;
});

// createBtn.onclick = (element) => {
//   const productForm = document.getElementById("product-form")
//   productForm.method = "post";
//   productForm.action = "/product";
//   productForm.submit();
// }