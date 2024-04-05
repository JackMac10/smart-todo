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
    const apiKey = 'd580475d80ba4a008b994009b2358eab';
    const cuisine = searchTerm.replace(/^to\s+eat\s+/i, '');
    // Toronto is a default location
    const lat = 43.669814;
    const lng = -79.399367;

    // console.log("cuisine --->> : ", cuisine);

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







//  ----------------------------- - - - -old- - - - -

// // Function to search for restaurants asynchronously
// async function fetchItemsToEat(searchTerm) {
//   try {
//     const apiKey = 'd580475d80ba4a008b994009b2358eab';
//     const cuisine = 'italian'; // Change this to your desired query
//     const lat = 43.669814;
//     const lng = -79.399367;

//     const url = `https://api.spoonacular.com/food/restaurants/search?lat=${lat}&lng=${lng}&cuisine=${cuisine}&apiKey=${apiKey}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Failed to search for restaurants');
//     }

//     const data = await response.json();
//     const restaurants = data.restaurants || [];

//     console.log("restaurants --->> : ", restaurants[0].name);
//     console.log("restaurants --->> : ", restaurants[0].address.street_addr);
//     console.log("restaurants --->> : ", restaurants[0].description);
//     console.log("restaurants --->> : ", restaurants[0].logo_photos);

//     // Get the container element where you want to display the restaurant results
//     const restaurantResultsContainer = document.getElementById('book-results');

//     // Clear existing results
//     restaurantResultsContainer.innerHTML = '';

//     restaurants.forEach(restaurant => {
//       // Create elements for each restaurant
//       const li = document.createElement('li');
//       const nameElement = document.createElement('strong');
//       const addressElement = document.createElement('div');
//       const descriptionElement = document.createElement('div');
//       const foodPhotosElement = document.createElement('div');



//       // Assign text content to elements
//       nameElement.textContent = `Name: ${restaurant.name}`;
//       addressElement.textContent = `Address: ${restaurant.address.street_addr}`;
//       descriptionElement.textContent = `Description: ${restaurant.description}`;
//       foodPhotosElement.textContent = `Food Photo: ${restaurant.food_photos}`

//       // Append elements to list item
//       li.appendChild(nameElement);
//       li.appendChild(addressElement);
//       li.appendChild(descriptionElement);

//       // Append list item to container
//       restaurantResultsContainer.appendChild(li);
//     });

//     return restaurants;
//   } catch (error) {
//     console.error('Error searching for restaurants:', error);
//     return []; // Return an empty array if there's an error
//   }
// }

//  ------------------------------------------------------older ---------------

// // Function to search for restaurants asynchronously
// async function fetchItemsToEat(searchTerm) {
//   try {
//     const apiKey = 'd580475d80ba4a008b994009b2358eab';
//     const cuisine = 'italian'; // Change this to your desired query
//     const lat = 43.669814;
//     const lng = -79.399367;

//     const url = `https://api.spoonacular.com/food/restaurants/search?lat=${lat}&lng=${lng}&cuisine=${cuisine}&apiKey=${apiKey}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Failed to search for restaurants');
//     }

//     const data = await response.json();
//     const restaurants = data.restaurants || [];
//     console.log("restaurants --->> : ", restaurants[0].name);
//     console.log("restaurants --->> : ", restaurants[0].address.street_addr);
//     console.log("restaurants --->> : ", restaurants[0].description);
//     console.log("restaurants --->> : ", restaurants[0].food_photos);

//     const restaurantResults = document.getElementById('restaurant-results');
//     restaurantResults.innerHTML = '';

//     restaurants.forEach(restaurant => {
//       const li = document.createElement('li');
//       const nameElement = document.createElement('strong');
//       nameElement.textContent = `Name: ${restaurant.name}`;
//       li.appendChild(nameElement);

//       const phoneElement = document.createElement('div');
//       phoneElement.textContent = `Phone Number: ${restaurant.phone_number}`;
//       li.appendChild(phoneElement);

//       const addressElement = document.createElement('div');
//       addressElement.textContent = `Address: ${restaurant.address.street_addr}, ${restaurant.address.city}, ${restaurant.address.state} ${restaurant.address.zipcode}, ${restaurant.address.country}`;
//       li.appendChild(addressElement);

//       const descriptionElement = document.createElement('div');
//       descriptionElement.textContent = `Description: ${restaurant.description}`;
//       li.appendChild(descriptionElement);

//       const cuisinesElement = document.createElement('div');
//       cuisinesElement.textContent = `Cuisines: ${restaurant.cuisines.join(', ')}`;
//       li.appendChild(cuisinesElement);

//       restaurantResults.appendChild(li);
//     });

//     return restaurants;
//   } catch (error) {
//     console.error('Error searching for restaurants:', error);
//     return []; // Return an empty array if there's an error
//   }
// }

// // // Example usage
// // const query = 'italian'; // Change this to your desired query
// // const lat = 43.669814;
// // const lng = -79.399367;

// // fetchItemsToEat(query, lat, lng)
// //   .then(restaurants => {
// //     console.log('Found restaurants:', restaurants);
// //   })
// //   .catch(error => {
// //     console.error('Error searching for restaurants:', error);
// //   });

