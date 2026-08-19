/* ============================================
   RUSHIKESH BHANDEKAR - PORTFOLIO
   JavaScript Functionality
   ============================================ */

// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializeContactForm();
    initializeScrollAnimations();
    initializeIntersectionObserver();
    // New: compute and display performance metrics
    computePerformanceMetrics();
}

/* ============= Navigation ============= */
function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Update active link
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });

    // Smooth scroll to sections
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* ============= Contact Form ============= */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const messageInput = document.getElementById('contactMessage');
            const successMessage = document.getElementById('contactSuccess');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (message.length < 10) {
                showNotification('Message must be at least 10 characters long', 'error');
                return;
            }

            // Simulate sending message
            console.log('Contact Form Submitted:', { name, email, message });

            // Show success message
            successMessage.classList.remove('hidden');
            successMessage.classList.add('show');

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                successMessage.classList.add('hidden');
            }, 5000);
        });
    }
}

/* ============= Form Validation ============= */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#fee2e2' : '#dbeafe'};
        color: ${type === 'error' ? '#991b1b' : '#1e40af'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        border-left: 4px solid ${type === 'error' ? '#dc2626' : '#3b82f6'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/* ============= Scroll Animations ============= */
function initializeScrollAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

/* ============= Intersection Observer for Animations ============= */
function initializeIntersectionObserver() {
    const elements = document.querySelectorAll('.project-card, .timeline-content, .skill-category');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                    entry.target.style.opacity = '0';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        element.style.animation = 'none';
        observer.observe(element);
    });
}

/* ============= Performance Metrics ============= */
function computePerformanceMetrics() {
    // Use the Navigation Timing API (modern browsers) to get key timings
    if (performance && performance.getEntriesByType) {
        const [navEntry] = performance.getEntriesByType('navigation');
        if (navEntry) {
            const loadTime = Math.round(navEntry.loadEventEnd - navEntry.startTime);
            const domContentLoaded = Math.round(navEntry.domContentLoadedEventEnd - navEntry.startTime);
            // First Paint may be available via 'paint' entries
            const paintEntries = performance.getEntriesByType('paint');
            let firstPaint = 'N/A';
            if (paintEntries && paintEntries.length) {
                const fp = paintEntries.find(e => e.name === 'first-paint');
                if (fp) {
                    firstPaint = Math.round(fp.startTime);
                }
            }
            // Update DOM if elements exist
            const loadEl = document.getElementById('loadTime');
            const domEl = document.getElementById('domContentLoaded');
            const fpEl = document.getElementById('firstPaint');
            if (loadEl) loadEl.textContent = loadTime.toString();
            if (domEl) domEl.textContent = domContentLoaded.toString();
            if (fpEl) fpEl.textContent = firstPaint.toString();
        }
    }
}

/* ============= Utility Functions ============= */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/* ============= Page Load Events ============= */
window.addEventListener('load', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Trigger animations after page load
    const elements = document.querySelectorAll('[class*="animate"]');
    elements.forEach(el => {
        el.style.animation = 'fadeInUp 0.8s ease forwards';
    });
});

/* ============= Performance: Lazy Loading Images (if needed) ============= */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

/* ============= Error Handling ============= */
window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
});

/* ============= Smooth Scroll for Older Browsers ============= */
if (!('scrollBehavior' in document.documentElement.style)) {
    window.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            const href = e.target.getAttribute('href');
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                e.preventDefault();
            }
        }
    });
}

/* ============= CSS Animations Definition ============= */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Log successful initialization
console.log('✓ Portfolio initialized successfully');
console.log('✓ Navigation active');
console.log('✓ Contact form ready');
console.log('✓ Animations enabled');
