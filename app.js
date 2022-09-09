window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let temperatureDescription = document.querySelector(
        ".temperature-description"
      );
      let temperatureDegree = document.querySelector(".temperature-degree");
      let locationTemezone = document.querySelector(".location-timezone");
      let temperatureSection = document.querySelector(".temperature");
      let temperatureSpan = document.querySelector(".temperature span");

      // using api from openweathermap.org
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=13ab6440540ca02b0e392d739edb785d&units=imperial`;

      // "fetching api to do something with its data"
      fetch(api)
        // convert to json file
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;

          // set DOM elements from the API
          temperatureDegree.textContent = temp;
          locationTemezone.textContent = data.name;
          temperatureDescription.textContent = data.weather[0].description;

          //define icons from API, adapt icons to openWeatherMap site data
          function defineIcons(skyconsImage) {
            let weatherCondition = data.weather[0].description;

            if (weatherCondition == "few clouds" && timeAndDate() < 6) {
              skyconsImage = Skycons.PARTLY_CLOUDY_NIGHT;
            } else if (weatherCondition == "few clouds" && timeAndDate() >= 6) {
              skyconsImage = Skycons.PARTLY_CLOUDY_DAY;
            } else if (weatherCondition == "clear sky" && timeAndDate() < 6) {
              skyconsImage = Skycons.CLEAR_NIGHT;
            } else if (weatherCondition == "clear sky" && timeAndDate() >= 6) {
              skyconsImage = Skycons.CLEAR_DAY;
            } else {
              switch (weatherCondition) {
                case "fog":
                  skyconsImage = Skycons.FOG;
                  break;
                case "scattered clouds":
                  skyconsImage = Skycons.CLOUDY;
                  break;
                case "broken clouds":
                  skyconsImage = Skycons.CLOUDY;
                  break;
                case "shower rain":
                  skyconsImage = Skycons.RAIN;
                  break;
                case "rain":
                  skyconsImage = Skycons.RAIN;
                  break;
                case "thunderstorm":
                  skyconsImage = Skycons.SNOW;
                  break;
                case "snow":
                  skyconsImage = Skycons.SNOW;
                  break;
              }
            }

            return skyconsImage;
          }

          //set icons
          function setIcons() {
            let skycons = new Skycons({ color: "white" });
            skycons.add("icon1", defineIcons());
            skycons.play();
          }
          setIcons();

          // current time and date

          function timeAndDate() {
            let date = new Date();
            let hour = date.getHours();
            return hour;
          }

          // !!!!

          // change temperature to Farenheit/Celsius

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
            } else {
              temperatureSpan.textContent = "F";
            }

            // !!!!
          });
        });
    });
  }
});
