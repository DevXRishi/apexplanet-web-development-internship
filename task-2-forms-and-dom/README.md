# Task 2: Forms & DOM Manipulation

## 📌 Objective
Enhance HTML and CSS skills while mastering JavaScript for DOM manipulation through practical form handling and dynamic list management.

## 📋 Task Breakdown

### Step 1: Create a Contact Form Using HTML and CSS ✅
Build a comprehensive form with multiple input types and professional styling.

**Features Implemented:**
- Text input field (Full Name)
- Email input field
- Phone number field
- Select dropdown (Subject)
- Textarea for messages
- Checkbox for newsletter subscription
- Submit button with styling
- Success message display
- Error message areas for each field

**File:** `index.html` (Contact Form Section)

### Step 2: Add JavaScript Form Validation ✅
Implement client-side validation to ensure data integrity before submission.

**Validation Rules:**
- **Full Name**: Required, minimum 3 characters
- **Email**: Required, must match email format
- **Phone**: Optional, but must be valid if provided
- **Subject**: Required, must select from dropdown
- **Message**: Required, minimum 10 characters

**Features:**
- Real-time validation on blur and input
- Error messages displayed below each field
- Form-wide validation on submit
- Visual feedback (red borders for errors)
- Success message after submission
- Form auto-reset after success

**File:** `script.js` (Form Validation Section)

### Step 3: Create a Responsive Layout Using Flexbox and CSS Grid ✅

**Flexbox Implementation:**
- Navigation bar (horizontal flex layout)
- Navigation links spacing
- Filter buttons layout
- Input group for to-do (flex direction change on mobile)
- Footer content distribution

**CSS Grid Implementation:**
- To-do items grid with `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Statistics display with responsive grid
- Footer sections with auto-fit
- Responsive breakpoints at 768px and 480px

**Responsive Features:**
- Mobile-first approach
- Media queries for tablet and mobile
- Flexible grid that adapts to screen size
- Touch-friendly buttons and inputs
- Readable typography on all devices

**File:** `styles.css` (All layout sections)

### Step 4: Develop a Dynamic To-Do List Using JavaScript ✅
Implement a fully functional to-do list with DOM manipulation.

**Features Implemented:**

**Adding Tasks:**
- Input field for new tasks
- Add button with validation
- Enter key support
- Minimum 3 character validation
- Tasks stored in memory and localStorage

**Displaying Tasks:**
- Dynamic rendering to DOM
- Task cards with checkbox, text, and delete button
- Visual indication of completed tasks
- Empty state message when no tasks

**Filtering:**
- Filter buttons: All, Active, Completed
- Active filter button highlighting
- Filtered view without removing data

**Managing Tasks:**
- Complete/Uncomplete by checkbox
- Delete button for each task
- Real-time statistics updates
- LocalStorage persistence

**Statistics Display:**
- Total task count
- Active (incomplete) task count
- Completed task count
- Auto-updating on any change

**File:** `script.js` (To-Do List Section)

## 🎨 Design Features

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #ec4899 (Pink)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)
- **Text**: #1f2937 (Dark Gray)

### Components
1. **Navigation Bar** - Sticky, flexbox-based with active state
2. **Hero Section** - Eye-catching gradient header
3. **Contact Form** - Professional form with validation
4. **To-Do List** - Grid-based task management
5. **Statistics Panel** - Grid layout for stats
6. **Footer** - Multi-column grid layout

### Responsive Breakpoints
- **Desktop**: Full layout with optimal spacing
- **Tablet (≤768px)**: Adjusted grid columns, smaller buttons
- **Mobile (≤480px)**: Single column layouts, optimized typography

## 💻 Technologies Used

### HTML5
- Semantic markup
- Form elements (input, select, textarea, checkbox)
- ARIA considerations for accessibility

### CSS3
- **Flexbox**: Navigation, buttons, input groups
- **CSS Grid**: To-do list, statistics, footer
- **Gradients**: Hero section, buttons
- **Transitions & Animations**: Smooth interactions
- **Media Queries**: Responsive design
- **CSS Variables**: Consistent theming

### JavaScript (ES6+)
- **Form Validation**: Real-time and submit-time validation
- **DOM Manipulation**: Creating, updating, deleting elements
- **Event Handling**: Click, blur, input, keypress events
- **LocalStorage**: Data persistence
- **Array Methods**: Filter, find, map operations
- **String Methods**: Trim, test, slice

## 📱 Responsive Design

### Desktop (>768px)
- Full navigation with all links
- Contact form max-width 600px
- To-do grid with 3+ columns
- Footer in 3 columns

### Tablet (768px and below)
- Compact navigation
- Form maintains readability
- To-do grid adjusts to 2 columns
- Footer in 2-3 columns

### Mobile (<480px)
- Simplified navigation
- Full-width form inputs
- Single column to-do list
- Stacked footer sections
- Touch-optimized buttons

## ✨ Key Learnings

1. **HTML Forms**: Proper form structure, input types, accessibility
2. **Form Validation**: Client-side validation patterns and error handling
3. **Flexbox**: Layout direction, alignment, space distribution
4. **CSS Grid**: Template columns, auto-fit, responsive grids
5. **DOM Manipulation**: Creating, updating, and removing elements
6. **Event Handling**: Various event types and delegation
7. **Data Persistence**: LocalStorage for client-side storage
8. **Responsive Design**: Mobile-first approach with media queries
9. **User Experience**: Real-time feedback, error messages, visual cues

## 📊 Statistics

- **HTML Lines**: 200+
- **CSS Lines**: 600+
- **JavaScript Lines**: 300+
- **Color Variables**: 13
- **Animations**: 2
- **Media Queries**: 3 breakpoints
- **Form Fields**: 6
- **Grid Layouts**: 3

## 🎯 Objectives Met

- [x] Created contact form with multiple input types
- [x] Implemented comprehensive form validation
- [x] Built responsive layout with Flexbox
- [x] Built responsive layout with CSS Grid
- [x] Applied media queries for mobile/tablet
- [x] Created dynamic to-do list
- [x] Implemented DOM manipulation
- [x] Added LocalStorage persistence
- [x] Professional UI/UX design
- [x] Accessibility considerations

## 🔧 How to Use

### Contact Form
1. Fill in all required fields
2. Email must be in valid format
3. Message must be at least 10 characters
4. Check newsletter subscription (optional)
5. Click "Send Message"
6. Success message appears

### To-Do List
1. Enter task text (minimum 3 characters)
2. Click "Add Task" or press Enter
3. Check checkbox to mark complete
4. Click Delete to remove task
5. Use filter buttons to view All/Active/Completed
6. Statistics update automatically
7. Tasks persist even after page refresh

## 🚀 Features Demonstrated

- Form validation with custom rules
- Real-time error feedback
- Smooth animations and transitions
- Responsive grid and flexbox layouts
- DOM element creation and manipulation
- LocalStorage integration
- User-friendly interface
- Accessibility best practices
- Cross-browser compatibility

## 🌟 Bonus Features Implemented

- Filter tasks by status
- Statistics dashboard
- Success/error animations
- Auto-focus after add
- HTML escaping for security
- Enter key support
- Real-time validation feedback
- Professional error messages

---

**Completion Date:** May 30, 2026  
**Task Status:** ✅ Complete

### Next Steps
Explore further by:
- Adding task categories
- Implementing task priority levels
- Adding due dates
- Creating local file export
- Adding animations for task add/delete
