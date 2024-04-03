const axios = require('axios');

// Function to search for books using the Google Books API
async function findBooks(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query
      }
    });

    return response.data.items; // Return array of book items
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return an empty array if there's an error
  }
}

// Example usage
const searchTerm = 'The Catcher in the Rye'; // Change this to whatever you want to search for
findBooks(searchTerm)
  .then(books => {
    console.log('Found books:');
    books.forEach(book => {
      console.log(book.volumeInfo.title);
    });
  })
  .catch(error => {
    console.error('Error finding books:', error);
  });
