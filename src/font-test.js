const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const { nytMastheadAsciiArt } = require('./text-logo');

/**
 * Run a font size test with the specified size
 * @param {Number} size - Font size (1-5)
 * @param {readline.Interface} rl - Readline interface for prompting
 * @returns {Promise} - Resolves when test is complete
 */
function runFontSizeTest(size, rl) {
  return new Promise((resolve, reject) => {
    // Convert size to CPI value
    const cpi = getCPI(size);
    
    // Create test content
    let content = '';
    
    // Function to add blank lines between each line of text
    const addBlankLines = (text) => {
      return text.split('\n').join('\n\n');
    };
    
    // Header with test info
    content += '\n\n';
    content += `FONT SIZE TEST - SIZE ${size} (CPI=${cpi})\n\n`;
    content += '================================\n\n\n\n';
    
    // NYT ASCII Art Masthead
    content += addBlankLines(nytMastheadAsciiArt);
    content += '\n\n';
    
    // Sample headline
    content += 'POLITICS\n\n\n\n';
    content += 'Major Headline: This Is How Headlines Will Look\n\n\n\n';
    
    // Sample article text
    content += 'This is sample article text to test\n\n';
    content += 'the readability of different font\n\n';
    content += 'sizes on the Star TSP100 thermal\n\n';
    content += 'printer.\n\n\n\n';
    content += 'Please check if this text is clear\n\n';
    content += 'and legible with the added line\n\n';
    content += 'height between paragraphs.\n\n\n\n';
    
    // Sample byline
    content += 'By JOHN SMITH\n\n\n\n';
    
    // URL
    content += 'Read more: https://example.com/article\n\n';
    
    // Separator
    content += '----------------------------------------\n\n';
    
    // Footer
    content += 'Printed by billboi-print\n';
    content += `Test completed: ${new Date().toLocaleTimeString()}\n\n\n`;
    
    // Write to temp file
    const tempFile = path.join(os.tmpdir(), 'font-test.txt');
    fs.writeFileSync(tempFile, content);
    
    // Print with specified font size
    console.log(`🖨️ Printing test with font size ${size} (CPI=${cpi})...`);
    exec(`lp -d Star_TSP100 -o cpi=${cpi} ${tempFile}`, (error, stdout, stderr) => {
      // Clean up temp file
      fs.unlinkSync(tempFile);
      
      if (error) {
        console.error('❌ Error printing:', stderr);
        reject(new Error(`Printing failed: ${error.message}`));
        return;
      }
      
      console.log('✅ Font test printed successfully!');
      resolve();
    });
  });
}

/**
 * Convert size level to characters per inch (CPI)
 * @param {Number} size - Size level (1-5)
 * @returns {Number} - CPI value
 */
function getCPI(size) {
  // Map size levels to CPI values (lower CPI = larger text)
  const cpiMap = {
    1: 12, // Small
    2: 10, // Medium-small
    3: 8,  // Medium
    4: 6,  // Large
    5: 5   // Extra large (default for main app)
  };
  
  return cpiMap[size] || 5; // Default to extra large if invalid
}

/**
 * Start the font size test interactive process
 * @param {readline.Interface} rl - Readline interface for prompting
 */
async function startFontTest(rl) {
  console.log('\n📏 Font Size Test');
  console.log('=================');
  console.log('This tool will help you test different font sizes');
  console.log('Size 1 = Small (12 CPI), Size 5 = Extra Large (5 CPI)');
  console.log('The main app now uses Size 5 (5 CPI) by default');
  
  // Ask for font size
  const askForSize = () => {
    return new Promise((resolve) => {
      rl.question('\nEnter font size to test (1-5) or "q" to return to main menu: ', (answer) => {
        if (answer.toLowerCase() === 'q') {
          console.log('Returning to main menu...');
          resolve(null);
          return;
        }
        
        const size = parseInt(answer);
        if (isNaN(size) || size < 1 || size > 5) {
          console.log('Please enter a valid size between 1 and 5');
          resolve(askForSize());
          return;
        }
        
        resolve(size);
      });
    });
  };
  
  // Main test loop
  let size;
  while ((size = await askForSize()) !== null) {
    try {
      await runFontSizeTest(size, rl);
    } catch (error) {
      console.error('❌ Test failed:', error.message);
    }
  }
}

module.exports = {
  startFontTest
};
