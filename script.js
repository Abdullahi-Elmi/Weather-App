let weather = {
    "apiKey": "7fc2111d4c12c883d90e63adb07778d6",
    lat: null,
    lon: null,
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q="
            + city 
            + "&limit=1&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => {
            this.lat = data[0].lat;
            this.lon = data[0].lon;
            const{ name } = data[0];
            document.querySelector(".city").innerHTML = `Weather in ${name}`;
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}&per_page=10&order_by=popular')`;
            this.fetchWeatherData(); // call fetchWeather after lat and lon have been updated
        });
    },
    fetchWeatherData: function(){   // fetch the actual weather data after fetching the coordinates
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            // const{ name } = data;
            const{ icon, description } = data.weather[0];
            const{ temp, humidity } = data.main;
            const{ speed } = data.wind;
            // console.log(name, icon, description, temp, humidity, speed);
            // document.querySelector(".city").innerHTML = `Weather in ${name}`;
            document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            document.querySelector(".temp").innerHTML = `${temp}°C`;
            document.querySelector(".description").innerHTML = `${description}`;
            document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
            document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} km/h`;
        });
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Manhattan");