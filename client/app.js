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
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
console.log("checkpoint1");
  // Assuming you have a form with a name field
  var name = document.getElementById("nameField"); // Adjust the ID based on your actual HTML
  var company = document.getElementById("companyField");
  var rating = document.getElementById("ratingsField");
  var comments = document.getElementById("commentsField");
  var location = document.getElementById("countries");

  var formData = {
    name: name ? name.value : "Anonymous", // Use "Anonymous" if the name is not provided
    company: company ? company.value : "Anonymous",
    rating: rating ? rating.value : "Anonymous",
    comments: comments ? comments.value : "Anonymous",
    location: location ? location.value : "Anonymous",
    // Include other form fields as needed
  };

  // Send the form data to the server
  console.log("Before fetch");
fetch(`${URL}./submit-form`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Response data:", data);
    if (data.success) {
      console.log("Form submitted successfully!");
      alert("Form submitted successfully!");
      console.log("Before Redirection");
      window.location.href = URL + "/" + "success";
      console.log("After Redirection");
    } else {
      console.log("Form submission failed:", data.message);
      // Handle error
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
});








