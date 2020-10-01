// Country Section

$(document).ready(function () {
    $("#country-selector").click(function () {

        var query_country = $("#country-list").val();

        // Display Header Elements

        $(".hide").removeClass("hide");

        // Empty

        $(".details").empty();
        $(".selected-country").empty();
        $("#national-tourism-articles").empty();
        $("#photo").empty();

        // Country Details from Rest Countries API

        var country_endpoint = "https://restcountries.eu/rest/v2/name/";
        var country_remainder = "?fullText=true";

        $.getJSON(`${country_endpoint}${query_country}${country_remainder}`, function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".details").append(`<img src="${data[i].flag}" style="height:30px; width:50px; margin:10px">
                <h4>Country:<span class="country-info">${data[i].name}</span></h4>
                <h4>Capital:<span class="country-info">${data[i].capital}</span></h4>
                <h4>Population:<span class="country-info">${data[i].population}</span></h4>
                <h4>Currency:<span class="country-info">${data[i].currencies[0].name}</span></h4>`);
                $(".selected-country").append(`${data[i].name}`);
            }
        });

        // Tourism Articles from New York Times Articles API

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

        // Pictures from Pixabay API

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

// City Map Section

// let map

// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: {
//             lat: 53.14,
//             lng: -7.69
//         },
//         zoom: 8
//     })
// }

// Define Map Variables

let map;
let places;
let infoWindow;
let markers = [];
let autocomplete;
const countryRestrict = {
    country: "uk"
};
const MARKER_PATH =
    "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");

// Set Country Coordinates

const countries = {
    au: {
        center: {
            lat: 47.5,
            lng: 14.6
        },
        zoom: 5,
    },
    be: {
        center: {
            lat: 50.5,
            lng: 4.5
        },
        zoom: 5,
    },
    cr: {
        center: {
            lat: 45.1,
            lng: 15.2
        },
        zoom: 5,
    },
    cy: {
        center: {
            lat: 31.1,
            lng: 33.4
        },
        zoom: 5,
    },
    cz: {
        center: {
            lat: 49.8,
            lng: 15.5
        },
        zoom: 5,
    },
    dm: {
        center: {
            lat: 56.3,
            lng: 9.5
        },
        zoom: 5,
    },
    fr: {
        center: {
            lat: 46.2,
            lng: -2.2
        },
        zoom: 5,
    },
    gr: {
        center: {
            lat: 39.1,
            lng: 21.8
        },
        zoom: 5
    },
    ie: {
        center: {
            lat: 53.1,
            lng: -7.7
        },
        zoom: 5
    },
    it: {
        center: {
            lat: 41.9,
            lng: 12.6
        },
        zoom: 5
    },
    pl: {
        center: {
            lat: 51.9,
            lng: 19.1
        },
        zoom: 5
    },
    pt: {
        center: {
            lat: 39.4,
            lng: -8.2
        },
        zoom: 5
    },
    sp: {
        center: {
            lat: 40.5,
            lng: -3.7
        },
        zoom: 5
    },
    sw: {
        center: {
            lat: 60.1,
            lng: 18.6
        },
        zoom: 5
    },
    uk: {
        center: {
            lat: 54.8,
            lng: -4.6
        },
        zoom: 5
    },
};

// Initialize Map

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: countries["uk"].zoom,
        center: countries["uk"].center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
    });
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content"),
    });

    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"), {
            types: ["(cities)"],
            componentRestrictions: countryRestrict,
        }
    );
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener("place_changed", onPlaceChanged);

    // Add a DOM event listener to react when the user selects a country. 

    document
        .getElementById("country")
        .addEventListener("change", setAutocompleteCountry);
}

// When the user selects a city, get the place details for city and zoom in on map
// Custom calls to search for Hotels/Museums/Restaurants

function onPlaceChanged() {

    $("#hotel").click(function () {
        const place = autocomplete.getPlace();

        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            findHotel();
        }
    });

    $("#museum").click(function () {
        const place = autocomplete.getPlace();

        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            findMuseum();
        }
    });

    $("#restaurant").click(function () {
        const place = autocomplete.getPlace();

        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            findRestaurant();
        }
    });

    // Reset/Change City option added to clear city autocomplete

    $("#reset").click(function () {
        $(".autocomplete").val("");
    });
}

// Search for Hotels in the selected city

function findHotel() {
    const search = {
        bounds: map.getBounds(),
        types: ["lodging"],
    };
    places.nearbySearch(search, (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();

            // Create a marker for each Hotel found- assign a letter to each marker icon

            for (let i = 0; i < results.length; i++) {
                const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
                const markerIcon = MARKER_PATH + markerLetter + ".png";

                // Use Marker animation to drop the icons to map

                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon,
                });

                // If the user clicks a Hotel marker, show details in info window

                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], "click", showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}

// Search for Museums in the selected city

function findMuseum() {
    const search = {
        bounds: map.getBounds(),
        types: ["museum"],
    };
    places.nearbySearch(search, (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();

            // Create a marker for each Museum found- assign a letter to each marker icon

            for (let i = 0; i < results.length; i++) {
                const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
                const markerIcon = MARKER_PATH + markerLetter + ".png";

                // Use Marker animation to drop the icons to map

                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon,
                });

                // If the user clicks a Museum marker, show details in info window

                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], "click", showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}

// Search for Restaurants in the selected city

function findRestaurant() {
    const search = {
        bounds: map.getBounds(),
        types: ["restaurant"],
    };
    places.nearbySearch(search, (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();

            // Create a marker for each Restaurant found- assign a letter to each marker icon

            for (let i = 0; i < results.length; i++) {
                const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
                const markerIcon = MARKER_PATH + markerLetter + ".png";

                // Use Marker animation to drop the icons to map

                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon,
                });

                // If the user clicks a Restaurant marker, show details in info window

                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], "click", showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}

// Clear Markers

function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

// Set the country restrictions based on user input and center & zoom the map on country

function setAutocompleteCountry() {
    const country = document.getElementById("country").value;

    if (country == "all") {
        autocomplete.setComponentRestrictions({
            country: []
        });
        map.setCenter({
            lat: 15,
            lng: 0
        });
        map.setZoom(2);
    } else {
        autocomplete.setComponentRestrictions({
            country: country
        });
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
    }
    clearResults();
    clearMarkers();
}

// Drop Marker

function dropMarker(i) {
    return function () {
        markers[i].setMap(map);
    };
}

// Add results

function addResult(result, i) {
    const results = document.getElementById("results");
    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");
    tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";

    tr.onclick = function () {
        google.maps.event.trigger(markers[i], "click");
    };
    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const icon = document.createElement("img");
    icon.src = markerIcon;
    icon.setAttribute("class", "placeIcon");
    icon.setAttribute("className", "placeIcon");
    const name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}

// Clear Results 

function clearResults() {
    const results = document.getElementById("results");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details for Hotel/Museum/Restaurant and show in info-window on map

function showInfoWindow() {
    const marker = this;
    places.getDetails({
            placeId: marker.placeResult,
            place_id
        },
        (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        }
    );
}

// Load the place info into the HTML elements used by the info window

function buildIWContent(place) {
    document.getElementById("iw-icon").innerHTML =
        '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById("iw-url").innerHTML =
        '<b><a href="' + place.url + '">' + place.name + "</a></b>";
    document.getElementById("iw-address").textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById("iw-phone-row").style.display = "";
        document.getElementById("iw-phone").textContent =
            place.formatted_phone_number;
    } else {
        document.getElementById("iw-phone-row").style.display = "none";
    }

    // Assign a five star rating, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved

    if (place.rating) {
        let ratingHtml = "";

        for (let i = 0; i < 5; i++) {
            if (place.rating < i + 0.5) {
                ratingHtml += "&#10025;";
            } else {
                ratingHtml += "&#10029;";
            }
            document.getElementById("iw-rating-row").style.display = "";
            document.getElementById("iw-rating").innerHTML = ratingHtml;
        }
    } else {
        document.getElementById("iw-rating-row").style.display = "none";
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window

    if (place.website) {
        let fullUrl = place.website;
        let website = String(hostnameRegexp.exec(place.website));

        if (!website) {
            website = "http://" + place.website + "/";
            fullUrl = website;
        }
        document.getElementById("iw-website-row").style.display = "";
        document.getElementById("iw-website").textContent = website;
    } else {
        document.getElementById("iw-website-row").style.display = "none";
    }
}