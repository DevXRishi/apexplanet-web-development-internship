// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
let autoPlayInterval;
let autoPlayEnabled = true;

// Initialize carousel indicators
function initCarouselIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
}

// Show slide at specific index
function showSlide(index) {
    // Reset index if out of bounds
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });

    // Update indicators
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlideIndex);
    });

    // Update current slide display
    document.getElementById('currentSlide').textContent = `${currentSlideIndex + 1} / ${slides.length}`;
}

// Go to specific slide
function goToSlide(index) {
    showSlide(index);
    resetAutoPlay();
}

// Next slide
function nextSlide() {
    showSlide(currentSlideIndex + 1);
    resetAutoPlay();
}

// Previous slide
function prevSlide() {
    showSlide(currentSlideIndex - 1);
    resetAutoPlay();
}

// Auto play carousel
function startAutoPlay() {
    if (!autoPlayEnabled) return;
    
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

// Stop auto play
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Reset auto play
function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Carousel event listeners
document.getElementById('carouselNext').addEventListener('click', nextSlide);
document.getElementById('carouselPrev').addEventListener('click', prevSlide);

document.getElementById('autoPlayToggle').addEventListener('change', (e) => {
    autoPlayEnabled = e.target.checked;
    if (autoPlayEnabled) {
        startAutoPlay();
    } else {
        stopAutoPlay();
    }
});

// ==========================================
// QUIZ FUNCTIONALITY
// ==========================================

const quizData = [
    {
        question: 'What does HTML stand for?',
        options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language'
        ],
        correct: 0,
        explanation: 'HTML stands for HyperText Markup Language, used to create web pages.'
    },
    {
        question: 'Which CSS property controls text color?',
        options: [
            'text-color',
            'color',
            'font-color',
            'text-style'
        ],
        correct: 1,
        explanation: 'The "color" property in CSS is used to set the text color.'
    },
    {
        question: 'What is the correct way to declare a JavaScript variable?',
        options: [
            'v x = 5;',
            'var x = 5;',
            'variable x = 5;',
            'v: x = 5;'
        ],
        correct: 1,
        explanation: 'The correct syntax is "var x = 5;" or "let x = 5;" or "const x = 5;"'
    },
    {
        question: 'Which method is used to fetch data from an API?',
        options: [
            'getRequest()',
            'fetch()',
            'httpRequest()',
            'getData()'
        ],
        correct: 1,
        explanation: 'The fetch() method is used to make HTTP requests to APIs.'
    },
    {
        question: 'What is the purpose of media queries in CSS?',
        options: [
            'To add animations',
            'To create responsive designs for different screen sizes',
            'To change JavaScript behavior',
            'To validate form inputs'
        ],
        correct: 1,
        explanation: 'Media queries allow you to apply different styles based on device characteristics like screen size.'
    }
];

let currentQuestion = 0;
let userAnswers = [];
let quizStarted = false;

// Initialize quiz
function initQuiz() {
    userAnswers = new Array(quizData.length).fill(null);
    currentQuestion = 0;
    quizStarted = true;
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const containerDiv = document.getElementById('questionContainer');
    const question = quizData[currentQuestion];
    
    let optionsHTML = question.options.map((option, index) => `
        <label class="option">
            <input 
                type="radio" 
                name="answer" 
                value="${index}"
                ${userAnswers[currentQuestion] === index ? 'checked' : ''}
                onchange="selectAnswer(${index})"
            >
            <span>${option}</span>
        </label>
    `).join('');

    containerDiv.innerHTML = `
        <div class="question-text">${question.question}</div>
        <div class="options">${optionsHTML}</div>
    `;

    // Update progress
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

    // Update button states
    document.getElementById('prevQuestionBtn').disabled = currentQuestion === 0;
    document.getElementById('nextQuestionBtn').textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
}

// Select answer
function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
}

// Next question
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

// Previous question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

// Finish quiz and show results
function finishQuiz() {
    // Calculate score
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            correctCount++;
        }
    });

    const score = Math.round((correctCount / quizData.length) * 100);

    // Show results
    showQuizScreen('results');
    document.getElementById('scoreValue').textContent = score;

    // Display detailed results
    let resultsHTML = '<div class="results-breakdown">';
    quizData.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        const resultClass = isCorrect ? 'correct' : 'incorrect';
        resultsHTML += `
            <div class="result-item ${resultClass}">
                <div class="result-question">${question.question}</div>
                <div class="result-answer">
                    Your answer: ${question.options[userAnswers[index]] || 'Not answered'}
                </div>
                ${!isCorrect ? `<div class="result-correct">Correct answer: ${question.options[question.correct]}</div>` : ''}
            </div>
        `;
    });
    resultsHTML += '</div>';
    document.getElementById('resultsDetails').innerHTML = resultsHTML;

    // Log results
    console.log(`✓ Quiz completed! Score: ${score}%`);
}

// Show specific quiz screen
function showQuizScreen(screenName) {
    document.querySelectorAll('.quiz-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`quiz${screenName.charAt(0).toUpperCase() + screenName.slice(1)}`).classList.add('active');
}

// Quiz event listeners
document.getElementById('startQuizBtn').addEventListener('click', () => {
    showQuizScreen('questions');
    initQuiz();
});

document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
document.getElementById('prevQuestionBtn').addEventListener('click', prevQuestion);

document.getElementById('retakeQuizBtn').addEventListener('click', () => {
    showQuizScreen('start');
});

// ==========================================
// API FUNCTIONALITY
// ==========================================

let fetchCount = 0;

const apiEndpoints = {
    quote: 'https://api.quotable.io/random',
    joke: 'https://api.jokes.one/jokes/random',
    user: 'https://randomuser.me/api/',
    activity: 'https://www.boredapi.com/api/activity'
};

// Fetch data from API
async function fetchData() {
    const apiSelect = document.getElementById('apiSelect');
    const selectedAPI = apiSelect.value;

    // Show loading state
    showLoadingState(true);
    hideAllDisplays();

    try {
        const response = await fetch(apiEndpoints[selectedAPI]);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Hide loading and show appropriate display
        showLoadingState(false);
        
        // Process data based on API type
        switch(selectedAPI) {
            case 'quote':
                displayQuote(data);
                break;
            case 'joke':
                displayJoke(data);
                break;
            case 'user':
                displayUser(data);
                break;
            case 'activity':
                displayActivity(data);
                break;
        }

        // Update fetch count and time
        fetchCount++;
        document.getElementById('fetchCount').textContent = fetchCount;
        document.getElementById('lastFetch').textContent = new Date().toLocaleTimeString();

        console.log(`✓ Data fetched from ${selectedAPI} API`);

    } catch (error) {
        showLoadingState(false);
        showError(`Failed to fetch data: ${error.message}`);
        console.error('API Error:', error);
    }
}

// Display quote
function displayQuote(data) {
    document.getElementById('quoteText').textContent = `"${data.content}"`;
    document.getElementById('quoteAuthor').textContent = `— ${data.author}`;
    document.getElementById('quoteDisplay').classList.remove('hidden');
}

// Display joke
function displayJoke(data) {
    const joke = data.joke;
    // Simple splitting - jokes often have "Q:" and "A:" or similar
    const parts = joke.split(/Q:|A:/).filter(p => p.trim());
    
    if (parts.length >= 2) {
        document.getElementById('jokeSetup').textContent = `Q: ${parts[0].trim()}`;
        document.getElementById('jokePunchline').textContent = `A: ${parts[1].trim()}`;
    } else {
        document.getElementById('jokeSetup').textContent = joke;
        document.getElementById('jokePunchline').textContent = '';
    }
    
    document.getElementById('jokeDisplay').classList.remove('hidden');
}

// Display user
function displayUser(data) {
    const user = data.results[0];
    document.getElementById('userAvatar').src = user.picture.large;
    document.getElementById('userName').textContent = `${user.name.first} ${user.name.last}`;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userLocation').textContent = `${user.location.city}, ${user.location.country}`;
    document.getElementById('userDisplay').classList.remove('hidden');
}

// Display activity
function displayActivity(data) {
    document.getElementById('activityType').textContent = data.activity;
    document.getElementById('activityDescription').textContent = `Type: ${data.type}`;
    document.getElementById('participants').textContent = data.participants || 1;
    
    if (data.price === 0) {
        document.getElementById('price').textContent = 'Free';
    } else {
        document.getElementById('price').textContent = `$${(data.price * 100).toFixed(0)}`;
    }
    
    document.getElementById('activityDisplay').classList.remove('hidden');
}

// Show loading state
function showLoadingState(show) {
    const loadingState = document.getElementById('loadingState');
    if (show) {
        loadingState.classList.remove('hidden');
    } else {
        loadingState.classList.add('hidden');
    }
}

// Hide all displays
function hideAllDisplays() {
    document.getElementById('quoteDisplay').classList.add('hidden');
    document.getElementById('jokeDisplay').classList.add('hidden');
    document.getElementById('userDisplay').classList.add('hidden');
    document.getElementById('activityDisplay').classList.add('hidden');
}

// Show error
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorState').classList.remove('hidden');
}

// API event listeners
document.getElementById('fetchBtn').addEventListener('click', fetchData);

// Fetch data on API selection change
document.getElementById('apiSelect').addEventListener('change', () => {
    hideAllDisplays();
    document.getElementById('errorState').classList.add('hidden');
});

// ==========================================
// NAVIGATION & MOBILE MENU
// ==========================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c Task 3: Responsive Design & API Integration', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%c Media Queries, Interactive Components, and API Fetching', 'color: #6b7280; font-size: 12px;');
    
    // Initialize carousel
    initCarouselIndicators();
    showSlide(0);
    startAutoPlay();
    
    // Hero button scroll
    document.getElementById('heroBtn').addEventListener('click', () => {
        document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' });
    });
    
    console.log('✓ Carousel initialized');
    console.log('✓ Quiz system ready');
    console.log('✓ API integration ready');
    console.log('✓ Responsive design active');
});

// Log current viewport info
function logViewportInfo() {
    const width = window.innerWidth;
    let device = 'Unknown';
    
    if (width <= 480) device = 'Mobile';
    else if (width <= 768) device = 'Tablet';
    else device = 'Desktop';
    
    console.log(`📱 Current viewport: ${device} (${width}px)`);
}

// Log on resize
window.addEventListener('resize', () => {
    logViewportInfo();
});

logViewportInfo();
