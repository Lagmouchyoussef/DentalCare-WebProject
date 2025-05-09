document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
   
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        body.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }

    themeBtn.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });

    document.querySelectorAll('.before-after').forEach(comparison => {
        const before = comparison.querySelector('.before');
        const after = comparison.querySelector('.after');
        const handle = comparison.querySelector('.slider-handle');
        let isDragging = false;
        
        function moveSlider(e) {
            if (!isDragging) return;
            
            const rect = comparison.getBoundingClientRect();
            let x = (e.clientX || e.touches[0].clientX) - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            
            const percent = (x / rect.width) * 100;
            after.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        }
        

        handle.addEventListener('mousedown', () => isDragging = true);
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', moveSlider);

        handle.addEventListener('touchstart', () => isDragging = true);
        document.addEventListener('touchend', () => isDragging = false);
        document.addEventListener('touchmove', moveSlider);
    });

    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
      
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').min = today;
        
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            
            if (!name || !phone || !service || !date) {
                alert('Please fill in all required fields');
                return;
            }
            
            alert(`Thank you ${name}! Your appointment request for ${service} on ${date} has been received. We will contact you at ${phone} to confirm.`);
            
            appointmentForm.reset();
        });
    }

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});