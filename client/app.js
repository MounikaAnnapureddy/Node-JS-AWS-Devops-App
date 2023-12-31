// Bringing the register buttons from HTML

var btnOpen = document.getElementById("work-1");
var btnReview = document.getElementById("review");
//var btnWorshop2 = document.getElementById("work-2");
//var btnWorshop3 = document.getElementById("work-3");

// __________________________________________________________________

var URL = "http://localhost:3000";

btnOpen.addEventListener("click", function (e) {
  e.preventDefault();
  var filePath = "workshops/Resume_MounikaAnnapureddy.pdf";

  location.href = URL + "/" + filePath;
  //location.href = URL+"/Resume_MounikaAnnapureddy";
});
btnReview.addEventListener("click", function (e) {
  e.preventDefault;
  var filePath = "workshops/ReviewForm.html"
  location.href = URL+ "/" + filePath;
});
btnReview.addEventListener("click", function (e) {
  e.preventDefault();
  var filePath = "workshops/ReviewForm.html";

  // Assuming you have a form with a name field
  var nameField = document.getElementById("name"); // Adjust the ID based on your actual HTML

  var formData = {
    name: nameField ? nameField.value : "Anonymous", // Use "Anonymous" if name is not provided
    // Include other form fields as needed
  };

  // Send the form data to the server
  fetch(`${URL}/submit-form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // If the form submission is successful, redirect or display a success message
        //console.log("Form submitted successfully!");
        location.href  = URL+"../success.html";
      } else {
        // If there's an error, handle it appropriately
        console.error("Error submitting form:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
//btnWorshop2.addEventListener("click", function (e) {
  //e.preventDefault();

  //location.href = URL+"/workshop2";
//});
//btnWorshop3.addEventListener("click", function (e) {
 // e.preventDefault();

  //location.href = URL+"/workshop3";
//});
