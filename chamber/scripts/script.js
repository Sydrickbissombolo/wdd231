// Display the last modified date
const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;



const apiKey = 'eac1da47236a8fe587a56e2522f38bd7';
const city = 'Brazzaville';
async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const weatherInfo = `
      <p>Current Temperature: ${data.list[0].main.temp}°C</p>
      <p>Description: ${data.list[0].weather[0].description}</p>
      <h3>3-Day Forecast:</h3>
      <ul>
        <li>${data.list[8].main.temp}°C - ${data.list[8].weather[0].description}</li>
        <li>${data.list[16].main.temp}°C - ${data.list[16].weather[0].description}</li>
        <li>${data.list[24].main.temp}°C - ${data.list[24].weather[0].description}</li>
      </ul>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

fetchWeather();

// DIsplay members
const memberUrl = './chamber/data/members.json';

async function loadSpotlights() {
  try {
    const response = await fetch(memberUrl);
    if (!response.ok) {
      throw new Error(`HTTP error!`);
    }
    const members = await response.json();

    // Filter for gold and silver members
    const spotlightMembers = members.filter(member =>
      ['gold', 'silver'].includes(member.membershipLevel.toLowerCase())
    );
    

    // Randomly select 2 members
    const shuffled = spotlightMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3);

    // Generate spotlight cards
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = selectedMembers
      .map(
        member => `
        <div class="spotlight-card">
          <img src="${member.logo}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}">${member.website}</a>
          <p>Membership Level: ${member.membershipLevel}</p>
        </div>
      `
      )
      .join('');
  } catch (error) {
    console.error('Error fetching members data:', error);
  }
}


// Load spotlights on page load
document.addEventListener('DOMContentLoaded', loadSpotlights);


// Toggle the hamburger menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

