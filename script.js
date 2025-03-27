/**
 * AI Assistant Pro Landing Page
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check if user previously selected dark mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('darkMode', null);
                updateDarkModeIcon(false);
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
                updateDarkModeIcon(true);
            }
        });
    }
    
    // Update icon based on dark mode state
    function updateDarkModeIcon(isDark) {
        if (!darkModeToggle) return;
        const icon = darkModeToggle.querySelector('i');
        
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        console.log("Mobile menu elements found");
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Mobile toggle clicked");
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                e.target !== mobileMenuToggle && 
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
        
        // Close mobile menu on window resize above mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    } else {
        console.error("Mobile menu elements not found");
        if (!mobileMenuToggle) console.error("Mobile toggle not found");
        if (!navMenu) console.error("Nav menu not found");
    }
    
    // Active Navigation Links on Scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Sections for scroll spy
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Sticky header
        const header = document.querySelector('.header');
        if (scrollPosition > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const formMessage = document.getElementById('form-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                updateFormMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                updateFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            updateFormMessage('Thank you for subscribing!', 'success');
            emailInput.value = '';
        });
        
        // Add focus and blur events to the email input for better user experience
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            emailInput.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
    }
    
    // Helper function to show form messages
    function updateFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Remove message after 3 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 3000);
    }
    
    // Email validation function
    function validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
                
                // Adjust header offset based on screen size
                let headerOffset = 80;
                if (window.innerWidth <= 768) {
                    headerOffset = 70;
                }
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close mobile menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link, .nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Prevent default behavior for social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If link is just "#", prevent default to avoid scrolling to top
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
});

// Force images to load
function ensureImagesLoaded() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Create a new Image object to attempt loading
        const newImg = new Image();
        newImg.onload = function() {
            // If image loads successfully, ensure the original img has the correct src
            img.src = img.src;
            img.style.display = 'inline-block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
        };
        newImg.onerror = function() {
            console.error('Failed to load image:', img.src);
        };
        newImg.src = img.src; // Start loading
    });
}

// Execute after page load
window.addEventListener('load', function() {
    ensureImagesLoaded();
    
    // Direct approach to mobile menu toggle - No event bubbling issues
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        // Remove any existing click listeners first
        const newMobileToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newMobileToggle, mobileMenuToggle);
        
        // Add fresh click listener with direct DOM manipulation
        newMobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Force toggle directly
            this.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
                console.log("Menu closed");
            } else {
                navMenu.classList.add('active');
                document.body.classList.add('no-scroll');
                console.log("Menu opened");
            }
        });
    }
}); 