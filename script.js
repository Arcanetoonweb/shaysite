// מערך לאחסון המוצרים שנבחרו
let cart = [];

// בוחר את כל הכפתורים של 'ADD TO CART'
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

// בוחר את ההתראה של הסל
const notificationBadge = document.querySelector('.notification-badge');

// פונקציה שמעדכנת את ההתראה על הסל
function updateCartNotification() {
  if (cart.length > 0) {
    notificationBadge.textContent = cart.length; // מספר המוצרים בסל
    notificationBadge.classList.add('show'); // מציג את ההתראה
  } else {
    notificationBadge.classList.remove('show'); // מסתיר את ההתראה אם הסל ריק
  }
}

// פונקציה להוסיף אנימציה לפלאש
function flashNotification() {
  notificationBadge.classList.add('flash');
  setTimeout(() => {
    notificationBadge.classList.remove('flash');
  }, 600); // משך האנימציה (תואם ל-CSS)
}

// מאזין לאירוע לחיצה על כפתור 'ADD TO CART'
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    const product = this.closest('.product'); // המוצר שנבחר
    const productId = product.getAttribute('data-product-id'); // מזהה המוצר

    // הוספת המוצר לסל
    cart.push(productId);

    // עדכון ההתראה
    updateCartNotification();
    
    // הפעלת האנימציה
    flashNotification();
  });
});

// בעת טעינת הדף, לעדכן את המצב הנוכחי של ההתראה
updateCartNotification();
