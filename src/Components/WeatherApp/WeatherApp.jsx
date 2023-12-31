// import React, { useState, useEffect } from "react";
// import "./WeatherApp.css";

// import search_icon from "../Assests/search.png";
// import clear_icon from "../Assests/clear.png";
// import cloud_icon from "../Assests/cloud.png";
// import drizzle_icon from "../Assests/drizzle.png";
// import rain_icon from "../Assests/rain.png";
// import snow_icon from "../Assests/snow.png";
// import wind_icon from "../Assests/wind.png";
// import humidity_icon from "../Assests/humidity.png";

// const WeatherApp = () => {
//   let api_key = "d37511fe963342f26b312afc2c9868ee";
//   const [wicon, setWicon] = useState(cloud_icon);
//   const [searchTerm, setSearchTerm] = useState("London");
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     const search = async () => {
//       if (!searchTerm) {
//         return;
//       }

//       let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=Metric&appid=${api_key}`;

//       try {
//         let response = await fetch(url);
//         let data = await response.json();

//         setWeatherData(data);

//         const humidity = document.getElementsByClassName("humidity-percent");
//         const wind = document.getElementsByClassName("wind-rate");
//         const temperature = document.getElementsByClassName("weather-temp");
//         const location = document.getElementsByClassName("weather-location");

//         humidity[0].innerHTML = data.main.humidity + "%";
//         wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
//         temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
//         location[0].innerHTML = data.name;

//         if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
//           setWicon(clear_icon);
//         } else if (
//           data.weather[0].icon === "02d" ||
//           data.weather[0].icon === "02n"
//         ) {
//           setWicon(cloud_icon);
//         } else if (
//           data.weather[0].icon === "03d" ||
//           data.weather[0].icon === "03n"
//         ) {
//           setWicon(drizzle_icon);
//         } else if (
//           data.weather[0].icon === "04d" ||
//           data.weather[0].icon === "04n"
//         ) {
//           setWicon(drizzle_icon);
//         } else if (
//           data.weather[0].icon === "09d" ||
//           data.weather[0].icon === "09n"
//         ) {
//           setWicon(rain_icon);
//         } else if (
//           data.weather[0].icon === "10d" ||
//           data.weather[0].icon === "10n"
//         ) {
//           setWicon(rain_icon);
//         } else if (
//           data.weather[0].icon === "13d" ||
//           data.weather[0].icon === "13n"
//         ) {
//           setWicon(snow_icon);
//         } else {
//           setWicon(clear_icon);
//         }
//       } catch (error) {
//         console.error("Error fetching weather data", error);
//       }
//     };

//     search();
//   }, [searchTerm]);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="container">
//       <div className="top-bar">
//         <input
//           type="text"
//           className="cityInput"
//           placeholder="search"
//           onChange={handleInputChange}
//         />
//         <div
//           className="search-icon"
//           onClick={() => {
//             setSearchTerm(document.querySelector(".cityInput").value);
//           }}
//         >
//           <img src={search_icon} alt="" />
//         </div>
//       </div>
//       <div className="weather-image">
//         <img src={wicon} alt="" />
//       </div>
//       {weatherData && weatherData.main && (
//         <>
//           <div className="weather-temp">
//             {Math.floor(weatherData.main.temp)} °C
//           </div>
//           <div className="weather-location">{weatherData.name}</div>
//           <div className="data-container">
//             <div className="element">
//               <img src={humidity_icon} alt="" />
//               <div className="data">
//                 <div className="humidity-percent">
//                   {weatherData.main.humidity}%
//                 </div>
//                 <div className="text">humidity</div>
//               </div>
//             </div>
//             <div className="element">
//               <img src={wind_icon} alt="" />
//               <div className="data">
//                 <div className="wind-rate">
//                   {Math.floor(weatherData.wind.speed)}km/h
//                 </div>
//                 <div className="text">wind speed</div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default WeatherApp;

import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";

const WeatherApp = () => {
  let api_key = "d37511fe963342f26b312afc2c9868ee";
  const [wicon, setWicon] = useState(cloud_icon);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const search = async () => {
      let url;

      // Check if a search term is provided
      if (searchTerm) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=Metric&appid=${api_key}`;
      } else {
        // If no search term, use geolocation
        if (window.navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;
              fetchWeather(url);
              // Store geolocation in local storage
              localStorage.setItem(
                "userGeolocation",
                JSON.stringify({ latitude, longitude })
              );
            },
            (err) => {
              console.error("Error getting location", err);
            }
          );
        }
      }

      if (url) {
        fetchWeather(url);
      }
    };

    const fetchWeather = async (url) => {
      try {
        let response = await fetch(url);
        let data = await response.json();

        setWeatherData(data);

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setWicon(clear_icon);
        } else if (
          data.weather[0].icon === "02d" ||
          data.weather[0].icon === "02n"
        ) {
          setWicon(cloud_icon);
        } else if (
          data.weather[0].icon === "03d" ||
          data.weather[0].icon === "03n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "04d" ||
          data.weather[0].icon === "04n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "09d" ||
          data.weather[0].icon === "09n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "10d" ||
          data.weather[0].icon === "10n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "13d" ||
          data.weather[0].icon === "13n"
        ) {
          setWicon(snow_icon);
        } else {
          setWicon(clear_icon);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    search();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search"
          onChange={handleInputChange}
        />
        <div
          className="search-icon"
          onClick={() => {
            setSearchTerm(document.querySelector(".cityInput").value);
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      {weatherData && weatherData.main && (
        <>
          <div className="weather-temp">
            {Math.floor(weatherData.main.temp)} °C
          </div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" />
              <div className="data">
                <div className="wind-rate">
                  {Math.floor(weatherData.wind.speed)}km/h
                </div>
                <div className="text">wind speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
