document.getElementById('increase-quantity').addEventListener('click', function() {
    var quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });
  
  document.getElementById('decrease-quantity').addEventListener('click', function() {
    var quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });
  
