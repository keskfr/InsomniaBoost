document.addEventListener('DOMContentLoaded', function() {

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });


    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {

                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });


    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
   
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            

            alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
            

            contactForm.reset();
        });
    }


    const requestBoostBtn = document.getElementById('request-boost');
    if (requestBoostBtn) {
        requestBoostBtn.addEventListener('click', function() {
            const price = document.getElementById('total-price').textContent;
            if (price === 'Selecciona rangos válidos') {
                alert('Por favor, selecciona rangos válidos antes de solicitar un boost.');
                return;
            }
            
            alert('¡Solicitud de boost recibida! Te redirigiremos al proceso de pago.');
        });
    }
});