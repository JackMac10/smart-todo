const axios = require('axios');

// Function to search for books using the Google Books API
async function findReading(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query
      }
    });

    const books = response.data.items;
    const results = [];

    books.forEach(book => {
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors;
      const description = book.volumeInfo.description;
      const previewLink = book.volumeInfo.previewLink;

      // Check if the book has any available reading options
      if (book.saleInfo && book.saleInfo.buyLink) {
        const buyLink = book.saleInfo.buyLink;
        results.push({ title, authors, description, previewLink, buyLink });
      }
    });

    return results; // Return array of book items with reading options
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return an empty array if there's an error
  }
}

// Example usage
const searchTerm = 'Node.js'; // Change this to whatever you want to search for
findReading(searchTerm)
  .then(books => {
    console.log('Found books with reading options:');
    books.forEach(book => {
      console.log('Title:', book.title);
      console.log('Authors:', book.authors.join(', '));
      console.log('Description:', book.description);
      console.log('Preview Link:', book.previewLink);
      console.log('Buy Link:', book.buyLink);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Error finding books:', error);
  });
