// Script principal pour le site du Wydad Athletic Club
document.addEventListener('DOMContentLoaded', function() {
    // Préchargeur
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Animation lors du défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) translateX(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Lancer une fois au chargement

    // Compteurs pour les statistiques
    const statNumbers = document.querySelectorAll('.number');
    let hasAnimated = false;

    const animateStats = function() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const statsSectionPosition = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionPosition < windowHeight - 100) {
            hasAnimated = true;
            
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.getAttribute('data-value'));
                let currentValue = 0;
                const increment = targetValue / 60; // Animation sur ~1 seconde (60fps)
                
                const updateCounter = function() {
                    if (currentValue < targetValue) {
                        currentValue += increment;
                        stat.textContent = Math.ceil(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = targetValue;
                    }
                };
                
                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateStats);

    // Galerie d'images avec modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const modalClose = document.querySelector('.modal-close');
    
    if (galleryItems.length > 0 && modal && modalContent) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                modalContent.setAttribute('src', imgSrc);
                modal.classList.add('active');
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Bouton de retour en haut
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navigation smooth scroll
    const navLinks2 = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks2.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajustement pour la barre de navigation fixe
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Diaporama pour la section des joueurs
    const playerSlider = document.querySelector('.players-slider');
    let currentSlide = 0;
    
    if (playerSlider) {
        const slides = playerSlider.querySelectorAll('.player-card');
        const totalSlides = slides.length;
        const nextBtn = document.querySelector('.next-slide');
        const prevBtn = document.querySelector('.prev-slide');
        
        // Fonction pour afficher un slide spécifique
        const showSlide = function(index) {
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }
            
            const offset = -currentSlide * 100;
            playerSlider.style.transform = `translateX(${offset}%)`;
        };
        
        // Event listeners pour les boutons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showSlide(currentSlide + 1);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showSlide(currentSlide - 1);
            });
        }
        
        // Auto-play du diaporama
        setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs des champs
            const name = contactForm.querySelector('[name="name"]').value;
            const email = contactForm.querySelector('[name="email"]').value;
            const message = contactForm.querySelector('[name="message"]').value;
            
            // Vérifier si les champs sont remplis
            if (name && email && message) {
                // Simuler l'envoi du formulaire
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                // Simuler une réponse du serveur après 2 secondes
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.innerHTML = 'Envoyé !';
                    
                    // Afficher un message de succès
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Votre message a été envoyé avec succès !';
                    contactForm.appendChild(successMessage);
                    
                    // Réinitialiser le bouton après 3 secondes
                    setTimeout(function() {
                        submitBtn.innerHTML = 'Envoyer';
                        submitBtn.disabled = false;
                        successMessage.remove();
                    }, 3000);
                }, 2000);
            }
        });
    }

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const animateTimeline = function() {
            timelineItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemPosition < windowHeight - 50) {
                    item.classList.add('fade-in');
                }
            });
        };
        
        window.addEventListener('scroll', animateTimeline);
        animateTimeline(); // Lancer une fois au chargement
    }
});
