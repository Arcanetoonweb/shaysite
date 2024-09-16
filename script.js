function searchProducts() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const productList = document.getElementById("product-list");
  const resultsContainer = document.getElementById("search-results");

  // ניקוי התוצאות הקודמות
  resultsContainer.innerHTML = "";

  if (input.length === 0) {
    resultsContainer.style.display = "none"; // אם אין קלט, מסתיר את התוצאות
    return;
  }

  const products = productList.getElementsByClassName("product-item");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.textContent.toLowerCase().includes(input)) {
      resultsContainer.style.display = "block"; // מראה את התוצאות אם יש תוצאה תואמת
      const result = document.createElement("div");
      result.className = "product-item";
      result.textContent = product.textContent;
      resultsContainer.appendChild(result);
    }
  }

  if (resultsContainer.children.length === 0) {
    resultsContainer.style.display = "none"; // אם אין תוצאות, מסתיר את התוצאות
  }
}
