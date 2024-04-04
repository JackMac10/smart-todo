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


async function fetchItemsToWatch(title) {
  console.log(title)
    const ret = title.replace('watch ','');
    console.log(ret); 

  const url = 'https://ott-details.p.rapidapi.com/search?title=' + (ret) + '&page=1';
  console.log(ret, url)
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7057fe6fdbmshf171e08b662a8d0p1edd80jsn7812a80edb5b',
      'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const watchResults = document.getElementById('book-results');
    watchResults.innerHTML = '';
    
    if (data.results.length === 0) {
      const li = document.createElement('li');
      const previewLink = 'https://www.google.com/search?q=' + (ret)

      const previewLinkElement = document.createElement('a');
      previewLinkElement.textContent = 'See more about ' + (ret);
      previewLinkElement.href = previewLink;
      previewLinkElement.target = '_blank';
      li.appendChild(previewLinkElement);

      watchResults.appendChild(li);
      console.log("No results found");
      return;
    }

    data.results.forEach(result => {
      const title = result.title;
      const genre = result.genre.join(', ');
      const releaseYear = result.released;
      const previewLink = 'https://www.google.com/search?q=' + (title) + ' ' + (releaseYear)

      const li = document.createElement('li');


      const titleElement = document.createElement('strong');
      titleElement.textContent = `Title: ${title}`;
      li.appendChild(titleElement);
      console.log(`${title}`)

      const genreElement = document.createElement('div');
      genreElement.textContent = `Genre(s): ${genre}`;
      li.appendChild(genreElement);

      const releaseYearElement = document.createElement('div');
      releaseYearElement.textContent = `Release Year: ${releaseYear}`;
      li.appendChild(releaseYearElement);

      const previewLinkElement = document.createElement('a');
      previewLinkElement.textContent = `See more about ${title}!`;
      previewLinkElement.href = previewLink;
      previewLinkElement.target = '_blank';
      li.appendChild(previewLinkElement);

      watchResults.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
};