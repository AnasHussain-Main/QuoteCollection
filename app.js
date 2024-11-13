// Array to store quotes
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
function editQuote(index) {
    const text = prompt("Edit Quote:", quotes[index].text);
    const author = prompt("Edit Author:", quotes[index].author);

    if (text && author) {
        quotes[index] = { text, author }; // Update quote in array
        displayQuotes(); // Update display
    }
}

function editQuote(index) {
    // Save changes when new text and author is entered
    const text = document.getElementById('quoteText').value.trim();
    const author = document.getElementById('quoteAuthor').value.trim();
    // Checks if inputs are filled out 
    if (text && author) {
        quotes[index] = { text, author }; // Update quote
        displayQuotes(); // Update display
    }
}

// Function to delete a quote
function deleteQuote(index) {
    quotes.splice(index, 1); // Delete quote from array at the specified index
    displayQuotes(); // Update display
}

// Attach addQuote function to the button with ID "addQuoteBtn"
document.getElementById('addQuoteBtn').onclick = addQuote;

// Initial display of quotes (if any)

