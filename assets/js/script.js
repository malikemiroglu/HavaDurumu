const url = "https://api.openweathermap.org/data/2.5";
const apiKey = "f11291ffa7a42a692e61be71a64f9530";

const getWeather = async (city) => {
    let query = `${url}/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
    try {
        const response = await fetch(query);
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Hatalı Arama",
            text: "Lütfen geçerli bir şehir giriniz.",
        });
        console.error('Hata oluştu:', error);
    }
}

const displayResults = (result) => {
    let city = document.querySelector(".city");
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector(".desc");
    desc.innerHTML = `${result.weather[0].description}`;

    let minmax = document.querySelector(".minmax");
    minmax.innerHTML = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;
};

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getWeather(searchBar.value);
    }
});