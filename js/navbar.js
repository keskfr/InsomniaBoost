document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        

        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            

            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    

    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                

                const desktopLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                const mobileLink = document.querySelector(`.mobile-nav-link[href="#${sectionId}"]`);
                
                if (desktopLink) desktopLink.classList.add('active');
                if (mobileLink) mobileLink.classList.add('active');
            }
        });
    }
    

    window.addEventListener('scroll', setActiveLink);
    

    setActiveLink();
});