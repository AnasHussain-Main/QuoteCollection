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
    // Save changes when new text and author is entered
    const text = prompt("Edit quote text:', quote.text"); 
    const author = prompt("Edit author name", quote.author); // Show current author
   
    // Checks if inputs are filled out 
    if (text && author) {
        quotes[index] = { text: text, author: author }; // Update quote
        displayQuotes(); // Update display
    }
    else {
        alert("Edit both text and author section to make changes to the quote"); // Tells the user to enter both text and author to edit the quote
    }
}

// Function to delete a quote
function deleteQuote() {
        quotes.splice(index, 1); // Delete quote from array of a specific index
        displayQuotes(); // Update display
}

//Event Listener for "Add Quote" button
document.getElementById('addQuoteBtn').onclick = addQuote;

//Inital dsisplay of Quotes (if any) 
displayQuotes();



