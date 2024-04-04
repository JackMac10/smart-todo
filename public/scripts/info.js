// info.js

// Function to fetch books asynchronously
async function fetchBooks(text) {

  // Change this to whatever you want to search for
  // text triming here
  const searchTerm = text;
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
    const data = await response.json();

    const bookResults = document.getElementById('book-results');
    // Clear existing results
    bookResults.innerHTML = '';

    // Append each book title to the list
    data.items.forEach(item => {
      const title = item.volumeInfo.title;
      const li = document.createElement('li');
      li.textContent = title;
      bookResults.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Call the fetchBooks function when the page loads
// window.onload = fetchBooks;
