//hamburger function
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('open');
    nav.classList.toggle('show');
});


   // localStorage visit tracker
   function displayVisitMessage() {
    // Get current timestamp
    const currentDate = Date.now();
    
    // Get stored date from localStorage, if it exists
    const lastVisit = localStorage.getItem('lastVisit');
    const visitsElement = document.getElementById('visits');
    
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


// footer date information
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentYearElement = document.getElementById("currentYear");
currentYearElement.textContent = currentYear;

let date = document.lastModified;
document.getElementById("lastModified").innerHTML = "Last modified: " + date;


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
    monthPicker.addEventListener('click', () => {
        monthList.classList.toggle('show');
    });
    
    // Event listeners for year navigation
    preYear.addEventListener('click', () => {
        currentYear--;
        yearEl.textContent = currentYear;
        updateCalendar();
    });
    
    nextYear.addEventListener('click', () => {
        currentYear++;
        yearEl.textContent = currentYear;
        updateCalendar();
    });
    
    // Initialize the calendar
    generateMonthList();
    updateCalendar();
    updateDateTime();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
});

// Timestamp value
window.onload = function () {
    document.getElementById("timestamp").value = new Date().toLocaleString();
};

// Open Modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}


// directory cards
document.addEventListener('DOMContentLoaded', fetchMembers);

async function fetchMembers() {
    try {
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

document.getElementById('grid').addEventListener('click', () => toggleView('grid'));
document.getElementById('list').addEventListener('click', () => toggleView('list'));

function toggleView(view) {
    const memberContainer = document.getElementById('member-container');
    if (view === 'grid') {
        memberContainer.classList.remove('list-view');
        memberContainer.classList.add('grid-view');
    } else {
        memberContainer.classList.remove('grid-view');
        memberContainer.classList.add('list-view');
    }
}
