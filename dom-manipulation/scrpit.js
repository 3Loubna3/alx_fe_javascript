// script.js

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Simulated server endpoint

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const serverQuotes = await response.json();
        return serverQuotes.map(q => ({ text: q.title, category: q.body }));
    } catch (error) {
        console.error('Fetching quotes failed:', error);
        return [];
    }
}

// Function to sync quotes with the server
async function syncWithServer() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    if (serverQuotes.length === 0) {
        console.log('No quotes available from server');
        return;
    }

    // Simple conflict resolution: server data takes precedence
    const mergedQuotes = [...serverQuotes, ...localQuotes];
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    quotes = mergedQuotes;
    saveQuotes();
    populateCategoryFilter(); // Update category filter with the merged quotes

    // Notify user
    alert('Data has been synchronized with the server.');
}

// Function to handle sync button click
function handleSyncButtonClick() {
    syncWithServer();
}

// Add event listener for sync button
document.getElementById('syncButton').addEventListener('click', handleSyncButtonClick);

// Periodically sync data with the server every 5 minutes
setInterval(syncWithServer, 300000); // 300000 milliseconds = 5 minutes

// Function to initialize the application
function initializeApp() {
    loadLastViewedQuote();
    populateCategoryFilter();
    showRandomQuote(localStorage.getItem('selectedCategory') || 'all');
}

// Initialize the application on load
window.onload = initializeApp;

// Function to export quotes to a JSON file
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

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes) && importedQuotes.every(quote => quote.text && quote.category)) {
                quotes = importedQuotes;
                saveQuotes();
                alert('Quotes imported successfully!');
                populateCategoryFilter();
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
