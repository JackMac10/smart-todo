// Function to fetch items for sale asynchronously using fetch
async function fetchItemsForSale(text) {
  // const searchTerm = encodeURIComponent(text.trim());

   // text triming here
   const searchTerm = text;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error('Failed to fetch items for sale');
    }

    const data = await response.json();
    const bookResults = document.getElementById('book-results');
    // Clear existing results
    bookResults.innerHTML = '';

    items.forEach(item => {
      const li = document.createElement('li');
      const titleElement = document.createElement('strong');
      titleElement.textContent = `Title: ${item.title}`;
      li.appendChild(titleElement);

      const bodyElement = document.createElement('div');
      bodyElement.textContent = `Body: ${item.body}`;
      li.appendChild(bodyElement);

      bookResults.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching items for sale:', error);

  }
}


