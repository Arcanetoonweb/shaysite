document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // למנוע את שליחת הטופס

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // קבלת האימייל והסיסמה מ-LocalStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    errorMessage.textContent = ''; // לנקות הודעות שגיאה

    // בדיקת אימייל וסיסמה
    if (email === storedEmail && password === storedPassword) {
        // שמירת סטטוס התחברות ב-LocalStorage
        localStorage.setItem('isLoggedIn', 'true');

        // ניווט לעמוד הבית
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Incorrect email or password.';
    }
});
