let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let quotes = JSON.parse(localStorage.getItem('quotes')) || {};

// Function to clear input fields
function clearInputs() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('quoteText').value = '';
    document.getElementById('quoteAuthor').value = '';
}

// Function to ensure user is authenticated before performing actions
function ensureAuthenticated() {
    if (!currentUser) {
        alert("You must log in to access this action.");
        showLogin();
        return false;
    }
    return true;
}

// Function to show the login page
function showLogin() {
    clearInputs();
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
}

// Function to show the registration page
function showRegister() {
    clearInputs();
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
}

// Function to log in a user
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainContent(username);
    } else {
        alert('Invalid username or password.');
    }
}

// Function to show the main content after login
function showMainContent(username) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('usernameDisplay').textContent = username;
    displayQuotes();
}

// Function to register a new user
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (username && password) {
        if (users.some(user => user.username === username)) {
            alert('Username already exists.');
            return;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        showLogin();
    } else {
        alert('Please fill in all fields.');
    }
}

// Function for user logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLogin();
}

// Function to update the navigation bar based on user status
function updateNavigationBar() {
    if (currentUser) {
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'block';
    } else {
        document.getElementById('loginLink').style.display = 'block';
        document.getElementById('logoutLink').style.display = 'none';
    }
}

// Function to display all quotes for the current user
function displayQuotes() {
    const quoteList = document.getElementById('quoteList');
    quoteList.innerHTML = '';

    if (quotes[currentUser.username]) {
        quotes[currentUser.username].forEach((quote, index) => {
            const li = document.createElement('li');
            li.innerHTML = `"${quote.text}" - ${quote.author} 
                            <button onclick="editQuote(${index})">Edit</button>
                            <button onclick="deleteQuote(${index})">Delete</button>`;
            quoteList.appendChild(li);
        });
    }
}

// Function to show add quote form
function showAddQuoteForm() {
    document.getElementById('quoteSection').style.display = 'none';
    document.getElementById('addQuoteForm').style.display = 'block';
}

// Function to cancel adding a quote
function cancelAddQuote() {
    document.getElementById('quoteSection').style.display = 'block';
    document.getElementById('addQuoteForm').style.display = 'none';
}

// Function to add or update a quote
function addQuote() {
    if (!ensureAuthenticated()) return;

    const quoteText = document.getElementById('quoteText').value.trim();
    const quoteAuthor = document.getElementById('quoteAuthor').value.trim();

    if (quoteText && quoteAuthor) {
        if (!quotes[currentUser.username]) {
            quotes[currentUser.username] = [];
        }

        quotes[currentUser.username].push({ text: quoteText, author: quoteAuthor });
        localStorage.setItem('quotes', JSON.stringify(quotes));

        document.getElementById('quoteText').value = '';
        document.getElementById('quoteAuthor').value = '';
        cancelAddQuote();
        displayQuotes();
    } else {
        alert('Please fill in both fields.');
    }
}

// Function to delete a specific quote
function deleteQuote(index) {
    quotes[currentUser.username].splice(index, 1);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    displayQuotes();
}

// Function to edit a quote
function editQuote(index) {
    const newQuoteText = prompt('Edit Quote Text', quotes[currentUser.username][index].text);
    const newQuoteAuthor = prompt('Edit Quote Author', quotes[currentUser.username][index].author);

    if (newQuoteText && newQuoteAuthor) {
        quotes[currentUser.username][index] = { text: newQuoteText, author: newQuoteAuthor };
        localStorage.setItem('quotes', JSON.stringify(quotes));
        displayQuotes();
    }
}

// Function to delete all quotes
function deleteAllQuotes() {
    delete quotes[currentUser.username];
    localStorage.setItem('quotes', JSON.stringify(quotes));
    displayQuotes();
}

// Event listeners for login, registration, and actions
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('registerBtn').addEventListener('click', register);
document.getElementById('showRegisterBtn').addEventListener('click', showRegister);
document.getElementById('backToLoginBtn').addEventListener('click', showLogin);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
document.getElementById('logoutLink').addEventListener('click', logout);

// Initialize the app and show the appropriate section
if (currentUser) {
    showMainContent(currentUser.username);
} else {
    showLogin();
}

