require('dotenv').config();
const { CronJob } = require('cron');
const { 
  fetchTopStories,
  fetchMostPopular,
  fetchBookReviews,
  fetchMovieReviews,
  fetchBestSellers,
  fetchHistoricalArticles,
  fetchArticlesBySearch
} = require('./src/nytApi');
const { printStories } = require('./src/printer');
const { startFontTest } = require('./src/font-test');
const moment = require('moment');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Print immediately on startup
console.log('🗞️ billboi-print: Starting up...');
console.log(`🗞️ Current time: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);

async function runPrintJob(fetchFunction, ...args) {
  try {
    console.log(`🗞️ Fetching stories from NYT API...`);
    const stories = await fetchFunction(...args);
    
    console.log(`🗞️ Printing ${stories.length} stories...`);
    await printStories(stories);
    
    console.log('🗞️ Print job completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error in print job:', error);
    return false;
  } finally {
    // Show the menu again after printing is done
    displayMenu();
  }
}

// Schedule daily morning print job (7:00 AM)
const morningPrintJob = new CronJob('0 0 7 * * *', async () => {
  console.log(`🗞️ Running scheduled morning print job at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
  await runPrintJob(fetchTopStories);
});

morningPrintJob.start();
console.log('🗞️ Scheduled daily print job for 7:00 AM');

// Display the menu initially
displayMenu();

// Display command options with ASCII logo
function displayMenu() {
  // Clear the console
  console.clear();
  
  // Display ASCII logo
  console.log(`
         0000000              00000000              0000000
       111111111      11111111100          000      111111111
       00000        111111111111111111      00000      000000
       000        1111111111111111111111111100000         000
       000        1111       1111111111111111100          000
       000         11       0     1111111100              000
       000          1      00             1               000
       000               00      00       1               000
       000             000    00000       1               000
    00000            0000  00000000       1                00000
  11111            000 00    000000      000                 11111
    00000          0000      000000     00000              00000
       000        10000      000000      000              0000
       000        00000      000000       1               000
       000        000000     10000        1     0         000
       000        1000000 00              1    00         000
       000         1111111                1 0000          000
       000          1111111100           000000           000
       0000          111111111111111110000000            0000
       111111111        111111111111100000          111111111
         0000000              00000000              0000000
  `);
  
  console.log('🗞️  billboi-print is running. Available commands:');
  console.log('  print [section]      - Print top stories (e.g., print science, print arts)');
  console.log('  popular [days]       - Print most popular stories (days: 1, 7, or 30)');
  console.log('  books                - Print latest book reviews');
  console.log('  movies               - Print movie reviews');
  console.log('  best [list]          - Print bestseller list (e.g., best hardcover-fiction)');
  console.log('  history [year] [month] [keyword] - Print historical articles');
  console.log('  search <query>       - Search for articles by topic');
  console.log('  test                 - Test different font sizes');
  console.log('  help                 - Show detailed help for commands');
  console.log('  clear                - Clear the screen and show this menu');
  console.log('  quit                 - Exit the application');
}

// Handle user input for on-demand printing
function promptUser() {
  rl.question('> ', async (input) => {
    const parts = input.trim().toLowerCase().split(' ');
    const command = parts[0];
    const args = parts.slice(1);
    
    switch (command) {
      case 'print':
        console.log('🗞️ Starting on-demand print job for top stories...');
        const section = args[0] || 'home';
        await runPrintJob(fetchTopStories, section);
        break;
        
      case 'popular':
        console.log('🗞️ Printing most popular stories...');
        const period = args[0] || 7;
        await runPrintJob(fetchMostPopular, period);
        break;
        
      case 'books':
        console.log('🗞️ Printing latest book reviews...');
        await runPrintJob(fetchBookReviews);
        break;
        
      case 'movies':
        console.log('🗞️ Printing movie reviews...');
        await runPrintJob(fetchMovieReviews);
        break;
        
      case 'best':
        console.log('🗞️ Printing bestseller list...');
        const list = args[0] || 'hardcover-fiction';
        await runPrintJob(fetchBestSellers, list);
        break;
        
      case 'history':
        console.log('🗞️ Printing historical articles...');
        const year = parseInt(args[0]) || 1969;
        const month = parseInt(args[1]) || 7;
        const keyword = args.slice(2).join(' ') || '';
        await runPrintJob(fetchHistoricalArticles, year, month, keyword);
        break;
        
      case 'search':
        if (args.length === 0) {
          console.log('❌ Please provide a search term. Example: search technology');
          displayMenu();
          break;
        }
        const query = args.join(' ');
        console.log(`🗞️ Searching for articles about "${query}"...`);
        await runPrintJob(fetchArticlesBySearch, query);
        break;
        
      case 'test':
        console.log('🗞️ Starting font size test...');
        await startFontTest(rl);
        displayMenu();
        break;
        
      case 'clear':
        displayMenu();
        break;
        
      case 'quit':
      case 'exit':
        console.log('🗞️ Shutting down billboi-print...');
        rl.close();
        process.exit(0);
        break;
        
      case 'help':
        showDetailedHelp();
        break;
        
      case '':
        // Do nothing for empty input
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
        console.log('Type "help" for available commands');
        displayMenu();
    }
    
    promptUser(); // Continue prompting
  });
}

// Show detailed help for all commands
function showDetailedHelp() {
  console.clear();
  console.log('\n📋 DETAILED COMMAND HELP');
  console.log('====================\n');
  
  console.log('PRINTING COMMANDS:');
  console.log('  print [section]      - Print top stories from NYT');
  console.log('    Available sections: home, arts, automobiles, books, business, fashion,');
  console.log('    food, health, insider, magazine, movies, nyregion, obituaries,');
  console.log('    opinion, politics, realestate, science, sports, sundayreview,');
  console.log('    technology, theater, t-magazine, travel, upshot, us, world\n');
  
  console.log('  popular [days]       - Print most popular stories');
  console.log('    days: 1 (yesterday), 7 (week), 30 (month)\n');
  
  console.log('  books                - Print latest book reviews\n');
  
  console.log('  movies               - Print movie reviews (critics\' picks)\n');
  
  console.log('  best [list]          - Print bestseller list');
  console.log('    Popular lists: hardcover-fiction, hardcover-nonfiction,');
  console.log('    paperback-fiction, paperback-nonfiction, young-adult\n');
  
  console.log('  history [year] [month] [keyword]');
  console.log('    - Print historical articles from NYT archive');
  console.log('    - Example: history 1969 7 moon (moon landing articles)\n');
  
  console.log('  search <query>       - Search for articles by topic');
  console.log('    - Example: search climate change\n');
  
  console.log('UTILITY COMMANDS:');
  console.log('  test                 - Test different font sizes');
  console.log('  clear                - Clear screen and show main menu');
  console.log('  help                 - Show this detailed help');
  console.log('  quit                 - Exit the application\n');
  
  console.log('Press Enter to return to the main menu...');
  
  // Wait for user to press Enter
  rl.once('line', () => {
    displayMenu();
  });
}

// Start the command prompt
promptUser();
