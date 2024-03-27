// Client facing scripts here

// Add event listener for login button
$('#login-btn').on('click', function() {
  window.location.href = '/login'; // Redirect to the login page
});

// Add event listener for signup button
$('#signup-btn').on('click', function() {
  window.location.href = '/signup'; // Redirect to the signup page
});

// Import the main-page router
const mainPageRouter = require('./routes/main-page');

// Mount the main-page router at '/main-page' path
app.use('/main-page', mainPageRouter);
