// ==========================================
// FORM VALIDATION
// ==========================================

const contactForm = document.getElementById('contactForm');
const formInputs = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const errorMessages = {
    fullName: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    phone: document.getElementById('phoneError'),
    subject: document.getElementById('subjectError'),
    message: document.getElementById('messageError')
};

const successMessage = document.getElementById('successMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;

// Validation rules
const validationRules = {
    fullName: (value) => {
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 3) return 'Name must be at least 3 characters';
        return null;
    },
    email: (value) => {
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
    },
    phone: (value) => {
        if (value && !phoneRegex.test(value)) return 'Please enter a valid phone number';
        return null;
    },
    subject: (value) => {
        if (!value) return 'Please select a subject';
        return null;
    },
    message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return null;
    }
};

// Validate individual field
function validateField(fieldName) {
    const input = formInputs[fieldName];
    const error = errorMessages[fieldName];
    const validator = validationRules[fieldName];
    
    const errorText = validator(input.value);
    
    if (errorText) {
        input.classList.add('error');
        error.textContent = errorText;
        error.classList.add('show');
        return false;
    } else {
        input.classList.remove('error');
        error.textContent = '';
        error.classList.remove('show');
        return true;
    }
}

// Real-time validation on input
Object.keys(formInputs).forEach(fieldName => {
    formInputs[fieldName].addEventListener('blur', () => validateField(fieldName));
    formInputs[fieldName].addEventListener('input', () => {
        if (formInputs[fieldName].classList.contains('error')) {
            validateField(fieldName);
        }
    });
});

// Form submit with validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    Object.keys(validationRules).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show success message
        successMessage.classList.add('show');
        
        // Log form data (in real app, would send to server)
        console.log('✓ Form Data:', {
            fullName: formInputs.fullName.value,
            email: formInputs.email.value,
            phone: formInputs.phone.value,
            subject: formInputs.subject.value,
            message: formInputs.message.value,
            subscribe: document.getElementById('subscribe').checked
        });
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            successMessage.classList.remove('show');
            Object.keys(formInputs).forEach(fieldName => {
                formInputs[fieldName].classList.remove('error');
                errorMessages[fieldName].classList.remove('show');
            });
        }, 3000);
    }
});

// ==========================================
// TO-DO LIST - DOM MANIPULATION
// ==========================================

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = [];
let currentFilter = 'all';

// Load todos from localStorage
function loadTodos() {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    if (!text) {
        alert('Please enter a task');
        return;
    }
    
    if (text.length < 3) {
        alert('Task must be at least 3 characters');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    
    todos.unshift(todo); // Add to beginning
    todoInput.value = '';
    todoInput.focus();
    
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Filter todos based on current filter
function getFilteredTodos() {
    switch(currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// Render todos to DOM
function renderTodos() {
    const filtered = getFilteredTodos();
    todoList.innerHTML = '';
    
    if (filtered.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    filtered.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="todo-btn todo-btn-delete" onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('activeCount').textContent = active;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners for todo
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// ==========================================
// NAVIGATION
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
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
    
    navLinks.forEach(link => {
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
    console.log('%c Task 2: Forms & DOM Manipulation', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%c HTML Forms, CSS Layouts, and JavaScript Interactivity', 'color: #6b7280; font-size: 12px;');
    
    loadTodos();
    updateStats();
    
    // Focus on first field
    formInputs.fullName.focus();
});

// Log application info
console.log('✓ Form validation enabled');
console.log('✓ To-Do list with LocalStorage');
console.log('✓ DOM manipulation active');
