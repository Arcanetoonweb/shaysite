// script.js

let cartCount = 0;
let cartItems = []; // מערך לאחסון פרטי המוצרים בסל

// פונקציה להוספת מוצר לסל
function addToCart(product) {
    cartCount++;
    cartItems.push(product); // הוספת המוצר למערך
    updateCartCount();
}

// פונקציה לעדכון מספר המוצרים בסל
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

// פונקציה להציג את המוצרים בעמוד ה-Cart
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container'); // ודא שהאלמנט קיים בעמוד
    cartContainer.innerHTML = ''; // נקה את התצוגה הקודמת

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartContainer.appendChild(itemElement);
    });
}

// הוספת מאזיני אירועים לכפתורי ה-"ADD TO CART"
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            name: button.dataset.name,
            price: button.dataset.price,
            image: button.dataset.image,
            quantity: 1 // או מה שנכון
        };
        addToCart(product);
    });
});

// אם אתה רוצה להציג את המוצרים כאשר העמוד נטען
document.addEventListener('DOMContentLoaded', displayCartItems);

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += product.quantity;
  } else {
      cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
