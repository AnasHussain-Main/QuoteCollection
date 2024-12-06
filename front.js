async function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful!');
            currentUser = result.user;
            displayQuotes();
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (err) {
        console.error('Error logging in:', err);
    }
}

async function addQuote() {
    const text = document.getElementById('quoteText').value.trim();
    const author = document.getElementById('quoteAuthor').value.trim();

    if (!currentUser) {
        alert("You must be logged in!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id, text, author }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Quote added!');
            displayQuotes();
        } else {
            alert(result.message || 'Failed to add quote.');
        }
    } catch (err) {
        console.error('Error adding quote:', err);
    }
}
