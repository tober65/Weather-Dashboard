var APIKey = "4c2e4d333c6901d5121a0e53238cf3ea";
var now = moment();

$("#search-button").on("click", function (event) {
    var city = $("#city-input").val();

    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" +
        APIKey;
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" +
        APIKey;

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

        $("#city-name").text(response.name + " " + now.format("M/D/YYYY"));
        $("#today-wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#today-humidity").text("Humidity: " + response.main.humidity + "%");
        $("#today-temp").text("Temp: " + response.main.temp + " F");

        document.getElementById("#day1").children[0].textContent = now.add(1, 'days').format("M/D/YYYY");
        document.getElementById("#day2").children[0].textContent = now.add(1, 'days').format("M/D/YYYY");
        document.getElementById("#day3").children[0].textContent = now.add(1, 'days').format("M/D/YYYY");
        document.getElementById("#day4").children[0].textContent = now.add(1, 'days').format("M/D/YYYY");
        document.getElementById("#day5").children[0].textContent = now.add(1, 'days').format("M/D/YYYY");
    });

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        document.getElementById("#day1").children[2].textContent = "Temp: " + response.list[1].main.temp + " F";
        document.getElementById("#day2").children[2].textContent = "Temp: " + response.list[9].main.temp + " F";
        document.getElementById("#day3").children[2].textContent = "Temp: " + response.list[17].main.temp + " F";
        document.getElementById("#day4").children[2].textContent = "Temp: " + response.list[25].main.temp + " F";
        document.getElementById("#day5").children[2].textContent = "Temp: " + response.list[33].main.temp + " F";

        document.getElementById("#day1").children[3].textContent = "Humidity: " + response.list[1].main.humidity + "%";
        document.getElementById("#day2").children[3].textContent = "Humidity: " + response.list[9].main.humidity + "%";
        document.getElementById("#day3").children[3].textContent = "Humidity: " + response.list[17].main.humidity + "%";
        document.getElementById("#day4").children[3].textContent = "Humidity: " + response.list[25].main.humidity + "%";
        document.getElementById("#day5").children[3].textContent = "Humidity: " + response.list[33].main.humidity + "%";

        var iconId = response.list[1].weather[0].icon;
        document.getElementById("#day1").children[1].innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconId + ".png'>";

        iconId = response.list[9].weather[0].icon;
        document.getElementById("#day2").children[1].innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconId + ".png'>";

        iconId = response.list[17].weather[0].icon;
        document.getElementById("#day3").children[1].innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconId + ".png'>";

        iconId = response.list[25].weather[0].icon;
        document.getElementById("#day4").children[1].innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconId + ".png'>";

        iconId = response.list[33].weather[0].icon;
        document.getElementById("#day5").children[1].innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconId + ".png'>";
    });
});

