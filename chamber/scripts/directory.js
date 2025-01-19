document.addEventListener("DOMContentLoaded", () => {
    // Display the current year in the footer
    const yearElement = document.querySelector("#year");
    const currentYear = new Date().getFullYear();
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Display the last modification date
    const lastModifiedElement = document.querySelector("#last-modified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // Hamburger menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Toggle between grid and list views
    const gridButton = document.querySelector("#grid-view");
    const listButton = document.querySelector("#list-view");
    const directory = document.querySelector(".directory");

    if (gridButton && listButton && directory) {
        gridButton.addEventListener("click", () => {
            directory.classList.remove("list-layout");
            directory.classList.add("grid-layout");
        });

        listButton.addEventListener("click", () => {
            directory.classList.remove("grid-layout");
            directory.classList.add("list-layout");
        });
    }

    // Fetch the JSON file
    const membersUrl = './chamber/data/members.json';  // Path to your JSON file

    async function fetchMembers() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) throw new Error('Unable to fetch members data');
            const members = await response.json();

            // Get the container to display the business cards
            const container = document.getElementById("business-cards-container");

            // Clear the container before adding new cards
            container.innerHTML = "";

            // Loop through each member and create a business card
            members.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("business-card");

                // Populate the card with member details
                card.innerHTML = `
                    <img src="./chamber/images/${member.image}" alt="${member.name} logo">
                    <h4>${member.name}</h4>
                    <p>${member.tagline}</p>
                    <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membership === 1 ? "Member" : member.membership === 2 ? "Silver" : "Gold"}</p>
                `;

                // Append the card to the container
                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading members:', error);
        }
    }

    // Fetch members when the page loads
    fetchMembers();
});

// Dynamicly display weather info
const apiKey = "ccc40f172c1d984a2c5ada7b91217041";
const city = "Dolisie";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Weather data not found");
        const data = await response.json();

        // Extract weather data
        const temperature = data.main.temp; // Current temperature
        const condition = data.weather[0].description; // Weather condition
        const humidity = data.main.humidity; // Humidity percentage

        // Update HTML with fetched data
        document.getElementById("temperature").textContent = `Temperature: ${temperature}°F`;
        document.getElementById("condition").textContent = `Condition: ${condition}`;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchWeather);

// Weather forecast
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastApiUrl);
        if (!response.ok) throw new Error("Forecast data not found");
        const data = await response.json();

        // Get the forecast container
        const forecastContainer = document.getElementById("forecast-container");

        // Clear any existing content
        forecastContainer.innerHTML = "";

        // Extract and display forecast for the next 3 days (8 intervals per day)
        const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

        dailyForecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString("en-US", { weekday: "long" });
            const temp = forecast.main.temp;
            const condition = forecast.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

            // Create a forecast card
            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");

            forecastCard.innerHTML = `
                <h4>${day}</h4>
                <img src="${icon}" alt="${condition}">
                <p>${condition}</p>
                <p>Temp: ${temp}°F</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchWeatherForecast);

