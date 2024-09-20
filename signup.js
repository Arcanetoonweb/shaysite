document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // למנוע את שליחת הטופס

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = ''; // לנקות הודעות שגיאה

    // לבדוק אם הסיסמאות תואמות
    if (password !== confirmPassword) {
        errorMessage.textContent = 'הסיסמאות אינן תואמות.';
        return;
    }

    // שמירת פרטי המשתמש ב-LocalStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    // הודעה שההרשמה הצליחה
    alert('נרשמת בהצלחה! כעת תוכל להתחבר.');

    // מעבר לעמוד ההתחברות
    window.location.href = 'signin.html';

    // לנקות את השדות לאחר ההצלחה
    document.getElementById('signup-form').reset();
});
