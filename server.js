const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SMMSLAB Weather App</title>
        <style>
          @font-face {
            font-family: 'Rubik Scribble';
            src: url('/fonts/RubikScribble-Regular.ttf') format('truetype');
          }

          body {
            font-family: 'Roboto', sans-serif;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-size: cover;
            background-position: center;
            background-image: url('/placeholder.jpeg'); /* Placeholder image */
          }
          h1 {
            color: #fff;
            padding-bottom: 10px;
            margin: 0;
            display: inline-block;
            font-family: 'Rubik Scribble', sans-serif; /* Use Rubik Scribble font */
          }
          p {
            font-style: italic;
            color: #fff;
          }
          form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
            width: 300px;
          }
          label {
            display: block;
            margin: 10px 0;
            color: #555;
          }
          input {
            width: 100%;
            padding: 8px;
            margin-bottom: 20px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          #result {
            margin-top: 20px;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
          }
          p {
            margin: 10px 0;
            color: #333;
          }
        </style>
        <script>
          async function getWeather() {
            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;
            
            if (!city || !country) {
              alert('Please enter both city and country.');
              return;
            }

            try {
              const response = await fetch('/weather?city=' + encodeURIComponent(city) + '&country=' + encodeURIComponent(country));
              const data = await response.json();

              const resultDiv = document.getElementById('result');
              resultDiv.innerHTML = '';

              const weatherInfo = document.createElement('p');
              weatherInfo.textContent = 'Temperature: ' + data.weather.temperature + '°C, Description: ' + data.weather.description;
              resultDiv.appendChild(weatherInfo);

              const adviceInfo = document.createElement('p');
              adviceInfo.textContent = 'Advice: ' + data.advice;
              resultDiv.appendChild(adviceInfo);

              // Check if the background image is available
              const backgroundImage = data.backgroundImage;
              if (backgroundImage) {
                // Update background image
                document.body.style.backgroundImage = 'url(' + backgroundImage + ')';
              }
            } catch (error) {
              console.error(error);
              alert('An error occurred while fetching weather data.');
            }
          }
        </script>
      </head>
      <body>
        <h1>SMMSLAB Weather App!</h1>
        <form onsubmit="event.preventDefault(); getWeather();">
          <label for="city">Enter city:</label>
          <input type="text" id="city" name="city" required>
          <br>
          <label for="country">Enter country:</label>
          <input type="text" id="country" name="country" required>
          <br>
          <button type="submit">Get Weather</button>
        </form>
        <div id="result"></div>
      </body>
    </html>
  `);
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const country = req.query.country;

  if (!city || !country) {
    return res.status(400).json({ error: 'City and country parameters are required' });
  }

  // Get weather data from OpenWeatherMap API
  const apiKey = 'add your api key here';
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric&appid=' + apiKey;

  try {
    const weatherResponse = await fetch(weatherApiUrl);
    const weatherData = await weatherResponse.json();

    let advice = '';
    if (weatherData.main.temp > 20) {
      advice = 'It\'s warm, you can wear light clothing.';
    } else if (weatherData.main.temp > 10) {
      advice = 'It\'s cool, consider wearing a jacket or sweater.';
    } else {
      advice = 'It\'s cold, bundle up with a warm coat.';
    }

    // Get background image from Unsplash based on the city searched
    const unsplashApiKey = 'add your api key here';
    const unsplashApiUrl = 'https://api.unsplash.com/photos/random?query=' + encodeURIComponent(city) + '&client_id=' + unsplashApiKey;

    try {
      const unsplashResponse = await fetch(unsplashApiUrl);
      const unsplashData = await unsplashResponse.json();
      const backgroundImage = unsplashData.urls.full;

      // Cache the image locally (for example, using a caching library or saving to disk)

      const responseData = {
        weather: {
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
        },
        advice,
        backgroundImage,
      };

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(responseData, null, 2));
    } catch (unsplashError) {
      console.error(unsplashError);
      res.status(500).json({ error: 'Error fetching Unsplash data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

