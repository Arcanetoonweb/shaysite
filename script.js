function selectColor(element) {
    const options = document.querySelectorAll('.color-option');
    options.forEach(option => {
      option.classList.remove('selected');
    });
    element.classList.add('selected');
    localStorage.setItem('selectedColor', element.style.backgroundColor);
  }
  
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(button => {
    button.addEventListener('click', () => {
      sizeOptions.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      const selectedSize = button.getAttribute('data-size');
      localStorage.setItem('selectedSize', selectedSize);
    });
  });
  
  window.onload = function() {
    const savedColor = localStorage.getItem('selectedColor');
    const savedSize = localStorage.getItem('selectedSize');
  
    if (savedColor) {
      const colorOptions = document.querySelectorAll('.color-option');
      colorOptions.forEach(option => {
        if (option.style.backgroundColor === savedColor) {
          option.classList.add('selected');
        }
      });
    }
  
    if (savedSize) {
      const sizeButtons = document.querySelectorAll('.size-option');
      sizeButtons.forEach(button => {
        if (button.getAttribute('data-size') === savedSize) {
          button.classList.add('selected');
        }
      });
    }
  };
  
