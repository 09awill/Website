function getRhyme() {
    var inputWord = $('#InputWord').val();
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://nasaapidimasv1.p.rapidapi.com/getPictureOfTheDay",
    "method": "POST",
    "headers": {
        "x-rapidapi-host": "NasaAPIdimasV1.p.rapidapi.com",
        "x-rapidapi-key": "737044ed31msh52795b130816460p11911ejsn11c0387305c6",
        "content-type": "application/x-www-form-urlencoded"
    },
    "data": {}
}

$.ajax(settings).done(function (response) {
    //console.log(response);
    var img = $('<img id="image_id">');
    img.attr('src', 'data:image/png;base64,' + response);
    img.appendTo('#RhymeResponse');
    //$('#RhymeResponse').append(response.Photo);
});
}