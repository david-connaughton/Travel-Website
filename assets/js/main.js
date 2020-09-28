// Country Section

$(document).ready(function () {
    $("#country-selector").click(function () {

        //Country Details 
        var query_country = $("#country-list").val();
        var country_endpoint = "https://restcountries.eu/rest/v2/name/";
        var country_remainder = "?fullText=true";
        $(".details").empty();
        $.getJSON(`${country_endpoint}${query_country}${country_remainder}`, function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".details").append(`<img src="${data[i].flag}" style="height:30px; width:50px; margin:10px">
                <h4>Country:<span class="country-info">${data[i].name}</span></h4>
                <h4>Capital:<span class="country-info">${data[i].capital}</span></h4>
                <h4>Population:<span class="country-info">${data[i].population}</span></h4>
                <h4>Currency:<span class="country-info">${data[i].currencies[0].name}</span></h4>
                <h4>Borders:<span class="country-info">${data[i].borders}</span></h4>`);
            }
        });
    });
})




// Picture Section

// $.getJSON("https://pixabay.com/api/?key=18432792-6a5edf4c31f5b9b4e47dd6528&q=ireland", function (data) {
//     console.log(data.hits[0].largeImageURL);
// })

// Country Info Section

// $.getJSON("https://restcountries.eu/rest/v2/name/ireland?fullText=true", function (data) {
//     console.log(data[0].name);
// })

// News Article Section

// $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=tourism-ireland&fq=news_desk:(travel)ANDgeoocations:ireland&api-key=mTYJd3lj52S8QoXeLzYlZiGGswIRLX7N", function (data) {
//     console.log(data.response.docs[0].headline.main);
// })