
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);

if (productLocalStorage) {
  productLocalStorage.forEach(function (product, index) {

    fetch(`http://localhost:3000/api/products/${product.productId}`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })

      .then(function (products) {

        // Create "article" element

        let article = document.createElement("article");
        article.setAttribute('data-id', product.productId);
        article.setAttribute('class', 'cart__item');
        document.getElementById("cart__items").appendChild(article);
        // You can use this instead of "setAttribute" =>  article.className = "cart__item"; 

        // Create first "div" element for imageCreate inside "article"
        let imageDiv = document.createElement("div");
        article.appendChild(imageDiv);
        imageDiv.setAttribute('class', "cart__item__img");

        // Create "img" element 
        let image = document.createElement("img");
        imageDiv.appendChild(image);
        image.setAttribute('src', products.imageUrl);
        image.setAttribute('alt', products.altTxt);

        // Create second "div" element inside "article"
        let divItem = document.createElement("div");
        article.appendChild(divItem);
        divItem.setAttribute('class', "cart__item__content");

        // Create fisrt "div" element for h2, p, p inside "divitem"
        let divDescription = document.createElement("div");
        divItem.appendChild(divDescription);
        divDescription.setAttribute('class', "cart__item__content__titlePrice");

        // Create h2 element for name of the product
        let title = document.createElement("h2");
        divDescription.appendChild(title);
        title.innerText = products.name;

        // Create p element for color of the product
        let color = document.createElement("p");
        divDescription.appendChild(color);
        color.innerText = product.productColor;

        // Create p element for price of the product
        let price = document.createElement("p");
        divDescription.appendChild(price);
        price.innerText = products.price + " €";

        // Create second "div" element inside divItem
        let divSettings = document.createElement("div");
        divItem.appendChild(divSettings);
        divSettings.setAttribute('class', "cart__item__content__settings");

        // Create first "div" element inside divSettings
        let divQuantity = document.createElement("div");
        divSettings.appendChild(divQuantity);
        divQuantity.setAttribute('class', "cart__item__content__settings__quantity");

        // Create "p" element inside divQuantity
        let quantityEl = document.createElement("p");
        divQuantity.appendChild(quantityEl);
        quantityEl.innerText = "Quantité : ";

        // Create "input" element inside divQuantity
        let productQuantity = document.createElement("input");
        divQuantity.appendChild(productQuantity);
        productQuantity.value = product.productQuantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Create second "div" element inside divSettings
        let divDelete = document.createElement("div");
        divSettings.appendChild(divDelete);
        divDelete.setAttribute('class', "cart__item__content__settings__delete");

        // Create second "p" element inside divDelete
        let pDelete = document.createElement("p");
        divDelete.appendChild(pDelete);
        pDelete.setAttribute('class', "deleteItem");
        pDelete.innerText = "Supprimer";

        pDelete.addEventListener('click', function () {

          // remove 1 element at index i

          productLocalStorage.splice(index, 1);

          // send the new data to the localStorage

          localStorage.setItem("product", JSON.stringify(productLocalStorage));

          console.log(productLocalStorage);

          // message after deleted item and refresh the page

          alert("⚠️ The selected product will be deleted from your cart!");

          window.location.reload();

        });

        // FUNCTION CHANGE QUANTITY


        function changeProductQuantity() {

          let changeQuantity = document.querySelectorAll(".itemQuantity");
          console.log(changeQuantity);

          for (let i = 0; i < changeQuantity.length; i++) {

            changeQuantity[i].addEventListener("change", (event) => {

              // event.preventDefault();

              event.stopPropagation();

              let updatedQuantity = changeQuantity[i].value;

              if (updatedQuantity <= 0) {
                alert('⚠️ You can not enter 0 and negatif values!');
                changeQuantity[i].value = productLocalStorage[i].productQuantity;
              }
              else if (updatedQuantity > 100) {
                alert('⚠️ Please enter a number which is smaller than 100!')
              }
              else if (updatedQuantity >= 1 && updatedQuantity <= 100) {
                productLocalStorage[i].productQuantity = changeQuantity[i].value;
                localStorage.setItem('product', JSON.stringify(productLocalStorage));
                totalPrice();
              }
              window.location.reload();
            })
          }
        }
        changeProductQuantity();

        // FUNCTION TOTAL PRICE

        function totalPrice() {
          changeQuantity = document.querySelectorAll(".itemQuantity");

          // Determine total quantity

          // let changeQuantity = document.getElementsByClassName('itemQuantity');
          let myCart = changeQuantity.length,
            totalQuantity = 0;
          console.log(myCart);

          for (var i = 0; i < myCart; ++i) {
            totalQuantity += changeQuantity[i].valueAsNumber;
          }

          let productTotalQuantity = document.getElementById('totalQuantity');
          productTotalQuantity.innerText = totalQuantity;

          // Calculate total price
          displayTotalPrice = 0;

          for (var i = 0; i < myCart; ++i) {
            displayTotalPrice += (changeQuantity[i].valueAsNumber * products.price);
          }

          let showTotalPrice = document.getElementById("totalPrice");
          showTotalPrice.innerText = displayTotalPrice;
        }
        totalPrice();
      });
  });
}

// FORM

let formSubmitButton = document.querySelector('.cart__order__form');

var regExText = /^[a-zA-Z\s\'\-]{3,10}$/;
var regExAddress = /^([a-zA-z0-9/\\''(),-\s]{2,255})$/;
var regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

function validateFirstName() {

  // Choose the input for firstName
  // Create regEx to test input for 3-10 allowed characters, special characters are not allowed  regExText;
  let firstName = document.getElementById("firstName").value;

  if (regExText.test(firstName)) {//if input is valid, update page to show succesful entry
    document.getElementById("firstNameErrorMsg").innerText = "✅ Name is valid!";
    return true;
  }
  else {//if input is invalid, update page to prompt for new input
    document.getElementById("firstNameErrorMsg").innerText = "⚠️ Please enter a valid name using 3-10 characters";
    return false;
  }

}

formSubmitButton.firstName.addEventListener('change', function () {
  validateFirstName();
});

// Validate lastName

function validatelastName() {

  // For lastName you can use the same regEx => regExText
  let lastName = document.getElementById("lastName").value;

  if (regExText.test(lastName)) {
    document.getElementById("lastNameErrorMsg").innerText = "✅ Last name is valid!";
    return true;
  }
  else {
    document.getElementById("lastNameErrorMsg").innerText = "⚠️ Please enter a valid last name using 3-10 characters";
    return false;
  }

}

formSubmitButton.lastName.addEventListener('change', function () {
  validatelastName();
});

// Validate address

function validateAddress() {

  // For address you can use the same regEx => regExText
  let address = document.getElementById("address").value;

  if (regExAddress.test(address)) {
    document.getElementById("addressErrorMsg").innerText = "✅ Address is valid!";
    return true;
  }
  else {
    document.getElementById("addressErrorMsg").innerText = "⚠️ Please enter a valid address!";
    return false;
  }
}

formSubmitButton.address.addEventListener('change', function () {
  validateAddress();
});

function validateCity() {

  // For address you can use the same regEx => regExText
  let city = document.getElementById("city").value;

  if (regExText.test(city)) {
    document.getElementById("cityErrorMsg").innerText = "✅ City name is valid!";
    return true;
  }
  else {
    document.getElementById("cityErrorMsg").innerText = "⚠️ Please enter a valid city name!";
    return false;
  }
}

formSubmitButton.city.addEventListener('change', function () {
  validateCity();
});

function validateEmail() {

  // For address you can use the same regEx => regExText
  let email = document.getElementById("email").value;

  if (regExEmail.test(email)) {
    document.getElementById("emailErrorMsg").innerText = "✅ Email address is valid!";
    return true;
  } else {
    document.getElementById("emailErrorMsg").innerText = "⚠️ Please enter a valid email address!";
    return false;
  }
}

formSubmitButton.email.addEventListener('change', function () {
  validateEmail();
});


const formButton = document.getElementById('order');
console.log(formButton);

formButton.addEventListener('click', event => {
  event.preventDefault();
  const formValues = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  }
  console.log(formValues);

  // localStorage.setItem('formValues', JSON.stringify(formValues));

  // put the form values in an object
  // put the values of the form and the selected products in an object to send to the server

  const send = {
    productLocalStorage,
    formValues
  }
  console.log(send);

  // Form values are strings, we have to convert string to an oject by using JSON.parse()

  /* const dataLocalStorage = localStorage.getItem('formValues');
  console.log(dataLocalStorage);

  const dataLocalStorageObject = JSON.parse(dataLocalStorage);
  console.log(dataLocalStorageObject); */

  localStorage.setItem('formValues', JSON.stringify(formValues));

  if (firstName.value.length == 0 ||
    lastName.value.length == 0 ||
    address.value.length == 0 ||
    city.value.length == 0 ||
    email.value.length == 0) {
    alert("⚠️ Please fill the form!");

  } else if (regExEmail.test(email.value) == false || regExAddress.test(address.value) == false || regExText.test(city.value) == false || regExText.test(firstName.value) == false || regExText.test(lastName.value) == false) {
    alert("⚠️ Please provide valid values on the form!");

  }
  else if (productLocalStorage == null || productLocalStorage == 0) {
    alert('⚠️ Please choose a product!')
  }
  else {
    // getting values from the form to put them in the local storage

    // Puttting the object "formValues" in the local storage
    // This is an object, we have to send the values to the local storage as a string, so we must to convert object to a string by using JSON.stringfy()

    // put the contents of the local storage in the form field

    let products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].productId);
    }
    console.log(products);

    const userInfo = {
      contact: {
        firstName,
        lastName,
        address,
        city,
        email,
      },
      products,
    }
    console.log(userInfo);

    fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((info) => {
        console.log(info);
        localStorage.clear();
        localStorage.setItem("orderId", info.orderId);

        // 💧💧💧💧💧💧💧 ask to mentor 
        localStorage.setItem('formValues', JSON.stringify(formValues));

        // document.location.href = "confirmation.html";

        location.href = `confirmation.html?id=${info.orderId}`
      })
      .catch((error) => {
        alert("⚠️ Post error!");
      });
  }
});





