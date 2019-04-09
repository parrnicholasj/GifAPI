$("#search").on("click", function(event) {
  
  event.preventDefault();

  var $userSearch = $("#userSearch").val();

  console.log($userSearch);

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4NgZUEznrfAEcVoDyY79HQRZsB89CWm4&limit=10&q=" + $userSearch;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

      console.log(response);

      var result = response.data;
      console.log(result.length);

      for (var i = 0; i < result.length; i++){

        var $gif = $("<img>");
        var stillUrl = result[i].images.fixed_height_still.url;
        var gifUrl = result[i].images.fixed_height.url;
        
        $gif.attr("src", stillUrl);
        $gif.attr("stillSrc", stillUrl);
        $gif.attr("gifSrc", gifUrl);
        
        $("#gifLand").append($gif);

      }

    });


})