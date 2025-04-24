/**
 * Text-based representation of The New York Times logo
 * Optimized for thermal receipt printers
 */

// Classic NYT masthead style
const nytMasthead = `
╔═════════════════════════════════════╗
║                                     ║
║        The New York Times           ║
║                                     ║
╚═════════════════════════════════════╝
`;

// Simplified version with decorative elements
const nytMastheadSimple = `
*-----------------------------------------*
|                                         |
|           The New York Times            |
|                                         |
*-----------------------------------------*
`;

// Ultra-minimal version that works on all printers
const nytMastheadMinimal = `
==========================================
            THE NEW YORK TIMES            
==========================================
`;

// Old English style text representation (may not work on all printers)
const nytMastheadFancy = `
    𝕿𝖍𝖊 𝕹𝖊𝖜 𝖄𝖔𝖗𝖐 𝕿𝖎𝖒𝖊𝖘
`;

// Custom ASCII art masthead provided by user
const nytMastheadAsciiArt = `
        11111111100          000   
      111111111111111111      00000
    1111111111111111111111111100000
    1111       1111111111111111100 
      11       0     1111111100     
      1      00             1      
            00      00       1      
          000    00000       1      
        0000  00000000       1    
      000 00    000000      000    
      0000      000000     00000   
    10000      000000      000    
    00000      000000       1      
    000000     10000        1     0
    1000000 00              1    00
      1111111                1 0000 
      1111111100           000000  
        111111111111111110000000    
          111111111111100000       
                00000000         
`;

module.exports = {
  nytMasthead,
  nytMastheadSimple,
  nytMastheadMinimal,
  nytMastheadFancy,
  nytMastheadAsciiArt
};
