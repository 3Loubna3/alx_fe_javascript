// script.js

// Array to store quotes, each quote is an object with text and category properties
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "In the end, we only regret the chances we didn’t take.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
];

// Function to show a random quote
function showRandomQuote() {
    // Get random index from quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update DOM with new quote and category
    document.getElementById('quoteText').innerText = `"${randomQuote.text}"`;
    document.getElementById('categoryText').innerText = randomQuote.category;
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote to the array and update the display
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Validate input fields
    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Add new quote to the quotes array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally show the newly added quote
    const newQuote = quotes[quotes.length - 1];
    document.getElementById('quoteText').innerText = `"${newQuote.text}"`;
    document.getElementById('categoryText').innerText = newQuote.category;
}

// Initialize with a random quote on page load
showRandomQuote();
