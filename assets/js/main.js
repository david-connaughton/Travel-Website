// Country Section

$(document).ready(function () {
    $("#country-selector").click(function () {

        var query_country = $("#country-list").val();

        //Display Header Elements
        $(".hide").removeClass("hide");

        //Empty

        $(".details").empty();
        $(".selected-country").empty();
        $("#national-tourism-articles").empty();
        $("#photo").empty();

        //Country Details from Rest Countries API

        var country_endpoint = "https://restcountries.eu/rest/v2/name/";
        var country_remainder = "?fullText=true";

        $.getJSON(`${country_endpoint}${query_country}${country_remainder}`, function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".details").append(`<img src="${data[i].flag}" style="height:30px; width:50px; margin:10px">
                <h4>Country:<span class="country-info">${data[i].name}</span></h4>
                <h4>Capital:<span class="country-info">${data[i].capital}</span></h4>
                <h4>Population:<span class="country-info">${data[i].population}</span></h4>
                <h4>Currency:<span class="country-info">${data[i].currencies[0].name}</span></h4>
                <h4>Borders:<span class="country-info">${data[i].borders}</span></h4>`);
                $(".selected-country").append(`${data[i].name}`);
            }
        });

        //Tourism Articles from New York Times Articles API

        var article_endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=tourism-";
        var article_midURL = "&fq=news_desk:(travel)ANDgeoocations:";
        var article_apiKey = "&api-key=mTYJd3lj52S8QoXeLzYlZiGGswIRLX7N";

        $.getJSON(`${article_endpoint}${query_country}${article_midURL}${query_country}${article_apiKey}`, function (data) {
            var articles = data.response.docs;
            for (var i = 0; i < 4; i++) {
                $("#national-tourism-articles").append(`<h4>${articles[i].headline.main}</h4>
                <br>
                <p>${articles[i].snippet}</p>
                <a href = "${articles[i].web_url}" target="_blank">Full Article</a>
                <br><br>`);
            }
        });

        //Pictures from Pixabay API

        var picture_endpoint = "https://pixabay.com/api/?key=";
        var picture_apiKey = "18432792-6a5edf4c31f5b9b4e47dd6528";
        var picture_query = "&q=";

        $.getJSON(`${picture_endpoint}${picture_apiKey}${picture_query}${query_country}`, function (data) {
            var photos = data.hits;
            for (var i = 0; i < 9; i++) {
                $("#photo").append(`<div class="api-photo"><img src="${photos[i].largeImageURL}" height="300px" width="300px"></div>`);
            }
        });
    });
})