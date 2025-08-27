import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchByCity",
  async (city) => {
    const response = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${String(
          city.lat
        )}&lon=${String(city.lon)}&appid=b9901d6120bd2a09768adc284904761f`
      )
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    const tempreture = Math.round(response.data.main.temp - 273.15);
    const tempretureMin = Math.round(response.data.main.temp_min - 273.15);
    const tempretureMax = Math.round(response.data.main.temp_max - 273.15);
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;
    return { tempreture, tempretureMin, tempretureMax, description, icon };
  }
);

const initialState = {
  isLoading: false,
  weather: {},
};
export const weatherSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function

export default weatherSlice.reducer;
