// Array to store quotes
let quotes = [];
let editIndex = null; // Track quote index for editing
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Function to ensure a user is authenticated before performing protected actions
function ensureAuthenticated() {
    if (!currentUser) {
        alert("You must log in to access this action.");
        showLogin();
        return false;
    }
    return true;
}

// Function to show the registration page
function showRegister() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
}

// Function to show the login page
function showLogin() {
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
}

// Function to register a new user
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (username && password) {
        if (users.some(user => user.username === username)) {
            alert('Username already exists');
            return;
        }
        users.push({ username, password, quotes: [] });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        showLogin();
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to log in
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        quotes = user.quotes;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        displayQuotes();
    } else {
        alert('Invalid username or password.');
    }
}

// Function to display all quotes
function displayQuotes() {
    const quoteList = document.getElementById('quoteList');
    quoteList.innerHTML = ''; // Clear previous entries

    quotes.forEach((quote, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${quote.text}</td>
            <td>${quote.author}</td>
            <td>
                <button onclick="editQuote(${index})">Edit</button>
                <button onclick="deleteQuote(${index})">Delete</button>
            </td>
        `;
        quoteList.appendChild(row);
    });
}

// Function to add or update a quote
function addQuote() {
    if (!ensureAuthenticated()) return;

    const text = document.getElementById('quoteText').value.trim();
    const author = document.getElementById('quoteAuthor').value.trim();

    if (text && author) {
        if (editIndex === null) {
            quotes.push({ text, author });
        } else {
            quotes[editIndex] = { text, author };
            editIndex = null;
        }
        currentUser.quotes = quotes;
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        displayQuotes();
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteAuthor').value = '';
    } else {
        alert('Please enter both a quote and an author.');
    }
}

// Function to edit a quote
function editQuote(index) {
    if (!ensureAuthenticated()) return;

    document.getElementById('quoteText').value = quotes[index].text;
    document.getElementById('quoteAuthor').value = quotes[index].author;
    editIndex = index;
}

// Function to delete a quote
function deleteQuote(index) {
    if (!ensureAuthenticated()) return;

    quotes.splice(index, 1);
    currentUser.quotes = quotes;
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    displayQuotes();
}

// Event listeners
document.getElementById('addQuoteBtn').onclick = addQuote;
document.getElementById('showRegisterBtn').onclick = showRegister;
document.getElementById('showLoginBtn').onclick = showLogin;
document.getElementById('registerBtn').onclick = register;
document.getElementById('loginBtn').onclick = login;

// Display quotes for logged-in user on initial load
if (currentUser) displayQuotes();


