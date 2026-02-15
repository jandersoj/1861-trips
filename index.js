

//this might not be the way to do it--consider list.includes()?
/*
if object.season.includes("season_filter"):
    return object idk
*/

// Global variables tracking the user's preferences:
let searchTerm = "";
let allData = [];

// Part 1.1a - Filter helper functions (add your own filters here)
const filterFunction1 = (item) => {
  // TODO: Implement your filter logic here
  return true;
};

// Part 1.1b - Search/match function
const doesTermMatch = (item) => {
  // TODO: Implement your search logic here
  // Example: return item.Title.toLowerCase().includes(searchTerm.toLowerCase());
  return true;
};

// Part 1.2 - Data to HTML conversion
const dataToHTML = (item) => {
  // TODO: Build your card HTML string here
  // Example:
  let cardHTML = `<section class="card">`;
  for (const [key, value] of Object.entries(item)) {
    if (value && value.toString().trim() !== '') {
      cardHTML += `
        <div class="card-field">
          <span class="card-label">${key}:</span>
          <span class="card-value">${value}</span>
        </div>
      `;
    }
  }
  cardHTML += `</section>`;
  return cardHTML;
};

// Part 2 - Main render function
const showMatchingCards = () => {
  console.log(`Search term: ${searchTerm}`);
  console.log(`Card data:`, allData);
  
  const container = document.getElementById('cards-container');
  if (!container) {
    console.error('Cards container not found in HTML');
    return;
  }
  
  container.innerHTML = "";
  
  // Filter the data based on user preferences
  let matches = allData.filter(doesTermMatch);
  // TODO: Add more filters as needed
  // matches = matches.filter(filterFunction1);
  
  if (matches.length === 0) {
    container.innerHTML = `<p class="no-data">No matching cards found.</p>`;
    return;
  }
  
  console.log(`Rendering ${matches.length} cards...`);
  
  // Render all matching cards
  matches.forEach((item) => {
    const snippet = dataToHTML(item);
    container.insertAdjacentHTML("beforeend", snippet);
  });
};

// Initialize with data and set up event listeners
function initCards(data) {
  allData = data;
  showMatchingCards();
}

// Export functions for use in main app
export { initCards, showMatchingCards };