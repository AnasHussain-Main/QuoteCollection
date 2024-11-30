// Array to store quotes
let quotes = [];
let editIndex = null; // Track quote index and set to null when adding a new quote
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

//Function for lagin and registration page
function showRegister() {
    document.getElementById('loginSection').style.display ='none';
    document.getElementById('registerSection').style.display ='block';
    document.getElementById('mainContent').style.display ='none';
}

function showLogin() {
    document.getElementById('loginSection').style.display ='none';
    document.getElementById('registerSection').style.display ='block';
    document.getElementById('mainContent').style.display ='none';
}

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
        alert('Registration successfull! Please Login.');
        showLogin();
    }else{
        alert('Please fill in all the Fiels.');
    }
}

function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        // Save the user's information in local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        quotes = user.quotes;
        document.getElementById('loginSection').style.display ='none';
        document.getElementById('mainContent').style.display ='block';
        displayQuotes();
        // Update navigation to show Logout
        updateNavigationBar();
    }else {
        alert('Invalid username or password');
    }
}

// Function to display all quotes in the table
function displayQuotes() {
    const quoteList = document.getElementById('quoteList'); // Select by ID
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

// Function to add a new quote
function addQuote() {
    const text = document.getElementById('quoteText').value.trim();
    const author = document.getElementById('quoteAuthor').value.trim();

    if (text && author) {
        if (editIndex == null){
            quotes.push({text, author}); // Add new quote to array
        } else {
            quotes[editIndex] = {text, author}; // Update quote
            editIndex = null; // Reset index
        }
        // updates users qoutes in storage
        currentUser.quotes = quotes;
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringfy(users));
        
        displayQuotes(); // Update display

        // Clear input fields
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteAuthor').value = '';
    } else {
        alert('Please enter both a quote and an author.');
    }
}

// Function to edit a quote
function editQuote(index) {
    // Input fields are set to the selected quote's information
    document.getElementById('quoteText').value = quotes[index].text;
    document.getElementById('quoteAuthor').value = quotes[index].author;
    editIndex = index; // Store index of quote being edited
}

// Function to delete a quote
function deleteQuote(index) {
    quotes.splice(index, 1); // Delete quote from array at the specified index
    displayQuotes(); // Update display
}

// Event Listener for "Add Quote" button
document.getElementById('addQuoteBtn').onclick = addQuote;

// Initial display of quotes (if any)
displayQuotes();

document.getElementById('showRegisterBtn').onclick = showRegister;
document.getElementById('showLoginBtn').onclick = showLogin;
document.getElementById('registerBtn').onclick = register;
document.getElementById('loginBtn').onclick = login;
