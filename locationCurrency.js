// Replace 'your_token' with your actual token from ipinfo.io
const token = "be3be51cf0d39d";

// Define exchange rate (1 ₪ = 3.70 $)
const exchangeRate = 3.7; // Use this for converting from $ to ₪

const originalPriceInShekels = 77; // מחיר בשקלים
const priceInDollars = (originalPriceInShekels / exchangeRate).toFixed(2); // המרה לדולרים
console.log(`המחיר בדולרים: $ ${priceInDollars}`); // הצגת התוצאה

// Supplier prices for different images
const supplierPrices = [19.01, 19.09, 19.09, 19.05];

// Function to fetch the user's IP address and location
function fetchUserLocation() {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const userIp = data.ip;
      return fetch(`https://ipinfo.io/${userIp}?token=${token}`);
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching location data:", error);
      return { country: "US" }; // Default to US if there's an error
    });
}

// Function to update currency symbol and price for all products
function updateCurrency(country) {
  const currencySymbol = country === "IL" ? "₪" : "$"; // Determine the currency symbol
  updatePriceElements(currencySymbol, country);
}

// Function to update price elements for all products
function updatePriceElements(currencySymbol, country) {
  const priceElements = document.querySelectorAll(".product-price"); // Select all price elements

  priceElements.forEach((priceElement) => {
    const currencyIcon = priceElement.querySelector(".currency-icon"); // Select the currency icon inside each price element
    let originalPriceInShekels = parseFloat(
      priceElement.getAttribute("data-original-price")
    ); // Get the original price in shekels from the attribute

    if (!originalPriceInShekels) {
      // If the original price is not set yet, store it
      originalPriceInShekels = parseFloat(
        priceElement.textContent.replace(/[₪$]/g, "").trim()
      );
      priceElement.setAttribute("data-original-price", originalPriceInShekels); // Save the original price
    }

    // Convert the price based on the selected currency
    if (currencySymbol === "$") {
      const priceInDollars = (originalPriceInShekels * exchangeRate).toFixed(2);
      priceElement.textContent = `${currencySymbol} ${priceInDollars}`;
    } else {
      priceElement.textContent = `${currencySymbol} ${originalPriceInShekels.toFixed(
        2
      )}`;
    }

    currencyIcon.textContent = currencySymbol; // Update the currency symbol
  });
}

// Function to update product language for all products
function updateProductLanguage(country) {
  const language = country === "IL" ? "he" : "en"; // Hebrew for Israel, English for others
  const products = document.querySelectorAll(".product"); // Select all product elements

  products.forEach((product) => {
    const titleElement = product.querySelector(".product-title");
    const descriptionElement = product.querySelector(".product-description");

    // Update the product title and description based on the selected language
    titleElement.textContent = titleElement.getAttribute(
      `data-title-${language}`
    );
    descriptionElement.textContent = descriptionElement.getAttribute(
      `data-description-${language}`
    );
  });
}

// Function to change the product image and price
function changeProductImage(imageUrl, supplierPrice) {
  const productImage = document.querySelector(".product-image");
  productImage.src = imageUrl; // Change the product image

  // Update the price based on the supplier's price
  const priceElement = document.querySelector(".product-price");
  const profit = 30.99; // Desired profit
  const sellingPrice = (supplierPrice + profit).toFixed(2);
  priceElement.textContent = `₪ ${sellingPrice}`; // Update the displayed price

  // Add conversion to dollars
  const originalPriceInShekels = 77; // מחיר בשקלים
  const exchangeRate = 3.7; // שער המרה
  const priceInDollars = (originalPriceInShekels / exchangeRate).toFixed(2); // המרה לדולרים
  console.log(`המחיר בדולרים: $ ${priceInDollars}`); // הצגת התוצאה
}

// Function to update currency and language together
function updateCurrencyAndLanguage(country) {
  updateCurrency(country); // Update the currency for all products
  updateProductLanguage(country); // Update the product language for all products
}

// Initialize the function to fetch the location and update the currency and language
fetchUserLocation().then((data) => {
  updateCurrencyAndLanguage(data.country); // Update currency and language based on the user's location
});

// Event listener for the country select change
document
  .getElementById("country-select")
  .addEventListener("change", (event) => {
    const selectedCountry = event.target.value; // Get the selected country
    updateCurrencyAndLanguage(selectedCountry); // Update both currency and language based on the selected country

    const selectedOption = event.target.options[event.target.selectedIndex];
    const flagImage = selectedOption.getAttribute("data-icon"); // Get the flag icon
    event.target.style.backgroundImage = `url('${flagImage}')`; // Update the background image with the flag
  });

// Event listeners for thumbnail images
const thumbnails = document.querySelectorAll(".thumbnail"); // Assuming you have thumbnail elements

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    const imageUrl = thumbnail.getAttribute("data-image"); // Image URL from the thumbnail
    changeProductImage(imageUrl, supplierPrices[index]); // Change image and price
  });
});

// Function to update the language
function updateLanguage(language) {
  const productTitles = document.querySelectorAll(".product-title");
  const productDescriptions = document.querySelectorAll(".product-description");

  productTitles.forEach((title) => {
    const titleHe = title.getAttribute("data-title-he");
    const titleEn = title.getAttribute("data-title-en");
    title.textContent = language === "he" ? titleHe : titleEn;
  });

  productDescriptions.forEach((description) => {
    const descriptionHe = description.getAttribute("data-description-he");
    const descriptionEn = description.getAttribute("data-description-en");
    description.textContent = language === "he" ? descriptionHe : descriptionEn;
  });
}

// Example function to change language
function changeLanguage(language) {
  updateLanguage(language);
  // Here you can add other updates related to currency
}

// Example call (changing language to Hebrew)
changeLanguage("he"); // or 'en' for English

let cartCount = 0; // סופר מוצרים בסל
const cart = []; // מערך שיאחסן את המוצרים בסל

// פונקציה להוסיף מוצר לסל
function addToCart(product) {
  cart.push(product); // הוספת המוצר לסל
  cartCount++; // עדכון ספירת המוצרים
  updateCartCount(); // עדכון התצוגה של הסל
}

// פונקציה לעדכון תצוגת הסל
function updateCartCount() {
  const notificationBadge = document.querySelector(".notification-badge");
  notificationBadge.textContent = cartCount; // לעדכן את הטקסט של הבאג'
  if (cartCount > 0) {
    notificationBadge.classList.add("visible"); // להוסיף את הקלאס כדי להציג
  } else {
    notificationBadge.classList.remove("visible"); // להסיר את הקלאס כדי להסתיר
  }
}

// הוספת אירוע קליק לכפתור "ADD TO CART"
document
  .querySelector(".add-to-cart-button")
  .addEventListener("click", function () {
    const product = {
      title: document.querySelector(".product-title").textContent,
      price: document.querySelector("#price").textContent,
      image: document.querySelector("#main-image").src
    };
    addToCart(product); // הוספת המוצר לסל
  });





  function openCart() {
    document.getElementById("cart-sidebar").classList.add("open");
}

function closeCart() {
    document.getElementById("cart-sidebar").classList.remove("open");
}


