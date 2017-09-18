var buttonArray = ["hamburger", "lasagne", "pizza", "milkshake", "candy bar", "ice cream", "french fries", "doritos", "crepes"]


function renderButtons() {

  $("#button-div").empty()

  for (var i=0; i < buttonArray.length; i++){
    
  	$("#button-div").append(makeButton(buttonArray[i]))
  }

}

function makeButton(name) {
    var newButton = $('<button class="btn btn-primary">')
    newButton.attr("id", name)
    newButton.addClass("gifButton")
    newButton.text(name)
    return newButton
}

renderButtons()

function displayGifs() {

  $("#gif-div").empty()

	var food = $(this).attr("id");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        for (var i=0; i<10; i++){

          var image = response.data[i].images.fixed_width_still.url
          var rating = response.data[i].rating
          var imageDiv = $("<img>")
          var p = $('<p class="lead">')

          p.text("Rating: " + rating)
          imageDiv.attr("src", image)
          imageDiv.attr("data-state", "still")
          imageDiv.attr("data-animate", response.data[i].images.fixed_width.url)
          imageDiv.attr("data-still", response.data[i].images.fixed_width_still.url)
          imageDiv.addClass("gif")
          p.append(imageDiv)

          // $("#gif-div").append(p)
          $("#gif-div").append(p)

        }
      })

}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The movie from the textbox is then added to our array
  buttonArray.push(gif);

  $("#button-div").append(makeButton(gif))
  // Calling renderButtons which handles the processing of our movie array
  
  $('#gif-input').val('')

});

function animateOrStill() {
  var state = $(this).attr("data-state")
  console.log(state)

      if (state === "still") {
        var animateSource = $(this).attr("data-animate")
        $(this).attr("src", animateSource)
        $(this).attr("data-state", "animate")
        
      }
      else if (state != "still"){
        var animateStill = $(this).attr("data-still")
        $(this).attr("src", animateStill)
        $(this).attr("data-state", "still")   
             
      }
}

$(document).on("click", ".gif", animateOrStill)
$(document).on("click", ".gifButton", displayGifs)