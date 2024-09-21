// פונקציה להוספת מוצר לעגלה
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
    if (cart[productId]) {
      cart[productId].quantity += 1; // אם המוצר כבר בעגלה, הגדל את הכמות
    } else {
      cart[productId] = {
        id: productId,
        quantity: 1
      };
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // פונקציה להסרת מוצר מהעגלה
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
    if (cart[productId]) {
      delete cart[productId]; // מחק את המוצר מהעגלה
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart(); // עדכן את התצוגה
    }
  }
  
  // פונקציה להגדלת כמות המוצר
  function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
    if (cart[productId]) {
      cart[productId].quantity += 1; // הגדל את הכמות
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart(); // עדכן את התצוגה
    }
  }
  
  // פונקציה להקטנת כמות המוצר
  function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
    if (cart[productId] && cart[productId].quantity > 1) {
      cart[productId].quantity -= 1; // הקטן את הכמות
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart(); // עדכן את התצוגה
    }
  }
  
  // פונקציה להציג את המוצרים בעגלת הקניות
  function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let cartContainer = document.getElementById('cart-container'); // הצג את המוצרים בתוך הקונטיינר
  
    cartContainer.innerHTML = ''; // ניקוי התצוגה הקודמת
  
    for (let productId in cart) {
      let product = cart[productId];
      let productElement = document.createElement('div');
      productElement.className = 'product-container';
      productElement.innerHTML = `
        <img src="path/to/image.jpg" class="product-image" alt="Product Image">
        <div class="item-details">
          <h2 class="product-title">Product Name</h2>
          <p class="product-description">Product Description</p>
          <div class="quantity-container">
            <button class="quantity-button" onclick="decreaseQuantity('${productId}')">-</button>
            <span id="quantity">${product.quantity}</span> <!-- הכמות -->
            <button class="quantity-button" onclick="increaseQuantity('${productId}')">+</button>
          </div>
          <p class="product-price">$99.99</p>
          <button class="buy-button">Buy</button>
          <button class="remove-button" onclick="removeFromCart('${productId}')">Remove</button> <!-- כפתור ההסרה -->
        </div>
      `;
      cartContainer.appendChild(productElement);
    }
  }
  
  // קריאה לפונקציה לצורך הצגת המוצרים בעגלת הקניות בעת טעינת הדף
  document.addEventListener('DOMContentLoaded', displayCart);
  
  grantButton.addEventListener("click", function() {
    localStorage.setItem("consentGranted", "true");
    function gtag() { dataLayer.push(arguments); }

    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted'
    });
  });

  // Load gtag.js script.
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-N2Q967ZV';

  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(gtagScript,firstScript);
