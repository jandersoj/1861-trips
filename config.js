#!/usr/bin/env node
// Build script: reads from process.env and generates config.js
const fs = require('fs');
const path = require('path');

// Read from environment variables (set by .env locally, by GitHub Actions secrets in CI)
const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || 'YOUR_API_KEY_HERE';
const sheetId = process.env.SHEET_ID || process.env.VITE_SHEET_ID || 'YOUR_SHEET_ID_HERE';

const configContent = `// Auto-generated from environment variables
export const CONFIG = {
  API_KEY: '${apiKey.replace(/'/g, "\\'")}',
  SHEET_ID: '${sheetId.replace(/'/g, "\\'")}',
};
`;

fs.writeFileSync(path.join(__dirname, 'config.js'), configContent);
console.log('✓ config.js generated from environment variables');
