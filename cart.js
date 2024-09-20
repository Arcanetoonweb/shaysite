document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.querySelector('.product-container');
  
    function loadCartItems() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      productContainer.innerHTML = '';
  
      cartItems.forEach(item => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
  
        productCard.innerHTML = `
          <img src="${item.image}" alt="Product Image">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p>$${item.price}</p>
          <div class="button-container">
            <button class="quantity-button" data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-button" data-action="increase">+</button>
            <button class="buy-button">Buy</button>
            <button class="remove-button" data-id="${item.id}">Remove</button>
          </div>
        `;
  
        productContainer.appendChild(productCard);
      });
  
      setupButtons();
    }
  
    function setupButtons() {
      document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          removeItemFromCart(productId);
        });
      });
  
      document.querySelectorAll('.quantity-button').forEach(button => {
        button.addEventListener('click', function() {
          const action = this.getAttribute('data-action');
          const productCard = this.closest('.product-card');
          const quantitySpan = productCard.querySelector('span');
          let quantity = parseInt(quantitySpan.textContent);
  
          if (action === 'increase') {
            quantity += 1;
          } else if (action === 'decrease' && quantity > 1) {
            quantity -= 1;
          }
  
          quantitySpan.textContent = quantity;
          updateCartItemQuantity(productCard.querySelector('.remove-button').getAttribute('data-id'), quantity);
        });
      });
    }
  
    function removeItemFromCart(id) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems = cartItems.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      loadCartItems(); // רענן את העמוד
    }
  
    function updateCartItemQuantity(id, quantity) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems = cartItems.map(item => {
        if (item.id === id) {
          item.quantity = quantity;
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
    loadCartItems();
  });
  
