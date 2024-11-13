// Array to store quotes
let quotes = [];
let editIndex = null; // Track quote index and set to null when adding a new quote

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



