// Hamburger function
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('open');
        nav.classList.toggle('show');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner');
    const closeBtn = document.querySelector('.close-banner');

    if (banner && closeBtn) {
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

        // Show banner on Mon (1), Tue (2), or Wed (3)
        if (today >= 1 && today <= 3) {
            banner.classList.remove('hidden');
        }

        closeBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
        });
    }
});

// Highlight active navigation link
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-menu a");
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });
});

// Weather function
// API Key and URLs
const apiKey = '0a7d947a4641774bc9562c026c366437';
const city = 'Lagos';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// Fetch current weather data
async function fetchWeather() {
    try {
        const currentTempElement = document.getElementById('current-temp');
        const currentConditionElement = document.getElementById('current-condition');
        
        if (!currentTempElement || !currentConditionElement) {
            return; // Exit if elements don't exist on this page
        }
        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const currentTemp = weatherData.main.temp;
        const currentCondition = weatherData.weather[0].description;

        // Update the current weather elements
        currentTempElement.innerText = `Temperature: ${currentTemp} °C`;
        currentConditionElement.innerText = `Condition: ${currentCondition}`;

        // Fetch the weather forecast data
        fetchForecast();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fetch forecast data
async function fetchForecast() {
    try {
        const forecastList = document.getElementById('forecast');
        
        if (!forecastList) {
            return; // Exit if element doesn't exist
        }
        
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        forecastList.innerHTML = ''; // Clear previous data

        // Extract forecast for the next 3 days (every 8th entry represents 24 hours)
        for (let i = 1; i <= 3; i++) { // Start at 1 because [0] is current day
            const dayData = forecastData.list[i * 8]; // Every 8th entry is a new day (3-hour intervals)
            const date = new Date(dayData.dt * 1000).toLocaleDateString();
            const temp = dayData.main.temp;

            const listItem = document.createElement('li');
            listItem.innerText = `${date}: ${temp} °C`;
            forecastList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// Call the function to display weather data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('current-temp') && document.getElementById('forecast')) {
        fetchWeather();
    }
});

// localStorage visit tracker
function displayVisitMessage() {
    const visitsElement = document.getElementById('visits');
    
    if (!visitsElement) {
        return; // Exit if element doesn't exist
    }
    
    // Get current timestamp
    const currentDate = Date.now();
    
    // Get stored date from localStorage, if it exists
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (!lastVisit) {
        // First visit
        visitsElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate difference in days
        const difference = currentDate - lastVisit;
        const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            // Less than a day
            visitsElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly one day
            visitsElement.textContent = "You last visited 1 day ago.";
        } else {
            // More than one day
            visitsElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Store current visit date
    localStorage.setItem('lastVisit', currentDate);
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayVisitMessage();
});

// Footer date information
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById("currentYear");
    const lastModifiedElement = document.getElementById("lastModified");
    
    if (currentYearElement) {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    if (lastModifiedElement) {
        let date = document.lastModified;
        lastModifiedElement.innerHTML = "Last modified: " + date;
    }
});

// Calendar functionality script
document.addEventListener('DOMContentLoaded', function() {
    // Get HTML elements
    const monthPicker = document.getElementById('month-picker');
    const yearEl = document.getElementById('year');
    const preYear = document.getElementById('pre-year');
    const nextYear = document.getElementById('next-year');
    const calendarDays = document.querySelector('.calendar-days');
    const monthList = document.querySelector('.month-list');
    const timeFormate = document.querySelector('.time-formate');
    const dateFormate = document.querySelector('.date-formate');
    
    // Check if calendar elements exist on this page
    if (!monthPicker || !yearEl || !calendarDays) {
        return; // Exit if calendar is not on this page
    }
    
    // Month names array
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Initialize
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    
    // Function to update the calendar
    function updateCalendar() {
        // Update month and year in header
        monthPicker.textContent = months[currentMonth];
        yearEl.textContent = currentYear;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get days of current month
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
        let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        
        // Add blank spaces for days before first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const blankDiv = document.createElement('div');
            calendarDays.appendChild(blankDiv);
        }
        
        // Add days of the month
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            
            // Highlight current day if calendar is showing current month and year
            if (currentMonth === today.getMonth() && 
                currentYear === today.getFullYear() && 
                i === today.getDate()) {
                dayDiv.classList.add('current-day');
            }
            
            calendarDays.appendChild(dayDiv);
        }
    }
    
    // Function to update date and time
    function updateDateTime() {
        if (!timeFormate || !dateFormate) return;
        
        const now = new Date();
        
        // Update time (HH:MM:SS format)
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeFormate.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Update date (DD - Month - YYYY format)
        const day = now.getDate().toString().padStart(2, '0');
        const month = months[now.getMonth()].toLowerCase();
        const year = now.getFullYear();
        dateFormate.textContent = `${day} - ${month} - ${year}`;
    }
    
    // Generate month list for the dropdown
    function generateMonthList() {
        if (!monthList) return;
        
        monthList.innerHTML = '';
        
        months.forEach((month, index) => {
            const monthItem = document.createElement('div');
            monthItem.textContent = month;
            monthItem.dataset.month = index;
            
            monthItem.addEventListener('click', () => {
                currentMonth = parseInt(monthItem.dataset.month);
                updateCalendar();
                monthList.classList.remove('show');
            });
            
            monthList.appendChild(monthItem);
        });
    }
    
    // Event listener for month picker
    if (monthPicker && monthList) {
        monthPicker.addEventListener('click', () => {
            monthList.classList.toggle('show');
        });
    }
    
    // Event listeners for year navigation
    if (preYear) {
        preYear.addEventListener('click', () => {
            currentYear--;
            yearEl.textContent = currentYear;
            updateCalendar();
        });
    }
    
    if (nextYear) {
        nextYear.addEventListener('click', () => {
            currentYear++;
            yearEl.textContent = currentYear;
            updateCalendar();
        });
    }
    
    // Initialize the calendar
    generateMonthList();
    updateCalendar();
    updateDateTime();
    
    // Update time every second
    if (timeFormate || dateFormate) {
        setInterval(updateDateTime, 1000);
    }
});

// Timestamp value
window.onload = function() {
    const timestampElement = document.getElementById("timestamp");
    if (timestampElement) {
        timestampElement.value = new Date().toLocaleString();
    }
};

// Open Modal
function openModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        modalElement.style.display = "block";
    }
}

// Close Modal
function closeModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        modalElement.style.display = "none";
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Directory cards
document.addEventListener('DOMContentLoaded', function() {
    const memberContainer = document.getElementById('member-container');
    if (memberContainer) {
        fetchMembers();
    }
});

async function fetchMembers() {
    try {
        const memberContainer = document.getElementById('member-container');
        if (!memberContainer) return;
        
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching the member data:', error);
    }
}

function displayMembers(members) {
    const memberContainer = document.getElementById('member-container');
    if (!memberContainer) return;
    
    memberContainer.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <img src="${member.imageFileName}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phoneNumber}</p>
            <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a>
        `;
        memberContainer.appendChild(memberCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');
    
    if (gridButton) {
        gridButton.addEventListener('click', () => toggleView('grid'));
    }
    
    if (listButton) {
        listButton.addEventListener('click', () => toggleView('list'));
    }
});

function toggleView(view) {
    const memberContainer = document.getElementById('member-container');
    if (!memberContainer) return;
    
    if (view === 'grid') {
        memberContainer.classList.remove('list-view');
        memberContainer.classList.add('grid-view');
    } else {
        memberContainer.classList.remove('grid-view');
        memberContainer.classList.add('list-view');
    }
}

// Fetch the Gold members information from the JSON file
async function fetchGoldMembers() {
    try {
        const container = document.getElementById('bussiness-spotlight');
        if (!container) return;
        
        const response = await fetch('data/members.json'); // Path to your JSON file
        const data = await response.json();
        const members = data.members;

        // Filter only members with membershipLevel of Gold
        const goldMembers = members.filter(member => member.membershipLevel === "Gold");

        // Display only Gold level members
        displayGoldMembers(goldMembers);
    } catch (error) {
        console.error('Error fetching members data:', error);
    }
}

// Function to display the gold members as business cards
function displayGoldMembers(members) {
    const container = document.getElementById('bussiness-spotlight');
    if (!container) return;

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="image-placeholder"><img src="${member.imageFileName}" alt="${member.name}"></div>
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phoneNumber}</p>
            <p><strong>URL:</strong> ${member.websiteUrl}</p>
        `;

        container.appendChild(card);
    });
}

// Call the fetchGoldMembers function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const businessSpotlight = document.getElementById('bussiness-spotlight');
    if (businessSpotlight) {
        fetchGoldMembers();
    }
});

// Highlight active navigation link for directory, discover, and join pages
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-menu a");
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });
});