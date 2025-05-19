document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const message = this.elements[3].value;
    
    if (name && email && message) {
        alert(`Thank you, ${name}! We have received your message and will contact you soon at ${email}.`);
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    link.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});