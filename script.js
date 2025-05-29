document.addEventListener('DOMContentLoaded', () => {
    // Fade in elements on page load
    const elements = document.querySelectorAll('.logo, .tagline, .gallery-item, .location, .contact');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            galleryItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });

    // Handle navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Show/hide scroll-up button
        const scrollUp = document.querySelector('.scroll-up');
        if (pageYOffset > 300) {
            scrollUp.classList.add('visible');
        } else {
            scrollUp.classList.remove('visible');
        }
    });

    // Create and append scroll-up button
    const scrollUp = document.createElement('div');
    scrollUp.className = 'scroll-up';
    scrollUp.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollUp);

    // Scroll to top when button is clicked
    scrollUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // Function to move to specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = totalItems - 1;
        } else if (index >= totalItems) {
            index = 0;
        }
        currentIndex = index;
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    // Auto-advance carousel
    let autoAdvance = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Event listeners for buttons
    prevButton.addEventListener('click', () => {
        clearInterval(autoAdvance);
        goToSlide(currentIndex - 1);
        autoAdvance = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

    nextButton.addEventListener('click', () => {
        clearInterval(autoAdvance);
        goToSlide(currentIndex + 1);
        autoAdvance = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });

    carousel.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a');

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
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to your server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
    return false;
}

// Initialize lightbox
if (typeof lightbox !== 'undefined') {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2'
    });
} 