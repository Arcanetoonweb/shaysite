document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.querySelector('.item a[href="#cart"]');
  const notificationBadge = cartIcon.querySelector(".notification-badge");

  // נניח שהמשתמש לוחץ על כפתור שמוסיף פריטים לסל
  const addToCartButton = document.querySelector("#add-to-cart-button"); // נניח שזה הכפתור להוספה לסל
  let itemCount = 0; // מספר הפריטים בעגלה

  // פונקציה להוספת פריטים לסל
  function addItemToCart() {
    itemCount += 1;
    notificationBadge.textContent = itemCount; // עדכון המספר בהתראה

    // הוספת קלאס 'show' כדי להפעיל את האנימציה
    notificationBadge.classList.add("show");
  }

  // האזנה לאירוע לחיצה על כפתור הוספה לסל
  addToCartButton.addEventListener("click", function () {
    addItemToCart();
  });

  // אפשר להוסיף גם פונקציה להסרת קלאס אחרי זמן קצר כדי לגרום לאנימציה להופיע מחדש
  setTimeout(() => {
    notificationBadge.classList.remove("show");
  }, 1000); // לדוגמה, הסרת הקלאס לאחר שניה
});
