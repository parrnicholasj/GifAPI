var btns = ["zoidberg", "skelletor", "pepe", "warhammer"];



$("#search").on("click", function (event) {

  event.preventDefault();

  var $userSearch = $("#userSearch").val();

  console.log($userSearch);

  btns.push($userSearch);

  //call function that makes new button appear
  createBtns();

})

function createBtns() {

  $("#btnLand").empty(); //empty btnLand

  for (var i = 0; i < btns.length; i++) { //need to add bootstrap !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    var newBtn = $("<button>");
    newBtn.text(btns[i]);
    newBtn.attr("class", "gifBtn btn btn-dark m-1");

    $("#btnLand").prepend(newBtn);

  }

}

//when you click a button display relevant gifs
$("#btnLand").on("click", ".gifBtn", function (event) {

  console.log(this);

  var $userSearch = $(this).text();

  $("#gifLand").empty();

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4NgZUEznrfAEcVoDyY79HQRZsB89CWm4&limit=10&q=" + $userSearch;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

      console.log(response);

      var result = response.data;
      console.log(result.length);

      for (var i = 0; i < result.length; i++){// set them up for pausing by starting still but saving both to swap as desired

        var $gif = $("<img>");
        var stillUrl = result[i].images.fixed_height_still.url;
        var gifUrl = result[i].images.fixed_height.url;
        var rating = result[i].rating;
        var $div = $("<div>");

        $div.attr("class", "card col-3 m-1");
        
        $gif.attr("src", stillUrl);
        $gif.attr("stillSrc", stillUrl);
        $gif.attr("gifSrc", gifUrl);
        $gif.attr("id", "gif");
        $gif.attr("class", "stillGif");
        

        $div.append(`<h4>Rated: ${rating}</h4>`);
        $div.append($gif);
        $("#gifLand").prepend($div);

      }

    });

})

$("#gifLand").on("click", "#gif", function () { //when we click on a gif it either pauses or starts

  //if still make moving || if moving make still

  if ($(this).attr("class") == "stillGif") {

    $(this).attr("class", "gifGif");
    $(this).attr("src", $(this).attr("gifSrc"));

  } else if ($(this).attr("class") == "gifGif") {

    $(this).attr("class", "stillGif");
    $(this).attr("src", $(this).attr("stillSrc"));

  }

})

createBtns();