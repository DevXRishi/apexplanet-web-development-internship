// DOM Elements
const myButton = document.getElementById('myButton');
const heroButton = document.getElementById('heroButton');
const messageBox = document.getElementById('messageBox');

// Click counter
let clickCount = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Application loaded successfully');
    initializeNavigation();
});

// Navigation smooth scroll and active state
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set first link as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
}

// Interactive Button - Main CTA
myButton.addEventListener('click', function() {
    clickCount++;
    
    // Show alert
    alert(`🎉 Great! You clicked the button ${clickCount} time(s)!`);
    
    // Update message box
    updateMessageBox();
    
    // Add animation to button
    myButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        myButton.style.transform = 'scale(1)';
    }, 100);
});

// Hero Button
heroButton.addEventListener('click', function() {
    messageBox.classList.remove('hidden');
    messageBox.textContent = '✨ Welcome! Scroll down to explore more features.';
    
    // Scroll to features section
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
});

// Update message box with click info
function updateMessageBox() {
    messageBox.classList.remove('hidden');
    
    const message = clickCount === 1 
        ? '✓ First click recorded! Keep exploring.'
        : clickCount <= 5
        ? `✓ You've clicked ${clickCount} times! Great engagement!`
        : '✓ You are very interactive! Try other features too.';
    
    messageBox.textContent = message;
    
    // Save to localStorage
    localStorage.setItem('buttonClickCount', clickCount);
}

// Load click count from localStorage on page load
window.addEventListener('load', function() {
    const savedCount = localStorage.getItem('buttonClickCount');
    if (savedCount) {
        clickCount = parseInt(savedCount);
        console.log(`✓ Loaded ${clickCount} previous click(s)`);
    }
});

// Button hover effects
myButton.addEventListener('mouseenter', function() {
    console.log('🖱️  Hovering over button');
});

myButton.addEventListener('mouseleave', function() {
    console.log('🖱️  Left button area');
});

// Log console welcome message
console.log('%c Welcome to the Web Application!', 'color: #5b6be8; font-size: 16px; font-weight: bold;');
console.log('%c This page demonstrates HTML, CSS, and JavaScript integration.', 'color: #6b7280; font-size: 12px;');
