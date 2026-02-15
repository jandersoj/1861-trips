// data-fetcher.js
// Handles fetching JSON data from Google Sheets

async function fetchGoogleSheetData() {
  const url = `https://opensheet.elk.sh/1Zl8GQiawIi8IIIpnwfOiGXmCjGpRiYvKGEesk8gPMUA/Form Responses 1`;
  
  try {
    console.log('Fetching from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - Make sure the Sheet is publicly shared`);
    }
    
    const data = await response.json();
    
    // Filter out rows where all fields are empty
    const dataRows = data.filter(obj => 
      Object.values(obj).some(val => val && val.toString().trim() !== '')
    );
    
    console.log('Sheet data loaded:', dataRows);
    return dataRows;
    
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    return [];
  }
}

export { fetchGoogleSheetData };