let quotes = [];
let editIndex = null; // Track quote index for editing
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Function to clear input fields
function clearInputs() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('quoteText').value = '';
    document.getElementById('quoteAuthor').value = '';
}

// Function to show the registration page
function showRegister() {
    clearInputs();
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
}

// Function to show the login page
function showLogin() {
    clearInputs();
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
            alert('Username already exists.');
            return;
        }
        users.push({ username, password, quotes: [] });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please log in.');
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

//Function to check user status and update the navigation bar
function updateNavigationBar() {
    if (currentUser) {
        // If the user is logged in, hide the login link
        document.getElementById('loginLink').style.display = 'none';
        // If the user is logged out show the logout link
        document.getElementById('logoutLink').style.display = 'block';
    } else {
        // Show login link and allow the user to login in
        document.getElementById('loginLink').style.display = 'block';
        // Hide the logout link because the user is not logged in and cannot log out
        document.getElementById('logoutLink').style.display = 'none';
    }
}

// Function for user log out
function logout() {
    // Clear logged user
    currentUser = null;
    // Remove user data from local storage
    localStorage.removeItem('currentUser');
    // Update and show login link and hide logout link
    updateNavigationBar();
    // Show main content 
    document.getElementById('mainContent').style.display = 'none';
    // Show login
    document.getElementById('loginSection').style.display = 'block';


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
        clearInputs();
    } else {
        alert('Please enter both a quote and an author.');
    }
}

// Function to edit a quote
function editQuote(index) {
    document.getElementById('quoteText').value = quotes[index].text;
    document.getElementById('quoteAuthor').value = quotes[index].author;
    editIndex = index;
}

// Function to delete a quote
function deleteQuote(index) {
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
if (currentUser) {
    quotes = currentUser.quotes;
    displayQuotes();
}
