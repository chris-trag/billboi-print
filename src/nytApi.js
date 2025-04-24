const axios = require('axios');

/**
 * Fetch top stories from the NYT API
 * @param {String} section - Section to fetch (default: 'home')
 * @returns {Array} Array of story objects
 */
async function fetchTopStories(section = 'home') {
  try {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // Extract and return the top 5 stories
    return response.data.results
      .filter(story => story.title && story.abstract)
      .slice(0, 5)
      .map(story => ({
        section: story.section || 'news',
        title: story.title,
        abstract: story.abstract,
        byline: story.byline,
        url: story.url
      }));
  } catch (error) {
    console.error('Error fetching top stories:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: section || 'news',
      title: 'Error Fetching Stories',
      abstract: `We encountered an error while fetching stories: ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com'
    }];
  }
}

/**
 * Fetch most popular articles from the NYT API
 * @param {Number} period - Time period in days (1, 7, or 30)
 * @returns {Array} Array of story objects
 */
async function fetchMostPopular(period = 7) {
  try {
    // Ensure period is one of the allowed values
    const validPeriod = [1, 7, 30].includes(Number(period)) ? Number(period) : 7;
    
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${validPeriod}.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // Extract and return the top 5 most popular stories
    return response.data.results
      .filter(story => story.title && story.abstract)
      .slice(0, 5)
      .map(story => ({
        section: story.section || 'popular',
        title: story.title,
        abstract: story.abstract,
        byline: story.byline || '',
        url: story.url
      }));
  } catch (error) {
    console.error('Error fetching most popular stories:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: 'popular',
      title: 'Error Fetching Popular Stories',
      abstract: `We encountered an error while fetching popular stories: ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com'
    }];
  }
}

/**
 * Fetch latest book reviews from the NYT API
 * @returns {Array} Array of book review objects
 */
async function fetchBookReviews() {
  try {
    // The Books API requires an author, isbn, or title parameter
    // Let's use a popular author as a default search
    const url = `https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // If no results, try a different author
    if (!response.data.results || response.data.results.length === 0) {
      const fallbackUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?author=Colleen+Hoover&api-key=${process.env.NYT_API_KEY}`;
      const fallbackResponse = await axios.get(fallbackUrl);
      
      if (!fallbackResponse.data.results || fallbackResponse.data.results.length === 0) {
        return [{
          section: 'books',
          title: 'No Book Reviews Available',
          abstract: 'The New York Times book review API did not return any results at this time. Please try again later.',
          byline: 'billboi-print',
          url: 'https://www.nytimes.com/section/books/review'
        }];
      }
      
      return formatBookReviews(fallbackResponse.data.results);
    }
    
    return formatBookReviews(response.data.results);
  } catch (error) {
    console.error('Error fetching book reviews:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: 'books',
      title: 'Error Fetching Book Reviews',
      abstract: `We encountered an error while fetching book reviews: ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com/section/books/review'
    }];
  }
}

/**
 * Format book review data into a consistent structure
 * @param {Array} reviews - Raw review data from API
 * @returns {Array} - Formatted review objects
 */
function formatBookReviews(reviews) {
  return reviews
    .slice(0, 5)
    .map(review => ({
      section: 'books',
      title: review.book_title || 'Book Review',
      abstract: review.summary || `Review of "${review.book_title}" by ${review.book_author}`,
      byline: `Review by ${review.byline || 'NYT Critic'}`,
      url: review.url
    }));
}

/**
 * Fetch movie reviews from the NYT API
 * @returns {Array} Array of movie review objects
 */
async function fetchMovieReviews() {
  try {
    const url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // Extract and return the latest 5 movie reviews
    return response.data.results
      .slice(0, 5)
      .map(review => ({
        section: 'movies',
        title: review.display_title || 'Movie Review',
        abstract: review.summary_short || `Review of "${review.display_title}"`,
        byline: `Review by ${review.byline || 'NYT Critic'}`,
        url: review.link.url
      }));
  } catch (error) {
    console.error('Error fetching movie reviews:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: 'movies',
      title: 'Error Fetching Movie Reviews',
      abstract: `We encountered an error while fetching movie reviews: ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com/section/movies'
    }];
  }
}

/**
 * Fetch current bestsellers from the NYT API
 * @param {String} list - Bestseller list name (e.g., 'hardcover-fiction')
 * @returns {Array} Array of bestseller objects
 */
async function fetchBestSellers(list = 'hardcover-fiction') {
  try {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/${list}.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // Extract and return the top 5 bestsellers
    return response.data.results.books
      .slice(0, 5)
      .map(book => ({
        section: 'bestsellers',
        title: `#${book.rank}: ${book.title}`,
        abstract: `${book.description || 'No description available.'} By ${book.author}.`,
        byline: `${book.weeks_on_list} weeks on the bestseller list`,
        url: book.amazon_product_url
      }));
  } catch (error) {
    console.error('Error fetching bestsellers:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: 'bestsellers',
      title: 'Error Fetching Bestsellers',
      abstract: `We encountered an error while fetching bestsellers: ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com/books/best-sellers/'
    }];
  }
}

/**
 * Fetch articles from a specific month in history
 * @param {Number} year - Year to fetch from
 * @param {Number} month - Month to fetch from (1-12)
 * @param {String} keyword - Optional keyword to filter articles
 * @returns {Array} Array of historical article objects
 */
async function fetchHistoricalArticles(year = 1969, month = 7, keyword = '') {
  try {
    // Validate year and month
    const validYear = Number(year) || 1969;
    const validMonth = (Number(month) >= 1 && Number(month) <= 12) ? Number(month) : 7;
    
    const url = `https://api.nytimes.com/svc/archive/v1/${validYear}/${validMonth}.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // Filter articles by keyword if provided
    let articles = response.data.response.docs;
    if (keyword) {
      articles = articles.filter(doc => 
        doc.headline.main.toLowerCase().includes(keyword.toLowerCase()) ||
        (doc.abstract && doc.abstract.toLowerCase().includes(keyword.toLowerCase()))
      );
    }
    
    // If no articles found with keyword, return some articles anyway
    if (articles.length === 0) {
      articles = response.data.response.docs.slice(0, 5);
    }
    
    // Extract and return up to 5 historical articles
    return articles
      .slice(0, 5)
      .map(article => ({
        section: `archive: ${validMonth}/${validYear}`,
        title: article.headline.main,
        abstract: article.abstract || article.snippet || article.lead_paragraph || 'No abstract available.',
        byline: article.byline?.original || `Published: ${new Date(article.pub_date).toLocaleDateString()}`,
        url: article.web_url
      }));
  } catch (error) {
    console.error('Error fetching historical articles:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: `archive: ${month}/${year}`,
      title: 'Error Fetching Historical Articles',
      abstract: `We encountered an error while fetching historical articles: ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com/section/archive'
    }];
  }
}

/**
 * Search for articles on a specific concept or topic
 * @param {String} query - Search query
 * @returns {Array} Array of article objects
 */
async function fetchArticlesBySearch(query = 'technology') {
  try {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);
    
    // Extract and return up to 5 search results
    return response.data.response.docs
      .slice(0, 5)
      .map(article => ({
        section: `search: ${query}`,
        title: article.headline.main,
        abstract: article.abstract || article.snippet || article.lead_paragraph || 'No abstract available.',
        byline: article.byline?.original || `Published: ${new Date(article.pub_date).toLocaleDateString()}`,
        url: article.web_url
      }));
  } catch (error) {
    console.error('Error searching for articles:', error.message);
    
    // Return a fallback message instead of throwing an error
    return [{
      section: `search: ${query}`,
      title: 'Error Searching for Articles',
      abstract: `We encountered an error while searching for "${query}": ${error.message}. Please try again later.`,
      byline: 'billboi-print',
      url: 'https://www.nytimes.com'
    }];
  }
}

module.exports = {
  fetchTopStories,
  fetchMostPopular,
  fetchBookReviews,
  fetchMovieReviews,
  fetchBestSellers,
  fetchHistoricalArticles,
  fetchArticlesBySearch
};
