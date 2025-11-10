// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const menu = document.querySelector('.navbar__menu');
    const body = document.body;
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            // Toggle active classes
            hamburger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
            
            // Prevent body scroll when menu is open
            if (menu.classList.contains('is-active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.navbar__link');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('is-active');
                    menu.classList.remove('is-active');
                    body.style.overflow = '';
                }
            });
        });
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll_circle_container');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Get the next section after hero
            const heroSection = document.querySelector('.hero');
            if (heroSection && heroSection.nextElementSibling) {
                heroSection.nextElementSibling.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If no next section, scroll down by viewport height
                window.scrollBy({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Job card accordion functionality (mobile only)
    const jobCards = document.querySelectorAll('.job-card__header');
    jobCards.forEach(header => {
        header.addEventListener('click', function() {
            // Only toggle on mobile
            if (window.innerWidth <= 768) {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                const toggle = this.querySelector('.job-card__toggle');
                
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Change icon between + and -
                if (!isExpanded) {
                    toggle.textContent = '−';
                } else {
                    toggle.textContent = '+';
                }
            }
        });
    });
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.getElementById('submitButton');
    
    if (contactForm && submitButton) {
        // Get all required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Function to validate all required fields
        function validateForm() {
            let allValid = true;
            
            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        allValid = false;
                    }
                } else if (field.tagName === 'SELECT') {
                    if (!field.value || field.value === '') {
                        allValid = false;
                    }
                } else {
                    if (!field.value || field.value.trim() === '') {
                        allValid = false;
                    }
                }
            });
            
            // Enable or disable submit button based on validation
            submitButton.disabled = !allValid;
        }
        
        // Add event listeners to all required fields
        requiredFields.forEach(field => {
            field.addEventListener('input', validateForm);
            field.addEventListener('change', validateForm);
        });
        
        // Initial validation on page load
        validateForm();
    }
});

