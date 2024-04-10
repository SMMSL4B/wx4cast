async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;

    if (!cityInput) {
        alert('Please enter a city name');
        return;
    }

    const response = await fetch(`/weather?city=${cityInput}`);
    const data = await response.json();

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p>Temperature: ${data.main.temp}°C</p>
                               <p>Weather: ${data.weather[0].description}</p>`;
}

