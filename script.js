document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Service Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    prevButton.addEventListener('click', function() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextButton.addEventListener('click', function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Before-After Image Comparison
    const imageComparisons = document.querySelectorAll('.image-comparison');
    
    imageComparisons.forEach(comparison => {
        const handle = comparison.querySelector('.slider-handle');
        const beforeImage = comparison.querySelector('.before-image');
        const afterImage = comparison.querySelector('.after-image');
        let isDragging = false;
        
        function moveHandle(e) {
            if (!isDragging) return;
            
            const rect = comparison.getBoundingClientRect();
            let x = e.clientX - rect.left;
            
            // Constrain within bounds
            x = Math.max(0, Math.min(x, rect.width));
            
            const percent = (x / rect.width) * 100;
            
            afterImage.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        }
        
        handle.addEventListener('mousedown', () => {
            isDragging = true;
        });
        
        window.addEventListener('mousemove', moveHandle);
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Touch support
        handle.addEventListener('touchstart', () => {
            isDragging = true;
        });
        
        window.addEventListener('touchmove', (e) => {
            moveHandle(e.touches[0]);
        });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
    
    // Appointment Form Submission
    const appointmentForm = document.querySelector('.appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Show confirmation message
            alert(`Thank you ${name}! Your appointment request for ${service} on ${date} at ${time} has been received. We will contact you shortly to confirm.`);
            
            // Reset form
            appointmentForm.reset();
            
            // Set minimum date for appointment (today)
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
        });
    }
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            
            // Show confirmation message
            alert(`Thank you ${name}! Your message has been sent. We will respond as soon as possible.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = newsletterForm.querySelector('input').value;
            
            // Show confirmation message
            alert(`Thank you for subscribing with ${email}! You'll receive our dental health tips and updates.`);
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Set minimum date for appointment (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Mobile Menu Toggle (if added in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.toggle('active');
        });
    }
});