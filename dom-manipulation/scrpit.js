// script.js

// Load quotes from local storage if available, else initialize with default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "In the end, we only regret the chances we didn’t take.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
];

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote, filtered by category if applicable
function showRandomQuote(category = "all") {
    const filteredQuotes = category === "all" ? quotes : quotes.filter(q => q.category === category);
    
    if (filteredQuotes.length === 0) {
        alert("No quotes available for the selected category.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    document.getElementById('quoteText').innerText = `"${randomQuote.text}"`;
    document.getElementById('categoryText').innerText = randomQuote.category;

    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', () => {
    const selectedCategory = document.getElementById('categoryFilter').value;
    showRandomQuote(selectedCategory);
});

// Add a new quote and update the category list
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    populateCategoryFilter(); // Update categories if a new one was added
}

// Load last viewed quote from session storage
function loadLastViewedQuote() {
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        document.getElementById('quoteText').innerText = `"${lastViewedQuote.text}"`;
        document.getElementById('categoryText').innerText = lastViewedQuote.category;
    }
}

// Export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = 'quotes.json';
    downloadAnchor.click();

    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes) && importedQuotes.every(quote => quote.text && quote.category)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
                populateCategoryFilter(); // Update categories after import
                showRandomQuote();
            } else {
                alert('Invalid JSON format. Please upload a valid quotes JSON file.');
            }
        } catch (error) {
            alert('Error reading file. Please ensure it is a valid JSON file.');
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// Populate category dropdown with unique categories
function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = Array.from(new Set(quotes.map(quote => quote.category)));
    categories.sort();

    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        categoryFilter.appendChild(option);
    });

    // Set last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
    showRandomQuote
