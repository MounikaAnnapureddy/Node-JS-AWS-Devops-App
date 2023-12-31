// Bringing the register buttons from HTML

var btnOpen = document.getElementById("work-1");
var btnReview = document.getElementById("review");
var reviewForm = document.getElementById("reviewForm");

var URL = "http://localhost:3000";

btnOpen.addEventListener("click", function (e) {
  e.preventDefault();
  var filePath = "workshops/Resume_MounikaAnnapureddy.pdf";

  location.href = URL + "/" + filePath;
  //location.href = URL+"/Resume_MounikaAnnapureddy";
});
btnReview.addEventListener("click", function (e) {
  e.preventDefault();
  var filePath = "workshops/ReviewForm.html"
  location.href = URL+ "/" + filePath;
});

// Assuming you have a form with an ID "reviewForm"


// Assuming you have a form with an ID "reviewForm"
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Assuming you have a form with a name field
  var nameField = document.getElementById("nameField"); // Adjust the ID based on your actual HTML
  var filePath = "success.html";
  var formData = {
    name: nameField ? nameField.value : "Anonymous", // Use "Anonymous" if the name is not provided
    // Include other form fields as needed
  };

  // Send the form data to the server
  fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      // Always parse JSON if the response is not a redirect
      return response.json().then((result) => ({
        redirected: response.redirected,
        result: result,
      }));
    })
    .then(({ redirected, result }) => {
      if (redirected) {
        // If the response is a redirect, manually navigate to the new location
        window.location.href = response.url;
      } else {
        // Check if the response has a success property
        if (result && result.success) {
          alert("Form submitted successfully!");
          window.location.href = `${URL}/success.html`;;
          // Add any additional actions here
        } else {
          alert("Form submission failed. Please try again.");
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});







