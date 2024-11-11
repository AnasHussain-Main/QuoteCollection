// Start with array to store quotes
let quotes = [];

// The first function will display all quotes in the table
function displayQuotes () {
    const quoteList = document.getElementById('quoteList');
    quoteList.innerHTML = ''; //This would clear entries 

    quotes.forEach((quote, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${quote.text}</td>
            <td>${quote.author}
            <td>
                <button onclick="editQuote(${index})">Edit</button>
                <button onclick="deleteQuote(${index})">Delete</button>
            `;
            quoteList.appendChild(row);
    });
}