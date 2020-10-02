# European Breaks

This website is an Interactive Frontend site. It responds fully to user action and allows them to engage with data for 15 Countries and to alter the site display according to their needs.

The user journey is intended to be intuitive and seamless. I have created a single page architecture as follows:

i. Navigation Bar.<br>
ii. Inviting Cover Image with Call To Action Button.<br>
iii. Country Information Section.<br>
iv. City Attractions Map Section.<br>
v. Carbon Footprint Calculator Section.<br>

# UX

This site is designed Mobile First and is responsive on all devices. Full UX information is contained in the UX document stored in the document section of this Github Repository.<br>

# Features

## Existing Features:

This site is developed with the following features:<br>

- Country Search: Selecting the "Let's Get Started" button brings the user to the Countries Section. At this point the user is provided with a list of 15 Countries. When the user selects a country they are provided with 3 distinct information sources (Country Information, Recent Tourism Articles and Pictures of the Country).

- City Search: Selecting "Cities" allows the user to explore what the destination has to offer. The user selects the Country they are interested in visiting and then types in a City. Once they have completed this step they can select an attraction (Hotels, Museums or Restaurants) by pressing the associated button. The Map then populates the chosen attraction for that City. The user can change City by pressing the "Change City" button. The City autocomplete is restored to placeholder text and the user can either choose a new Country and City or a different City in the previously selected Country.

- Carbon Footprint Calculator: In recent times, Travellers have become increasingly aware of the environmental effects of Aviation. To address this, the user can utilise a Carbon Footprint Calculator which is embedded on the site. When viewing on a Mobile Device the user is presented with explanatory text and a link to visit a Third-Party site to complete this step.

## Features left to implement:

This website has numerous further development options, which can be scoped for future releases.<br>

- Additional Countries can be added to the Countries and Cities sections. In theory "European Breaks" could be repurposed as "Global Breaks".

- Weather Forecast: Upcoming weather data for the chosen City can be integrated to assist the user in making "last-minute" trip decisions.

- Booking Options: Integration with a Third Party Travel partner API can be implemented to allow the user to have a full booking experience on the site.

# Technologies Used

This website is constructed using Visual Studio Code. The programming languages utilised are HTML, CSS and Javascript (complemeted with jQuery and Bootstrap). Various APIs are also utilised and are listed in the Credits section.

# Testing

Extensive UAT (User Acceptance Testing) has been conducted and is stored in the document section of this Github Repository. .<br>

# Deployment

The site is available [here.](https://david-connaughton.github.io/Travel-Website/)

# Credits

<ins>Content & Acknowledgments:</ins><br>

- The Navbar is a customised version of the Navbar example [here.](https://bootswatch.com/3/simplex/)
- The Cover image section is inspired by [this](https://www.w3schools.com/howto/howto_css_hero_image.asp) tutorial.
- The Countries section utilises [Rest Countries, ](https://restcountries.eu/) [New York Times ](https://developer.nytimes.com/docs/articlesearch-product/1/overview) and [Pixabay](https://pixabay.com/api/docs/) APIs.
- The Cities and Map section utilises the Google Maps and Places library API. I sought inspiration from the [Hotel Search](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch) example and both customized and expanded on the code example for further features and countries.

* The Carbon Footprint section contains an embedded calculator from [this](https://www.carbonfootprint.com/) site.

- All API keys are free and non-proprietary. My Google Maps API key is protected and limited to usage on this site.
