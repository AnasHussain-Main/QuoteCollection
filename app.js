// Create an Array to store quotes
let quotes = [];

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
        quotes.push({ text, author }); // Add new quote to array
        displayQuotes(); // Update display

        // Clear input fields
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteAuthor').value = '';
    } else {
        alert('Please enter both a quote and an author.');
    }
}

// Function to edit a quote
function editQuote() {

// Function to delete a quote
function deleteQuote(index) {
    quotes.splice(index, 1); // Delete quote from a specified index
    displayQuotes(); // Update display
