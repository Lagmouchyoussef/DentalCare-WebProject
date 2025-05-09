// Définir la date minimale pour le formulaire
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Gestion du formulaire
    const form = document.getElementById('appointmentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        
        // Validation simple
        if (!name || !phone || !service || !date) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        // Simulation d'envoi
        alert(`Merci ${name}! Votre demande de rendez-vous pour ${service} le ${date} a été enregistrée. Nous vous contacterons au ${phone} pour confirmation.`);
        
        // Réinitialiser le formulaire
        form.reset();
    });
    
    // Navigation fluide
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