var lat;
var lon;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            //var request = 'https://eu1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&format=json'
            //alert(position.coords.latitude, position.coords.longitude);
            lon = position.coords.longitude
            lat = position.coords.latitude;
            getWeather();
        });




    } else {
        console.log('Geolocation is not supported for this Browser/OS.');
    }
}



function getWeather() {
    var cityName = $('#cityName').val();
    var e = document.getElementById("CountryCode");
    var countryCode = e.options[e.selectedIndex].value;
    var request;
    if(lat != null){
      request = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=1&appid=6061d5474163449fb647f249e1402008'
    } else {
      request = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+','+ countryCode +'&cnt=1&appid=6061d5474163449fb647f249e1402008'
    }
    $.ajax({
        url: request,
        dataType: 'json',
        success: function(data) {
            var name = data.city.name;
            var maxTemp = data.list[0].main.temp_max - 273.15;
            var description = data.list[0].weather[0].description;
            maxTemp = Math.round(maxTemp);

            var elem = document.getElementById("weatherText");
            if (elem != null) {
                elem.remove();
            }

            $('.weatherResponse').append('<p id="weatherText">The weather in ' + name + ' is currently ' + description + ' with a high of ' + maxTemp + ' degrees Celsius so I advise listening to:</p>');
            var prevPlaylist = document.getElementById("playlist");
            if (prevPlaylist != null) {
                prevPlaylist.remove();
            }
            if (description.includes("rain")) {
                $('.Playlist').append('<iframe id="playlist" src="https://open.spotify.com/embed/user/hannalaurel/playlist/5O1wJcJ8ioKAa1a1YjOXVQ" width="300" height="380"  frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
            } else if (description.includes("cloud")) {
                $('.Playlist').append('<iframe id="playlist" src="https://open.spotify.com/embed/user/chloestratton18/playlist/1sfnnFUs4gb2zQseupHGG2" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');

            } else if (description.includes("snow")) {
                $('.Playlist').append('<iframe id="playlist" src="https://open.spotify.com/embed/user/nausocialmedia/playlist/5UpF6UeRgibUfkOcienZYA" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');

            } else {

                $('.Playlist').append('<iframe id="playlist" src="https://open.spotify.com/embed/user/probablyconor/playlist/10QvlnmbUaEEH1HB7qshPc" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
            }
        },
        error: function(data) {
            console.log(data.responseJSON.message);
            var regex = /^[A-Za-z ]+$/
            var isValid = regex.test(cityName);
            var matches = cityName.match(/\d+/g);
            if (matches != null) {
                alert('The entered City cannot contain a number');
            } else if (!isValid) {
                alert('The entered City cannot contain special characters')
            } else {
                var mes = (data.responseJSON.message);
                if (mes = "city not found") {
                    alert("Sorry, the entered City cannot be found");
                }
            }
        }



    });
    lat = null;
    lon = null;
}