// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le carrousel de témoignages
    initTestimonialSlider();
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Afficher un message de confirmation (dans un cas réel, vous enverriez ces données à un serveur)
            alert(`Merci ${name} pour votre message. Nous vous contacterons bientôt à l'adresse ${email}.`);
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
    
    // Gestion des boutons WhatsApp
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .btn-product');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Récupérer le nom du produit si c'est un bouton de produit
            let productName = '';
            if (this.classList.contains('btn-product')) {
                const productCard = this.closest('.product-card');
                if (productCard) {
                    const productTitle = productCard.querySelector('h3');
                    if (productTitle) {
                        productName = productTitle.textContent;
                    }
                }
            }
            
            // Construire le message WhatsApp
            let message = 'Bonjour, je suis intéressé(e) par vos produits';
            if (productName) {
                message += ` et plus particulièrement par "${productName}"`;
            }
            message += '. Pouvez-vous me donner plus d\'informations?';
            
            // Encoder le message pour l'URL
            const encodedMessage = encodeURIComponent(message);
            
            // Modifier l'URL du bouton WhatsApp principal avec le message
            if (document.getElementById('whatsapp-btn')) {
                document.getElementById('whatsapp-btn').href = `https://wa.me/33123456789?text=${encodedMessage}`;
            }
            
            // Si c'est un autre bouton WhatsApp, ouvrir directement le lien
            if (!this.id || this.id !== 'whatsapp-btn') {
                window.open(`https://wa.me/33123456789?text=${encodedMessage}`, '_blank');
                e.preventDefault();
            }
        });
    });
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuster pour la hauteur du header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Activer le lien de navigation en fonction de la section visible
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation des éléments au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .feature, .about-image, .contact-item, .testimonial-card.active');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Ajouter la classe pour l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .product-card, .feature, .about-image, .contact-item, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Déclencher l'animation au chargement et au scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Fonction pour initialiser le carrousel de témoignages
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    
    // Fonction pour afficher un témoignage spécifique
    function showTestimonial(index) {
        // Cacher tous les témoignages
        testimonialCards.forEach(card => {
            card.classList.remove('active');
            card.classList.remove('fade-in');
        });
        
        // Désactiver tous les points
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Afficher le témoignage actif
        testimonialCards[index].classList.add('active');
        
        // Activer le point correspondant
        dots[index].classList.add('active');
        
        // Animation pour le témoignage actif
        setTimeout(() => {
            testimonialCards[index].classList.add('fade-in');
        }, 50);
        
        // Mettre à jour l'index courant
        currentIndex = index;
    }
    
    // Gestionnaire d'événement pour les boutons précédent/suivant
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1;
            }
            showTestimonial(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Gestionnaire d'événement pour les points
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Défilement automatique toutes les 5 secondes
    let interval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
    
    // Arrêter le défilement automatique lorsque l'utilisateur interagit avec les contrôles
    const controls = document.querySelector('.testimonial-controls');
    if (controls) {
        controls.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        controls.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialCards.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            }, 5000);
        });
    }
}
