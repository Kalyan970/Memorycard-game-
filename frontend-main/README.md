# Memory Card Game Frontend

This directory contains the frontend implementation of the Memory Card Game application. The frontend is built using HTML, CSS, JavaScript, and PHP with MySQL database for user authentication.

## Directory Structure

### Main Pages
- `index.php` - Entry point that redirects to welcome page
- `welcome.html` / `welcome.css` / `welcome.js` - Landing page of the application
- `login.html` / `login.css` / `login.js` - User authentication page
- `signup.html` / `signup.css` / `signup.js` - New user registration
- `registration.html` / `registration.css` / `registration.js` - Additional registration functionality
- `instructions.html` / `instructions.css` / `instructions.js` - Game instructions and rules

### Backend Files
- `config.php` - Database configuration and connection
- `login.php` - Handles user authentication
- `signup.php` - Handles new user registration
- `mcg.sql` - Database schema for user management

### Game Levels
- `levels.html` / `levels.css` - Level selection interface
- `easylevel.html` / `easy.css` / `easy.js` - Easy difficulty gameplay
- `normallevel.html` / `normal.css` / `normal.js` - Normal difficulty gameplay
- `expertlevel.html` / `expert.css` / `expert.js` - Expert difficulty gameplay

### Additional Pages
- `about.html` / `about.css` - About page information
- `celebratory.html` / `celebratory.css` / `celebratory.js` - Victory celebration screen

### Assets
- Audio Files:
  - `welcome.mp3` - Welcome sound
  - `success.mp3` - Success sound effect
  - `correct.mp3` - Correct match sound
  - `fail.mp3` - Failure sound effect

- Images:
  - `welcome.webp` - Welcome page background
  - `levels.webp` - Levels page background
  - `easy.webp` - Easy level assets
  - `normal.webp` - Normal level assets
  - `game1.jpeg` - Game assets
  - Various other image assets (*.jpg, *.jpeg, *.webp)

## Features
- User Authentication System
  - Secure password hashing
  - Email-based registration
  - Session management
  - User profile display
- Multiple Difficulty Levels
- Interactive Gameplay
- Sound Effects and Visual Feedback
- Responsive Design
- Score Tracking
- Celebratory Screens
- Persistent User Progress

## Getting Started

### Prerequisites
1. XAMPP Server with:
   - Apache
   - MySQL
   - PHP

### Database Setup
1. Start XAMPP and ensure Apache and MySQL services are running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import `mcg.sql` to create the required database and tables

### Application Setup
1. Place the project files in your XAMPP htdocs directory
2. Access the application through `http://localhost/MCG/frontend`
3. Create an account or log in
4. Read the instructions
5. Choose your preferred difficulty level
6. Start playing!

## Technical Details
- Frontend: HTML5, CSS3, JavaScript
- Backend: PHP 7.4+
- Database: MySQL 5.7+
- Authentication: Custom PHP-based system
- Session Management: Browser localStorage
- Password Security: PHP password_hash()

## Dependencies
- Bootstrap 5.3.0-alpha1
- Modern web browser with JavaScript enabled
- XAMPP server environment

## Security Features
- Password hashing using PHP's built-in functions
- SQL injection prevention
- Input validation and sanitization
- Secure session management

## User Flow
1. User arrives at welcome page through index.php redirect
2. Registers or logs in
3. Views instructions
4. Selects difficulty level
5. Plays the game
6. Progress is saved
7. Can advance to higher levels upon completion

## Development Notes
- Modular CSS for each component
- Responsive design principles
- Cross-browser compatibility
- Progressive difficulty system
- Real-time score tracking
- User-friendly interface
