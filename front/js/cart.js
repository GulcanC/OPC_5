
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

        // pDelete.addEventListener('click', function () {

        pDelete.addEventListener('click', () => {

          // remove 1 element at index i, if you write 2 it will delete 2 elements, fonciton flech

          productLocalStorage.splice(index, 1);

          // send the new data to the localStorage

          localStorage.setItem("product", JSON.stringify(productLocalStorage));

          console.log(productLocalStorage);

          // message after deleted item and refresh the page

          alert("⚠️ The selected product will be deleted from your cart!");

          window.location.reload();

        });

        // FUNCTION CHANGE QUANTITY
        var changeQuantity = document.querySelectorAll(".itemQuantity");

        function changeProductQuantity() {

          console.log(changeQuantity);

          for (let i = 0; i < changeQuantity.length; i++) {

            // 💧💧💧💧💧💧💧 ask to mentor neden string bunun sonucu, number olmasi gerekmez mi, string olunca da calisiyor
            console.log(typeof changeQuantity[i].value);
            console.log(typeof Number(changeQuantity[i].value));
            // changeQuantity[i].addEventListener("change", function(event) {
            // For input values use event change
            changeQuantity[i].addEventListener("change", (event) => {

              // event.preventDefault();

              event.stopPropagation();

              // 💧💧💧💧💧💧💧 yanlis sayi girdigimde alert mesagi kapatmak icin index kadar tiklamam gerekiyor

              let updatedQuantity = Number(changeQuantity[i].value);
              console.log(typeof updatedQuantity);

              if (updatedQuantity <= 0) {
                alert('⚠️ You can NOT enter 0 and negatif values!');
                // productLocalStorage[i].productQuantity = updatedQuantity;
              }
              else if (updatedQuantity > 100) {
                alert('⚠️ Please enter a number which is smaller than 100!');
                // productLocalStorage[i].productQuantity = updatedQuantity;
              }
              else if (updatedQuantity >= 1 && updatedQuantity <= 100) {
                productLocalStorage[i].productQuantity = updatedQuantity;
                localStorage.setItem('product', JSON.stringify(productLocalStorage));
                totalPrice();
              }
              window.location.reload();
            })

          }
          // 💧💧💧💧💧💧💧 ask to mentor neden undefined bunun sonucu


        }
        changeProductQuantity();

        // FUNCTION TOTAL PRICE

        function totalPrice() {
          // Determine total quantity

          let totalQuantity = 0;

          for (let i = 0; i < changeQuantity.length; ++i) {
            totalQuantity += Number(changeQuantity[i].value);
          }

          let productTotalQuantity = document.getElementById('totalQuantity');
          productTotalQuantity.innerText = totalQuantity;

          // Calculate total price
          let displayTotalPrice = 0;

          for (let i = 0; i < changeQuantity.length; ++i) {
            displayTotalPrice += Number((changeQuantity[i].value * products.price));
          }

          let showTotalPrice = document.getElementById("totalPrice");
          showTotalPrice.innerText = displayTotalPrice;
        }
        totalPrice();
      });
  });
}

// FORM
var regExText = /^[a-zA-Z\s\'\-]{3,10}$/; // use regExText for three values; firstName, lastName and city
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

function validatelastName() {

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

function validateAddress() {

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

function validateCity() {

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

function validateEmail() {

  let email = document.getElementById("email").value;

  if (regExEmail.test(email)) {
    document.getElementById("emailErrorMsg").innerText = "✅ Email address is valid!";
    return true;
  } else {
    document.getElementById("emailErrorMsg").innerText = "⚠️ Please enter a valid email address!";
    return false;
  }
}

var formSubmitButton = document.querySelector('.cart__order__form');

formSubmitButton.addEventListener('change', function () {
  validateFirstName(firstName);
  validatelastName(lastName);
  validateAddress(address);
  validateCity(city);
  validateEmail(email);
});


const formButton = document.getElementById('order');
console.log(formButton);

formButton.addEventListener('click', event => {
  event.preventDefault();

  var contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  }
  console.log(contact);
  console.log(typeof contact.firstName); // string

  // put the form values in an object
  // put the values of the form and the selected products in an object to send to the server

  // 💧💧💧💧💧💧💧 string olarak ekleyebilir miyim

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

    // 💧💧💧💧💧💧💧 neden sadece ID aliyoruz neden tum bilgiler degil

    let products = []; // see id of selected product

    productLocalStorage.forEach(productSelected => {
      products.push(productSelected.productId);

    });

    console.log(products);
    console.log(typeof products); // object

    // 💧💧💧💧💧💧💧 prducts fonksiyonu ne
    // 💧💧💧💧💧💧💧 neden bunu goremiyorum local storagda 

    let userInfo = {
      contact, // object type
      products,  // object type
    }

    localStorage.setItem('contact', JSON.stringify(contact));
    // 💧💧💧💧💧💧💧 neden products array goremiyorum local storegda

    console.log(userInfo);
    console.log(typeof userInfo);  // object
    console.log(typeof contact); // object

    // 💧💧💧💧💧💧💧  neden console goremiyorum nasil gorucem bu bilgileri

    fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (info) {

        console.log(info);

        // 💧💧💧💧💧💧💧 bunu once yazabilir miyim neden burada sadece belli isimleri kullanabiliyorum
        // 💧💧💧💧💧💧💧 string olarak ekleyebilir miyim ajax nasil calisiyor
        // localStorage.setItem('formValues', JSON.stringify(formValues));

        //  location.href = `confirmation.html?id=${info.orderId}`;

       location.href = `confirmation.html?id=${info.orderId}`;

        // location;assign neden calismiyor

        console.log(`confirmation.html?id=${info.orderId}`);

        // localStorage.clear();
      })
      .catch(function (error) {
        alert("⚠️ Post error!");

      });

  }

});

