// cart.js

document.addEventListener('DOMContentLoaded', function() {
    // פונקציה לקבלת פרמטרים מה-URL
    function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        productId: params.get('product_id')
      };
    }
  
    const { productId } = getQueryParams();
  
    if (productId) {
      // נתוני מוצר לדוגמה
      const products = [
        {
          id: '1',
          title: 'שם המוצר 1',
          price: '₪30.00',
          description: 'תיאור מוצר 1',
          image: 'https://i.ibb.co/rxV6VdB/Pngtree-three-dimensional-element-of-essence-dropper-5318087.png'
        },
        {
          id: '2',
          title: 'שם המוצר 2',
          price: '₪40.00',
          description: 'תיאור מוצר 2',
          image: 'https://i.ibb.co/rxV6VdB/Pngtree-three-dimensional-element-of-essence-dropper-5318087.png'
        },
        // הוסף כאן פרטי מוצרים נוספים לפי הצורך
      ];
  
      // חפש את המוצר לפי מזהה
      const product = products.find(p => p.id === productId);
  
      if (product) {
        // הצג את פרטי המוצר בעמוד ה-Cart
        const section = document.querySelector('.section');
        section.innerHTML = `
          <div class="product-detail">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button class="buy-button">Buy</button>
          </div>
        `;
      }
    }
  });
  
