/* ==========================================
   INITIALIZATION & DOM CONSTANTS
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializePortfolio();
    initializeNotes();
    initializeProducts();
}

/* ==========================================
   NAVIGATION & MOBILE MENU
   ========================================== */

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
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });

    // Handle smooth scroll behavior for internal links
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    updateActiveNavLinks(href);
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

function updateActiveNavLinks(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   PORTFOLIO FUNCTIONALITY
   ========================================== */

const portfolioProjects = [
    {
        id: 1,
        title: "Task 1: Web Basics",
        description: "Foundation project covering HTML5 structure, CSS3 styling with gradients and flexbox, and interactive JavaScript with localStorage.",
        tags: ["HTML5", "CSS3", "JavaScript"],
        link: "#"
    },
    {
        id: 2,
        title: "Task 2: Forms & DOM",
        description: "Advanced form validation, dynamic to-do list with CRUD operations, CSS Grid layouts, and localStorage data persistence.",
        tags: ["Forms", "Validation", "Grid", "DOM"],
        link: "#"
    },
    {
        id: 3,
        title: "Task 3: Responsive & API",
        description: "Responsive design with image carousel, quiz system, and integration with 4 public APIs for dynamic content fetching.",
        tags: ["Responsive", "Carousel", "Quiz", "API"],
        link: "#"
    },
    {
        id: 4,
        title: "Full Stack Project",
        description: "Comprehensive application combining portfolio, notes management, and product listing with advanced filtering capabilities.",
        tags: ["Portfolio", "Notes", "Products", "Advanced"],
        link: "#"
    }
];

function initializePortfolio() {
    renderProjects();
    setupContactForm();
}

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projectsGrid.innerHTML = portfolioProjects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
            </div>
            <div class="project-body">
                <p class="project-description">${escapeHtml(project.description)}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn btn-primary">View Project</a>
            </div>
        </div>
    `).join('');
}

function setupContactForm() {
    const contactForm = document.getElementById('portfolioContactForm');
    const successMessage = document.getElementById('portfolioContactSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();

            // Validate form
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate sending message (in real app, would send to server)
            console.log('Contact Form Submitted:', { name, email, message });

            // Show success message
            contactForm.reset();
            successMessage.classList.add('show');

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        });
    }
}

/* ==========================================
   NOTES APP FUNCTIONALITY
   ========================================== */

const NOTES_STORAGE_KEY = 'task4_notes';
let notesData = [];

function initializeNotes() {
    loadNotesFromStorage();
    setupNoteControls();
    renderNotes();
    updateNotesStats();
}

function setupNoteControls() {
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const clearNoteBtn = document.getElementById('clearNoteBtn');
    const sortNotes = document.getElementById('sortNotes');

    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', addNote);
    }

    if (clearNoteBtn) {
        clearNoteBtn.addEventListener('click', function() {
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        });
    }

    if (sortNotes) {
        sortNotes.addEventListener('change', function() {
            renderNotes();
        });
    }
}

function addNote() {
    const noteTitle = document.getElementById('noteTitle').value.trim();
    const noteContent = document.getElementById('noteContent').value.trim();

    if (!noteTitle || !noteContent) {
        alert('Please enter both title and content');
        return;
    }

    const note = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
        createdAt: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    notesData.push(note);
    saveNotesToStorage();

    // Clear form
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';

    renderNotes();
    updateNotesStats();
}

function deleteNote(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        notesData = notesData.filter(note => note.id !== noteId);
        saveNotesToStorage();
        renderNotes();
        updateNotesStats();
    }
}

function editNote(noteId) {
    const note = notesData.find(n => n.id === noteId);
    if (note) {
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
        deleteNote(noteId);
        document.getElementById('noteTitle').focus();
    }
}

function getSortedNotes() {
    const sortBy = document.getElementById('sortNotes')?.value || 'newest';
    const sorted = [...notesData];

    switch(sortBy) {
        case 'oldest':
            return sorted.reverse();
        case 'alphabetical':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'newest':
        default:
            return sorted;
    }
}

function renderNotes() {
    const notesList = document.getElementById('notesList');
    const emptyState = document.getElementById('emptyNotesState');
    const sortedNotes = getSortedNotes();

    if (sortedNotes.length === 0) {
        notesList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');

    notesList.innerHTML = sortedNotes.map(note => `
        <div class="note-card">
            <div class="note-header">
                <h4 class="note-title">${escapeHtml(note.title)}</h4>
                <span class="note-date">${note.createdAt}</span>
            </div>
            <p class="note-content">${escapeHtml(note.content)}</p>
            <div class="note-actions">
                <button class="note-btn note-btn-edit" onclick="editNote(${note.id})">Edit</button>
                <button class="note-btn note-btn-delete" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateNotesStats() {
    const totalNotesEl = document.getElementById('totalNotes');
    const totalCharactersEl = document.getElementById('totalCharacters');

    const totalNotes = notesData.length;
    const totalCharacters = notesData.reduce((sum, note) => sum + note.content.length, 0);

    if (totalNotesEl) totalNotesEl.textContent = totalNotes;
    if (totalCharactersEl) totalCharactersEl.textContent = totalCharacters.toLocaleString();
}

function saveNotesToStorage() {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesData));
}

function loadNotesFromStorage() {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    notesData = stored ? JSON.parse(stored) : [];
}

/* ==========================================
   PRODUCTS FUNCTIONALITY
   ========================================== */

const productsData = [
    { id: 1, name: "Wireless Headphones", price: 129.99, category: "electronics", rating: 4.5, description: "Premium wireless headphones with noise cancellation" },
    { id: 2, name: "Coffee Maker", price: 89.99, category: "home", rating: 4.2, description: "Programmable coffee maker with thermal carafe" },
    { id: 3, name: "Running Shoes", price: 149.99, category: "clothing", rating: 4.8, description: "Professional running shoes with advanced cushioning" },
    { id: 4, name: "Web Development Book", price: 45.99, category: "books", rating: 4.6, description: "Complete guide to modern web development" },
    { id: 5, name: "Desk Lamp", price: 59.99, category: "home", rating: 4.3, description: "LED desk lamp with adjustable brightness" },
    { id: 6, name: "Tablet", price: 299.99, category: "electronics", rating: 4.7, description: "10-inch tablet with high resolution display" },
    { id: 7, name: "Winter Jacket", price: 199.99, category: "clothing", rating: 4.4, description: "Warm and stylish winter jacket" },
    { id: 8, name: "JavaScript Guide", price: 39.99, category: "books", rating: 4.9, description: "Complete JavaScript reference and tutorial" },
    { id: 9, name: "Wireless Mouse", price: 34.99, category: "electronics", rating: 4.1, description: "Ergonomic wireless mouse with precision tracking" },
    { id: 10, name: "Plant Pot", price: 24.99, category: "home", rating: 4.0, description: "Decorative ceramic plant pot" },
    { id: 11, name: "T-Shirt", price: 19.99, category: "clothing", rating: 4.2, description: "Comfortable cotton t-shirt" },
    { id: 12, name: "CSS Handbook", price: 35.99, category: "books", rating: 4.5, description: "Comprehensive CSS styling guide" }
];

function initializeProducts() {
    renderProducts(productsData);
    setupProductControls();
}

function setupProductControls() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortProducts = document.getElementById('sortProducts');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', filterAndSortProducts);
    }

    if (sortProducts) {
        sortProducts.addEventListener('change', filterAndSortProducts);
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            if (categoryFilter) categoryFilter.value = 'all';
            if (priceFilter) priceFilter.value = 'all';
            if (sortProducts) sortProducts.value = 'name-asc';
            renderProducts(productsData);
        });
    }
}

function filterAndSortProducts() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    const sortBy = document.getElementById('sortProducts')?.value || 'name-asc';

    let filtered = [...productsData];

    // Category filter
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Price filter
    if (priceFilter !== 'all') {
        const [min, max] = priceFilter === '200+' ? [200, Infinity] : priceFilter.split('-').map(Number);
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    // Sorting
    filtered.sort((a, b) => {
        switch(sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    renderProducts(filtered);
}

function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const noProductsState = document.getElementById('noProductsState');
    const showingCount = document.getElementById('showingCount');
    const totalCount = document.getElementById('totalCount');

    if (showingCount) showingCount.textContent = products.length;
    if (totalCount) totalCount.textContent = productsData.length;

    if (products.length === 0) {
        productsGrid.innerHTML = '';
        noProductsState.classList.remove('hidden');
        return;
    }

    noProductsState.classList.add('hidden');

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${getCategoryEmoji(product.category)}
            </div>
            <div class="product-body">
                <span class="product-category">${escapeHtml(product.category)}</span>
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <p class="product-description">${escapeHtml(product.description)}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryEmoji(category) {
    const emojis = {
        'electronics': '📱',
        'clothing': '👕',
        'home': '🏠',
        'books': '📚'
    };
    return emojis[category] || '🛍️';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star">★</span>';
    }

    if (hasHalfStar) {
        starsHtml += '<span class="star">★</span>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star" style="opacity: 0.3;">★</span>';
    }

    return starsHtml;
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

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
