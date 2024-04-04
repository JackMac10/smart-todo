// info.js

// Function to fetch books asynchronously
async function fetchBooks(text) {


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
      const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author';
      const previewLink = item.volumeInfo.previewLink ? item.volumeInfo.previewLink : '#';

      const li = document.createElement('li');
      const titleElement = document.createElement('strong');
      titleElement.textContent = `Title: ${title}`;
      li.appendChild(titleElement);

      const authorsElement = document.createElement('div');
      authorsElement.textContent = `Authors: ${authors}`;
      li.appendChild(authorsElement);

      const previewLinkElement = document.createElement('a');
      previewLinkElement.textContent = 'Click to Preview';
      previewLinkElement.href = previewLink;
      previewLinkElement.target = '_blank';
      li.appendChild(previewLinkElement);

      bookResults.appendChild(li);

    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// To Buy Books
async function fetchItemsForSale(searchTerm) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error('Failed to search for books');
    }

    const data = await response.json();
    const books = [];

    data.items.forEach(item => {
      const title = item.volumeInfo.title;
      const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author';
      const previewLink = item.volumeInfo.previewLink;
      const purchaseLink = item.saleInfo.buyLink || 'Not available for purchase';

      books.push({ title, authors, previewLink, purchaseLink });
    });

    const bookResults = document.getElementById('book-results');
    bookResults.innerHTML = '';

    books.forEach(book => {
      const li = document.createElement('li');
      const titleElement = document.createElement('strong');
      titleElement.textContent = `Title: ${book.title}`;
      li.appendChild(titleElement);

      const authorsElement = document.createElement('div');
      authorsElement.textContent = `Authors: ${book.authors}`;
      li.appendChild(authorsElement);

      const previewLinkElement = document.createElement('a');
      previewLinkElement.textContent = 'Preview Link';
      previewLinkElement.href = book.previewLink;
      previewLinkElement.target = '_blank';
      li.appendChild(previewLinkElement);

      const purchaseLinkElement = document.createElement('a');
      purchaseLinkElement.textContent = 'Purchase Link';
      purchaseLinkElement.href = book.purchaseLink;
      purchaseLinkElement.target = '_blank';
      li.appendChild(purchaseLinkElement);

      bookResults.appendChild(li);
    });

    return books;
  } catch (error) {
    console.error('Error searching for books:', error);
    return []; // Return an empty array if there's an error
  }
}


