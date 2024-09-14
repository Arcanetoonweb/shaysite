document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const emailIcon = document.querySelector('.email-icon');
    const phoneIcon = document.querySelector('.phone-icon');
    const scrollLine = document.querySelector('.scrollLine');
    
    // Email and phone click events
    emailIcon.addEventListener('click', function() {
        window.location.href = 'mailto:lmwptnh@gmail.com';
    });

    phoneIcon.addEventListener('click', function() {
        window.location.href = 'tel:+1234567890'; // Replace with your phone number
    });

    // Scroll progress bar
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        scrollLine.style.width = scrollPercent + '%';
    });
});
