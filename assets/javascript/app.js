var topics = ["Full House", "Wayne's World", "Nickelodeon", "Power Rangers", "Home Alone", "Chris Farley",
			  "The Fresh Prince", "Dumb and Dumber", "Reading Rainbow", "Keenan and Kel",
			  "TMNT", "Friends", "Topanga", "Al Bundy", "AOL", "Clueless"
			 ];
      
        $(document).on("click", "button", function() {

      $("#gifs-view").empty(); //empties div to only see 1 button's gifs at a time

      var search = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          console.log(response.data);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var retroGif = $("<img>");
            retroGif.attr({"src": results[i].images.fixed_height_still.url,
                          "data-state": "still",
                          "class": "image",
                          "data-still": results[i].images.fixed_height_still.url,
                          "data-animate": results[i].images.fixed_height.url,
          });
            gifDiv.prepend(p);
            gifDiv.prepend(retroGif);
            $("#gifs-view").prepend(gifDiv);
          }
        });
    });

          $(document).on("click", "img", function() {
          var state = $(this).attr("data-state");
      
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
    });
// GIVE IT A DATA ATTRIBUTE WITH A SRC AND THE ANIMATED URL

      // Function for displaying buttons
      function renderButtons() {
        // Deleting the buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each topic in the array
          var a = $("<button>");
          // Adding classes to our button
          a.addClass("gif btn btn-default");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where a button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var addGif = $("#gif-input").val().trim();
        // Adding topic from the textbox to our array
        topics.push(addGif);
        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
      });
      // Calling the renderButtons function to display the initial buttons
      renderButtons();
      
        //   $(document).on("click", "image", function() {
        //   var state = $(this).attr("src");
        //   var stillSrc = results[i].images.fixed_height_still.url;
        //   var animatedSrc = results[i].images.fixed_height.url;
          
        //   if (state === retroGif) {
        //     $(this).attr("src", animatedSrc);
        //   } 
        //   else {
        //     $(this).attr("src", stillSrc);
        //   }
        // });