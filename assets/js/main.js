// Picture Section

$.getJSON("https://pixabay.com/api/?key=18432792-6a5edf4c31f5b9b4e47dd6528&q=ireland", function (data) {
    console.log(data.hits[0].largeImageURL);
})

// Country Info Section

$.getJSON("https://restcountries.eu/rest/v2/name/ireland?fullText=true", function (data) {
    console.log(data[0].name);
})

// News Article Section

$.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=tourism-ireland&fq=news_desk:(travel)ANDgeoocations:ireland&api-key=mTYJd3lj52S8QoXeLzYlZiGGswIRLX7N", function (data) {
    console.log(data.response.docs[0].headline.main);
})