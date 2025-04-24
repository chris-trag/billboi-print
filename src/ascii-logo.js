/**
 * ASCII art version of The New York Times logo
 * This provides a text-based representation that can be printed on thermal printers
 */

const nytLogo = `
  _____ _            _   _                __     __       _     _____ _                
 |_   _| |__   ___  | \\ | | _____      __\\ \\   / /__  __| |_  |_   _(_)_ __ ___   ___ 
   | | | '_ \\ / _ \\ |  \\| |/ _ \\ \\ /\\ / / \\ \\ / / _ \\/ _\` |    | | | | '_ \` _ \\ / _ \\
   | | | | | |  __/ | |\\  |  __/\\ V  V /   \\ V /  __/ (_| |    | | | | | | | | |  __/
   |_| |_| |_|\\___| |_| \\_|\\___| \\_/\\_/     \\_/ \\___|\\__,_|    |_| |_|_| |_| |_|\\___|
                                                                                      
`;

// Simpler version for smaller paper width
const nytLogoSimple = `
╔════════════════════════════════════╗
║     THE NEW YORK TIMES             ║
╚════════════════════════════════════╝
`;

// Ultra-simple version that works on all thermal printers
const nytLogoUltraSimple = `
THE NEW YORK TIMES
===================
`;

// Old English style text representation
const nytLogoOldEnglish = `
𝕿𝖍𝖊 𝕹𝖊𝖜 𝖄𝖔𝖗𝖐 𝕿𝖎𝖒𝖊𝖘
`;

module.exports = {
  nytLogo,
  nytLogoSimple,
  nytLogoUltraSimple,
  nytLogoOldEnglish
};
