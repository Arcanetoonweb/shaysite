document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
});

// פונקציה להצגת פריטי הסל
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // ניקוי התוכן הקודם

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>הסל שלך ריק.</p>';
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        if (item) { // בדוק אם האובייקט אינו null
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';

            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 193px; height: 193px;">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>מחיר: ₪${item.price}</p>
                    <p>כמות: <span class="quantity">${item.quantity}</span></p>
                    <button class="remove-item-button" data-name="${item.name}">הסר</button>
                </div>
            `;

            cartContainer.appendChild(itemDiv);
            totalPrice += item.price * item.quantity; // חישוב סכום כולל
        }
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2); // עדכון סכום כולל

    // הוספת פעולה לכפתורי ההסרה
    const removeButtons = document.querySelectorAll('.remove-item-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            removeItemFromCart(this.dataset.name);
        });
    });
}

// פונקציה להסרת מוצר מהסל
function removeItemFromCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.name !== productName); // סינון המוצר לה-sל

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // שמירה מחדש
    displayCartItems(); // עדכון התצוגה
}
