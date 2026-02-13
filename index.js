async function fetchGoogleSheetData() {
  const url = `https://docs.google.com/spreadsheets/d/1Zl8GQiawIi8IIIpnwfOiGXmCjGpRiYvKGEesk8gPMUA/export?format=csv&gid=990357379#gid=990357379`;
  try {
    console.log('Fetching from:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - Make sure the Sheet is publicly shared`);
    }
    const csvText = await response.text();
    
    // Parse CSV to JSON using PapaParse
    const parsed = Papa.parse(csvText, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true
    });
    
    // Filter out rows where all fields are empty
    const dataRows = parsed.data.filter(obj => 
      Object.values(obj).some(val => val && val.trim() !== '')
    );
    
    console.log('Sheet data loaded:', dataRows);
    return dataRows;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    return [];
  }
}

async function initApp() {
  console.log('Initializing app...');
  await fetchGoogleSheetData();
}

document.addEventListener('DOMContentLoaded', initApp);