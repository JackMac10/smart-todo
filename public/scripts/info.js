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


// Function to search for restaurants asynchronously
async function fetchItemsToEat(searchTerm) {
  try {
    // const apiKey = 'd580475d80ba4a008b994009b2358eab';
    const apiKey = '45f8d672cd044bd191139e918b0dbcc6';
    const cuisine = searchTerm.replace(/^to\s+eat\s+/i, '');
    // Toronto is a default location
    const lat = 43.669814;
    const lng = -79.399367;


    const url = `https://api.spoonacular.com/food/restaurants/search?lat=${lat}&lng=${lng}&cuisine=${cuisine}&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to search for restaurants');
    }

    const data = await response.json();
    const restaurants = data.restaurants || [];

    // Get the container element where you want to display the restaurant results
    const restaurantResultsContainer = document.getElementById('book-results');

    // Clear existing results
    restaurantResultsContainer.innerHTML = '';

    restaurants.forEach(restaurant => {
      // Check if both description and at least one photo exist
      if (restaurant.description && restaurant.food_photos && restaurant.food_photos.length > 0) {
        // Create elements for each restaurant
        const li = document.createElement('li');
        const nameElement = document.createElement('strong');
        const addressElement = document.createElement('div');
        const descriptionElement = document.createElement('div');
        const foodPhotosContainer = document.createElement('div');

        // Assign text content to elements
        nameElement.textContent = `Name: ${restaurant.name}`;
        addressElement.textContent = `Address: ${restaurant.address.street_addr}`;
        descriptionElement.textContent = `Description: ${restaurant.description}`;

        // Create image elements for food photos
        restaurant.food_photos.forEach(photoUrl => {
          const img = document.createElement('img');
          img.src = photoUrl;
          img.alt = 'Food Photo';
          img.style.width = '150px'; // Set the width of the image
          img.style.height = '150px'; // Set the height of the image
          img.style.marginRight = '10px'; // Add some spacing between images
          foodPhotosContainer.appendChild(img);
        });

        // Append elements to list item
        li.appendChild(nameElement);
        li.appendChild(addressElement);
        li.appendChild(descriptionElement);
        li.appendChild(foodPhotosContainer);

        // Append list item to container
        restaurantResultsContainer.appendChild(li);
      }
    });

    return restaurants;
  } catch (error) {
    console.error('Error searching for restaurants:', error);
    return []; // Return an empty array if there's an error
  }
}


// Function to search for 'to Wath' category asynchronously
async function fetchItemsToWatch(title) {

  console.log("title; ", title);
  title = title.replace('watch ', '');
  const ret = title.replace('to', '');
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


// // Function to handle Other category asynchronously

async function fetchItemsOther(title) {

  try {

    const watchResults = document.getElementById('book-results');
    watchResults.innerHTML = '';

      const li = document.createElement('li');
      const previewLink = 'https://www.google.com/search?q=' + (title)

      const previewLinkElement = document.createElement('a');
      previewLinkElement.textContent = 'See more about ' + (title);
      previewLinkElement.href = previewLink;
      previewLinkElement.target = '_blank';
      li.appendChild(previewLinkElement);

      watchResults.appendChild(li);
      console.log("No results found");

  } catch (error) {
    console.error(error);
  }
};

