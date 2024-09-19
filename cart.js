// פונקציה להוסיף מוצר לסל הקניות
function addToCart(productId) {
    // קבלת סל הקניות מה-localStorage או יצירת אובייקט חדש אם אין כזה
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // בדיקה אם המוצר כבר קיים בסל והוספתו אם לא
    if (!cart.includes(productId)) {
      cart.push(productId);
    }
  
    // שמירת הסל המעודכן ב-localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // פונקציה להציג את המוצרים בסל בעמוד
  function displayCartItems() {
    // קבלת המוצרים מה-localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // בחר את אלמנט התצוגה של הסל בעמוד
    const cartContainer = document.getElementById('cart-items-container');
  
    // ניקוי התצוגה הקודמת
    cartContainer.innerHTML = '';
  
    // הצגת כל מוצר בסל
    cart.forEach(productId => {
      // יצירת אלמנט מוצר חדש
      const productElement = document.createElement('div');
      productElement.className = 'cart-item';
  
      // הצגת פרטי המוצר
      productElement.innerHTML = `
        <div class="product-image">
          <img src="https://via.placeholder.com/100" alt="מוצר ${productId}">
        </div>
        <div class="product-details">
          <h2 class="product-title">שם המוצר ${productId}</h2>
          <p class="product-price">₪${(30 + parseInt(productId) * 10).toFixed(2)}</p>
          <button class="remove-from-cart-button" data-product-id="${productId}">Remove</button>
        </div>
      `;
  
      // הוספת המוצר לתצוגה
      cartContainer.appendChild(productElement);
    });
  
    // הצגת סכום כולל
    displayCartTotal();
  }
  
  // פונקציה להסרת מוצר מהסל
  function removeFromCart(productId) {
    // קבלת סל הקניות מה-localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // הסרת המוצר מהסל
    cart = cart.filter(id => id !== productId);
  
    // שמירת הסל המעודכן ב-localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // עדכון התצוגה של הסל
    displayCartItems();
  }
  
  // פונקציה להציג את הסכום הכולל
  function displayCartTotal() {
    // קבלת המוצרים מה-localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // חישוב הסכום הכולל
    const total = cart.reduce((acc, productId) => acc + (30 + parseInt(productId) * 10), 0);
  
    // הצגת הסכום הכולל בעמוד
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: ₪${total.toFixed(2)}`;
  }
  
  // הוספת מאזינים לאירועים בעמוד הסל
  document.addEventListener('DOMContentLoaded', () => {
    // הצגת פרטי הסל כשעמוד הסל נטען
    displayCartItems();
  
    // מאזין להסרת מוצר מהסל
    document.querySelectorAll('.remove-from-cart-button').forEach(button => {
      button.addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        removeFromCart(productId);
      });
    });
  });
  
