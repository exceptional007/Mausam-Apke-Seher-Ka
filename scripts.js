
document.addEventListener('DOMContentLoaded', () => {
   const cityInput = document.getElementById("city-input")
   const getWeatherBtn = document.getElementById("get-weather-btn")
   const weatherInfo = document.getElementById("weather-info")
   const cityNameDisplay = document.getElementById("city-name")
   const temperatureDisplay = document.getElementById("temperature")
   const descriptionDisplay = document.getElementById("description")
   const errorMessage = document.getElementById("error-message")
    
   getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim()
    
    if (!city) {
        return alert('Enter Seher')
    }
    
    // it may throw an error
    // server/ DB is always in another continent

    try {
        const weatherData = await fetchWeatherData(city)
        displayWeatherData(weatherData)
    } catch (error) {
        console.log(error);
        
        showError()
    }
    
   })

    async function fetchWeatherData(city) {
    
        // gets the data

        const url = `/api/weather?city=${encodeURIComponent(city)}`;
        const response = await fetch(url)
        console.log(typeof response);
        console.log("Response", response);

        if (!response.ok) {
            throw new Error("City Not Found !");  
        }
        const data = await response.json()
        return data
   }

   function displayWeatherData(data) {

        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        let temperature = main.temp - 273.15;
        temperature = parseFloat(temperature.toFixed(2));
        temperatureDisplay.textContent = `Temperature : ${temperature}\u2103`;
        let weatherDesc = weather[0].description;
        weatherDesc = weatherDesc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        descriptionDisplay.textContent = `Weather : ${weatherDesc}`;
    

        // unlock the display

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        
   }

   function showError() {
    weatherInfo.classList.add("hidden")
    errorMessage.classList.remove("hidden")
   }
})