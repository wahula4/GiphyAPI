
const topics = ["Full House", "Wayne's World", "Nickelodeon", "Power Rangers", "Home Alone", "Chris Farley",
			  "The Fresh Prince", "Dumb and Dumber", "Reading Rainbow", "Keenan and Kel",
			  "TMNT", "Friends", "Topanga", "Al Bundy", "AOL", "Clueless"
			 ];

        $(document).on("click", "button", function() {

      $("#gifs-view").empty(); //empties div to only see 1 button's gifs at a time

      let search = $(this).attr("data-name");
      const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          let results = response.data;
          console.log(response.data);
          for (let i = 0; i < results.length; i++) {
            let gifDiv = $("<div class='item'>");
            let rating = results[i].rating;
            let p = $("<p>").text("Rating: " + rating);
            let retroGif = $("<img>");
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
          let state = $(this).attr("data-state");

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
      const renderButtons = () => {
        // Deleting the buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of topics
        for (let i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each topic in the array
          let a = $("<button>");
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
      $("#add-gif").on("click", event => {
        event.preventDefault();

        // This line grabs the input from the textbox
        let addGif = $("#gif-input").val().trim();
        // Adding topic from the textbox to our array
        topics.push(addGif);
        //return text in search to placeholder text
        $("#gif-input").val("");
        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
      });
      // Calling the renderButtons function to display the initial buttons
      renderButtons();