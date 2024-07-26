// script.js

// Load quotes from local storage if available, else initialize with default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "In the end, we only regret the chances we didn’t take.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to show a random quote
function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update the DOM with the selected quote and its category
    document.getElementById('quoteText').innerText = `"${randomQuote.text}"`;
    document.getElementById('categoryText').innerText = randomQuote.category;

    // Save the last viewed quote in session storage (optional)
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote to the array and update the display
function addQuote() {
    // Get quote text and category from input fields
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Validate input fields
    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Add new quote to the quotes array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Save updated quotes array to local storage
    saveQuotes();

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally show the newly added quote
    const newQuote = quotes[quotes.length - 1];
    document.getElementById('quoteText').innerText = `"${newQuote.text}"`;
    document.getElementById('categoryText').innerText = newQuote.category;
}

// Function to load the last viewed quote from session storage
function loadLastViewedQuote() {
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        document.getElementById('quoteText').innerText = `"${lastViewedQuote.text}"`;
        document.getElementById('categoryText').innerText = lastViewedQuote.category;
    }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2); // Format quotes as a JSON string
    const blob = new Blob([dataStr], { type: 'application/json' }); // Create a Blob with the JSON data
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    // Create a temporary anchor element for download
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = 'quotes.json';
    downloadAnchor.click();

    // Clean up
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes) && importedQuotes.every(quote => quote.text && quote.category)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
                showRandomQuote(); // Optionally show a random quote from the imported quotes
            } else {
                alert('Invalid JSON format. Please upload a valid quotes JSON file.');
            }
        } catch (error) {
            alert('Error reading file. Please ensure it is a valid JSON file.');
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// Initialize with a random quote on page load
window.onload = function() {
    loadLastViewedQuote() || showRandomQuote();
};
