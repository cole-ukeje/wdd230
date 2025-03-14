document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if dark mode is already enabled (using localStorage)
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        // Save the state in localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent += document.lastModified;
