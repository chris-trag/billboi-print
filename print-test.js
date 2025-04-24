#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Print test pattern with specified font size
 * @param {Number} size - Font size (1-5)
 */
function printTestPattern(size) {
  // Create test content with different font sizes
  let content = '';
  
  // Header
  content += '\n';
  content += 'PRINTER TEST - FONT SIZE ' + size + '\n';
  content += '========================\n\n';
  
  // Test content
  content += 'THE NEW YORK TIMES\n\n';
  
  // Sample headline
  content += 'Major Headline For Testing\n\n';
  
  // Sample article text
  content += 'This is sample article text to test the readability of different font sizes on the Star TSP100 thermal printer. Please check if this text is clear and legible.\n\n';
  
  // Footer
  content += '------------------------\n';
  content += 'Test completed: ' + new Date().toLocaleTimeString() + '\n\n\n';
  
  // Write to temp file
  const tempFile = path.join(os.tmpdir(), 'printer-test.txt');
  fs.writeFileSync(tempFile, content);
  
  // Print with specified font size
  const command = `lp -d Star_TSP100 -o cpi=${getCPI(size)} ${tempFile}`;
  
  console.log(`Sending print job with font size ${size}...`);
  exec(command, (error, stdout, stderr) => {
    // Clean up temp file
    fs.unlinkSync(tempFile);
    
    if (error) {
      console.error('Error printing:', stderr);
      console.error('Command was:', command);
      askForNextTest();
      return;
    }
    
    console.log('Print test sent successfully!');
    askForNextTest();
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
    1: 16, // Smallest
    2: 12,
    3: 10, // Medium
    4: 8,
    5: 6   // Largest
  };
  
  return cpiMap[size] || 10; // Default to medium if invalid
}

/**
 * Ask user for next test
 */
function askForNextTest() {
  rl.question('\nEnter font size to test (1-5, 1=smallest, 5=largest) or "q" to quit: ', (answer) => {
    if (answer.toLowerCase() === 'q') {
      rl.close();
      return;
    }
    
    const size = parseInt(answer);
    if (isNaN(size) || size < 1 || size > 5) {
      console.log('Please enter a valid size between 1 and 5');
      askForNextTest();
      return;
    }
    
    printTestPattern(size);
  });
}

// Start the test
console.log('Star TSP100 Printer Font Size Test');
console.log('=================================');
console.log('This tool will help you test different font sizes');
console.log('Size 1 = Smallest, Size 5 = Largest');
askForNextTest();
