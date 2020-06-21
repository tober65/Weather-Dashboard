var APIKey = "4c2e4d333c6901d5121a0e53238cf3ea";

$("#search-button").on("click", function (event) {
    var city = $("#city-input").val();

    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" +
        APIKey;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: uvQueryURL,
            method: "GET",
        }).then(function (response) {
            $("#today-uv-index").text("UV Index: " + response.value);
        });

        $("#city-name").text(response.name + " " + moment().format("MMMM Do YYYY"))
        $("#today-wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#today-humidity").text("Humidity: " + response.main.humidity + "%");
        $("#today-temp").text("Temp: " + response.main.temp + " F");
    });
})