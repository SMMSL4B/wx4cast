https://wx4cast.smmslab.com

# wx4cast - Weather Adviser Web Application

wx4cast is a web application that provides personalized clothing advice based on weather conditions. Input a city and country to get real-time weather information and dressing recommendations. Built using Node.js, Express.js, HTML/CSS/JavaScript, and integrates with OpenWeatherMap API for weather data and Unsplash API for background images.

## Features

- Input a city and country to retrieve current weather information.
- Receive personalized clothing advice based on the weather conditions (temperature).
- Dynamically updates background image based on the city searched.
- Responsive and user-friendly interface.

## Technologies Used

- Node.js
- Express.js
- HTML/CSS/JavaScript
- OpenWeatherMap API for weather data
- Unsplash API for background images
- `node-fetch` for making HTTP requests

## Installation

To run the Weather Adviser locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/SMMSL4B/wx4cast.git
   cd wx4cast


Install dependencies:
  npm install

Set up environment variables:
Create a .env file in the project root.
Add your OpenWeatherMap API key and Unsplash API key:

 OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
 UNSPLASH_API_KEY=your_unsplash_api_key

Start the application:
  npm start

Open the application in your browser:
Navigate to http://localhost:3000 in your web browser.

Usage

Enter a city and country into the input fields.
Click on "Get Weather" to retrieve weather information and clothing advice.
View the displayed weather information and advice.
