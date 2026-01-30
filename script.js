const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const error = document.getElementById("error");

const API_KEY = "50a725c8b3f6417ab0c91255263001";

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = cityInput.value.trim();
  error.textContent = "";
  result.style.display = "none";

  if (city === "") {
    error.textContent = "Please enter a city name!";
    return;
  }

  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("temp").textContent =
      `${data.current.temp_c}°C`;

    document.getElementById("location").textContent =
      `📍 ${data.location.name}, ${data.location.country}`;

    document.getElementById("condition").textContent =
      `🌥️ ${data.current.condition.text}`;

    document.getElementById("wind").textContent =
      `💨 Wind: ${data.current.wind_kph} km/h`;

    result.style.display = "block";

  } catch {
    error.textContent = "City not found ❌";
  }

  loading.style.display = "none";
}
