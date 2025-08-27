import "./App.css";
import cloud from "./imgs/icons8-cloud-100.png";
import cairo from "./imgs/cairo.jpg";
import russia from "./imgs/russia.jpg";
import london from "./imgs/london.jpg";
import paris from "./imgs/paris.jpg";
import berlin from "./imgs/berlin.jpg";
import madrid from "./imgs/madrid.jpg";
import newyork from "./imgs/newyork.jpg";
import tokyo from "./imgs/tokyo.jpg";
import sydney from "./imgs/sydney.jpg";
import { useEffect, useState } from "react";
import SelectDemo from "./SelectDemo.jsx";
import moment from "moment";
import { fetchWeatherByCity } from "./features/weather/weatherSlice";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const isLoading = useSelector((state) => state.weather.isLoading);
  const weather = useSelector((state) => state.weather.weather);
  const dispatch = useDispatch();
  const cities = [
    {
      name: "Cairo",
      lat: 30.06263,
      lon: 31.24967,
      backgroundImg: cairo,
    },
    {
      name: "Russia",
      lat: 55.7558,
      lon: 37.6173,
      backgroundImg: russia,
    },
    {
      name: "London",
      lat: 51.5074,
      lon: -0.1278,
      backgroundImg: london,
    },
    {
      name: "Paris",
      lat: 48.8566,
      lon: 2.3522,
      backgroundImg: paris,
    },
    {
      name: "Berlin",
      lat: 52.52,
      lon: 13.405,
      backgroundImg: berlin,
    },
    {
      name: "Madrid",
      lat: 40.4168,
      lon: -3.7038,
      backgroundImg: madrid,
    },
    {
      name: "New York",
      lat: 40.7128,
      lon: -74.006,
      backgroundImg: newyork,
    },
    {
      name: "Tokyo",
      lat: 35.6762,
      lon: 139.6503,
      backgroundImg: tokyo,
    },
    {
      name: "Sydney",
      lat: -33.8688,
      lon: 151.2093,
      backgroundImg: sydney,
    },
  ];
  const [date, setDate] = useState("");
  const [currentCity, setCurrentCity] = useState({
    name: cities[0].name,
    lat: cities[0].lat,
    lon: cities[0].lon,
    backgroundImg: cities[0].backgroundImg,
  });
  function handleCityChange(value) {
    const selectedCity = JSON.parse(value);
    setCurrentCity({
      name: selectedCity.name,
      lat: selectedCity.lat,
      lon: selectedCity.lon,
      backgroundImg: selectedCity.backgroundImg,
    });
  }

  useEffect(() => {
    setDate(moment().format("MMMM Do YYYY"));
    const controller = new AbortController();
    dispatch(fetchWeatherByCity(currentCity));

    // axios
    //   .get(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${String(
    //       currentCity.lat
    //     )}&lon=${String(
    //       currentCity.lon
    //     )}&appid=b9901d6120bd2a09768adc284904761f`
    //   )
    //   .then((response) => {
    //     const weatherData = response.data;
    //     setWeather({
    //       ...weather,
    //       city: weatherData.name,
    //       temperature: Math.round(weatherData.main.temp - 272.15),
    //       temperatureMin: Math.round(weatherData.main.temp_min - 272.15),
    //       temperatureMax: Math.round(weatherData.main.temp_max - 272.15),
    //       description: weatherData.weather[0].description,
    //       icon: weatherData.weather[0].icon,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching weather data:", error);
    //   });
    return () => {
      controller.abort();
    };
  }, [currentCity]);
  return (
    <div
      className="weather-box h-screen bg-cover bg-center text-white transition-all duration-500"
      style={{ backgroundImage: `url(${currentCity.backgroundImg})` }}
    >
      <div className="container m-auto relative z-10 rounded-2xl lg:w-2/5 p-2">
        <div className="header flex items-center flex-wrap gap-2.5 p-2">
          <h1 className="text-4xl font-bold">{currentCity.name}</h1>
          <SelectDemo cities={cities} handleCityChange={handleCityChange} />
          <span className="w-full self-end text-[#ddd]">{date}</span>
        </div>
        <hr />
        <div className="temperature flex items-center justify-center gap-8 p-2">
          <div className="content">
            <div className="flex items-center">
              <h2 className="sm:text-7xl text-5xl">
                {isLoading ? (
                  <CircularProgress
                    disableShrink
                    style={{ color: "#50a2ff" }}
                  />
                ) : (
                  weather.tempreture
                )}
                °
              </h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather icon"
              />
            </div>
            <span className="text-[#ddd]">{weather.description}</span>
            <p className="pt-2">
              Min : {weather.tempretureMin} | Max : {weather.tempretureMax}
            </p>
          </div>
          <img src={cloud} alt="weather icon" className="w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default App;
