// Bringing the register buttons from HTML

var btnOpen = document.getElementById("work-1");
var btnReview = doccument.getElementById("review");
//var btnWorshop2 = document.getElementById("work-2");
//var btnWorshop3 = document.getElementById("work-3");

// __________________________________________________________________

var URL = "http://localhost:3000";

btnOpen.addEventListener("click", function (e) {
  e.preventDefault();
  var filePath1 = "workshops/Resume_MounikaAnnapureddy.pdf";

  location.href = URL + "/" + filePath1;
  //location.href = URL+"/Resume_MounikaAnnapureddy";
});
btnReview.addEventListener("click", function (e) {
  e.preventDefault;
  var filePath2 = "workshops/ReviewForm.html"
  location.href = URL+ "/" + filepath2;
});
//btnWorshop2.addEventListener("click", function (e) {
  //e.preventDefault();

  //location.href = URL+"/workshop2";
//});
//btnWorshop3.addEventListener("click", function (e) {
 // e.preventDefault();

  //location.href = URL+"/workshop3";
//});
