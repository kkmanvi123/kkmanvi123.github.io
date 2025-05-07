// Toggle between dark and light themes
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    // Change the button icon
    if (document.body.classList.contains('light-theme')) {
        themeToggleBtn.innerText = '🌞'; // Sun icon for light mode
    } else {
        themeToggleBtn.innerText = '🌙'; // Moon icon for dark mode
    }
});
