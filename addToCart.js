// פונקציה להוספת מוצר לסל
function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // בדוק אם המוצר כבר קיים בסל
    const existingItem = cartItems.find(item => item.name === product.name);
    
    if (existingItem) {
        // אם המוצר כבר קיים, הגדל את הכמות
        existingItem.quantity += 1;
    } else {
        // אם המוצר לא קיים, הוסף אותו לסל
        product.quantity = 1; // הגדרת כמות ראשונית
        cartItems.push(product);
    }

    // שמור את סל הקניות המעודכן ב-localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // עדכן את מספר הפריטים באייקון
    updateCartIcon();
}

// עדכון מספר הפריטים באייקון סל הקניות
function updateCartIcon() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const notificationBadge = document.querySelector('.notification-badge');

    // עדכן את הטקסט של העיגול
    notificationBadge.textContent = totalItems > 0 ? totalItems : '';

    // הצג את העיגול רק אם יש פריטים
    if (totalItems > 0) {
        notificationBadge.classList.add('show');
    } else {
        notificationBadge.classList.remove('show');
    }
}

// פונקציה שאוספת מידע מהמוצר ומפעילה את addToCart
function handleAddToCartClick(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.querySelector('.product-title').innerText;
    const productPrice = parseFloat(productElement.querySelector('.product-price').innerText.replace('₪', ''));
    const productImage = productElement.querySelector('.product-image').src;

    const product = {
        name: productName,
        price: productPrice,
        image: productImage
    };

    addToCart(product);
}

// חיבור הכפתורים לפונקציה
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', handleAddToCartClick);
});

// עדכון מספר הפריטים בעת טעינת העמוד
updateCartIcon();
