const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
const moment = require('moment');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { nytMastheadAsciiArt } = require('./text-logo');

/**
 * Initialize the printer connection
 * @returns {ThermalPrinter} Configured printer instance
 */
function initializePrinter() {
  // For macOS, we'll use a different approach with direct printing
  if (os.platform() === 'darwin') {
    return {
      isPrinterConnected: async () => true, // We'll handle connection differently
      isMacOSPrinter: true // Flag to indicate we're using macOS printing
    };
  }
  
  // For other platforms, use the standard approach
  const printer = new ThermalPrinter({
    type: PrinterTypes.STAR,
    interface: 'Star_TSP100',
    characterSet: 'PC437_USA',
    removeSpecialCharacters: true,
    lineCharacter: '-',
    options: {
      timeout: 5000
    }
  });
  
  return printer;
}

/**
 * Generate print content for macOS
 * @param {Array} stories - Array of story objects
 * @returns {String} - Content to print
 */
function generatePrintContent(stories) {
  // Function to add blank lines between each line of text
  const addBlankLines = (text) => {
    return text.split('\n').join('\n\n');
  };
  
  let content = '';
  
  // NYT Logo Masthead - add blank lines between each line
  content += addBlankLines(nytMastheadAsciiArt);
  
  // Date
  content += '\n\n' + moment().format('dddd, MMMM D, YYYY') + '\n\n\n\n';
  content += '\n\n' + '----------------------------------------' + '\n\n\n\n';
  
  // Stories
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    // Section
    content += story.section.toUpperCase() + '\n\n\n\n';
    
    // Headline
    const sanitizedTitle = story.title.replace(/[""'']/g, '"')
                                     .replace(/[–—]/g, '-')
                                     .replace(/[…]/g, '...');
    content += sanitizedTitle + '\n\n\n\n';
    
    // Abstract
    const sanitizedAbstract = story.abstract.replace(/[""'']/g, '"')
                                           .replace(/[–—]/g, '-')
                                           .replace(/[…]/g, '...');
    
    // Add line breaks for better readability
    const words = sanitizedAbstract.split(' ');
    let line = '';
    let abstractWithBreaks = '';
    
    for (const word of words) {
      if (line.length + word.length > 30) {  // Break lines at reasonable length
        abstractWithBreaks += line + '\n\n';  // Double spacing within abstract
        line = word + ' ';
      } else {
        line += word + ' ';
      }
    }
    abstractWithBreaks += line;  // Add the last line
    
    content += abstractWithBreaks + '\n\n\n\n';
    
    // Byline
    if (story.byline) {
      const sanitizedByline = story.byline.replace(/[""'']/g, '"')
                                         .replace(/[–—]/g, '-');
      content += sanitizedByline + '\n\n\n\n';
    }
    
    // URL
    content += '\n\n';
    content += `Read more: ${story.url}\n\n\n\n`;
    
    // Separator
    content += '\n\n';
    if (i < stories.length - 1) {
      content += '----------------------------------------\n\n\n\n';
    }
  }
  
  // Footer
  content += '\n\n\n\n';
  content += 'Printed by billboi-print\n\n';
  content += `${moment().format('h:mm A')}\n\n`;
  content += '\n\n\n\n';
  
  return content;
}

/**
 * Print to macOS printer using lp command
 * @param {String} content - Content to print
 * @returns {Promise} - Resolves when printing is complete
 */
function printToMacOSPrinter(content) {
  return new Promise((resolve, reject) => {
    const tempFile = path.join(os.tmpdir(), 'billboi-print.txt');
    
    // Write content to temp file
    fs.writeFileSync(tempFile, content);
    
    // Print using lp command with much larger font size (CPI=5 for maximum readability)
    // Lower CPI value = larger text (CPI = Characters Per Inch)
    exec(`lp -d Star_TSP100 -o cpi=5 ${tempFile}`, (error, stdout, stderr) => {
      // Clean up temp file
      fs.unlinkSync(tempFile);
      
      if (error) {
        console.error('Error printing:', stderr);
        reject(new Error(`Printing failed: ${error.message}`));
        return;
      }
      
      console.log('Print job sent to printer successfully!');
      resolve();
    });
  });
}

/**
 * Print all stories to the receipt printer
 * @param {Array} stories - Array of story objects from NYT API
 */
async function printStories(stories) {
  try {
    const printer = initializePrinter();
    
    // Check if we're using macOS printing
    if (printer.isMacOSPrinter) {
      const content = generatePrintContent(stories);
      await printToMacOSPrinter(content);
      return;
    }
    
    // For non-macOS, use the standard approach
    const isConnected = await printer.isPrinterConnected();
    if (!isConnected) {
      throw new Error('Printer not connected. Please check the connection.');
    }
    
    // Print masthead
    await printMasthead(printer);
    
    // Print each story
    for (let i = 0; i < stories.length; i++) {
      await printStory(printer, stories[i], i);
    }
    
    // Print footer
    await printFooter(printer);
    
    // Cut the paper
    printer.cut();
    
    // Execute print job
    await printer.execute();
    
    console.log('Print job sent to printer successfully!');
  } catch (error) {
    console.error('Error printing stories:', error);
    throw error;
  }
}

/**
 * Print the NYT masthead
 * @param {ThermalPrinter} printer - The printer instance
 */
async function printMasthead(printer) {
  printer.alignCenter();
  printer.bold(true);
  printer.setTextSize(1, 1);
  printer.println('');
  printer.println('The New York Times');
  printer.bold(false);
  printer.setTextNormal();
  
  const today = moment().format('dddd, MMMM D, YYYY');
  printer.println(today);
  printer.println('');
  
  printer.drawLine();
  printer.println('');
}

/**
 * Print a single story
 * @param {ThermalPrinter} printer - The printer instance
 * @param {Object} story - Story data from NYT API
 * @param {Number} index - Story index
 */
async function printStory(printer, story, index) {
  // Section label
  printer.alignLeft();
  printer.setTextNormal();
  printer.println(story.section.toUpperCase());
  printer.println('');
  
  // Headline (emulating nyt-cheltenham)
  printer.bold(true);
  printer.setTextSize(0, 1);
  
  // Sanitize title to avoid problematic characters
  const sanitizedTitle = story.title.replace(/[""'']/g, '"')
                                   .replace(/[–—]/g, '-')
                                   .replace(/[…]/g, '...');
  printer.println(sanitizedTitle);
  printer.setTextNormal();
  printer.bold(false);
  printer.println('');
  
  // Sanitize abstract
  const sanitizedAbstract = story.abstract.replace(/[""'']/g, '"')
                                         .replace(/[–—]/g, '-')
                                         .replace(/[…]/g, '...');
  printer.println(sanitizedAbstract);
  printer.println('');
  
  // Byline
  if (story.byline) {
    printer.invert(true);
    const sanitizedByline = story.byline.replace(/[""'']/g, '"')
                                       .replace(/[–—]/g, '-');
    printer.println(sanitizedByline);
    printer.invert(false);
  }
  
  // URL
  printer.println('');
  printer.println(`Read more: ${story.url}`);
  
  // Separator between stories
  printer.println('');
  if (index < 4) { // Don't print separator after the last story
    printer.drawLine();
    printer.println('');
  }
}

/**
 * Print footer with timestamp
 * @param {ThermalPrinter} printer - The printer instance
 */
async function printFooter(printer) {
  printer.alignCenter();
  printer.println('');
  printer.println(`Printed by billboi-print`);
  printer.println(`${moment().format('h:mm A')}`);
  printer.println('');
  printer.println('');
  printer.println('');
}

module.exports = {
  printStories
};
