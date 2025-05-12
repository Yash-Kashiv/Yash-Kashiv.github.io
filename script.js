// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Custom cursor glow effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Enhanced parallax effect
document.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image');
    const robot = document.querySelector('.floating-robot');
    const shapes = document.querySelectorAll('.shape');
    
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    heroImage.style.transform = `
        rotateY(${xAxis}deg) 
        rotateX(${yAxis}deg) 
        scale(1.05)
    `;
    
    robot.style.transform = `
        translateX(${-xAxis * 2}px) 
        translateY(${-yAxis * 2}px)
        rotate(${xAxis}deg)
    `;

    // Animate background shapes
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `
            translateX(${-xAxis * speed}px) 
            translateY(${-yAxis * speed}px)
        `;
    });
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    const heroImage = document.querySelector('.hero-image');
    const robot = document.querySelector('.floating-robot');
    
    heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
    robot.style.transform = 'translateX(0) translateY(0)';
});

// Parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.floating-icon');
    const speed = 0.5;
    
    icons.forEach((icon) => {
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        icon.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Gradient text animation
const gradientText = document.querySelector('.gradient-text');
let hue = 0;

function animateGradient() {
    hue = (hue + 1) % 360;
    gradientText.style.background = `
        linear-gradient(
            135deg, 
            hsl(${hue}, 80%, 60%), 
            hsl(${(hue + 60) % 360}, 80%, 60%)
        )
    `;
    gradientText.style.webkitBackgroundClip = 'text';
    gradientText.style.backgroundClip = 'text';
    requestAnimationFrame(animateGradient);
}

animateGradient();



fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px) scale(0.95)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(element);
});

// Text scramble effect for subtitle
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="glitch">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble effect
const phrases = [
    'Software Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

const el = document.querySelector('.subtitle');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
};

next();

// Mobile menu handling
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = hamburger.classList.contains('active') 
        ? 'rotate(45deg) translate(8px, 8px)' 
        : 'none';
    spans[1].style.opacity = hamburger.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = hamburger.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -7px)' 
        : 'none';
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Disable parallax on mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile) {
    // Your existing parallax code here
    document.addEventListener('mousemove', (e) => {
        // ... (keep your existing parallax code)
    });
}

// Handle viewport height for mobile browsers
function setMobileHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setMobileHeight);
setMobileHeight();

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Your scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

// Active nav link
const navLinksAll = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth reveal animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const revealElements = document.querySelectorAll(
    '.section-header, .about-content, .skills-container, .experience-card'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    observer.observe(element);
});

// Enhanced typing effect and cool scrolling effects
document.addEventListener('DOMContentLoaded', function() {
    const keywords = [
        "Robotics",
        "Imitation Learning",
        "ROS Development",
        "Computer Vision",
        "AI Research",
        "Travel Photography"
    ];
    
    const typingElement = document.querySelector('.typing-keywords');
    if (!typingElement) return;
    
    let currentKeywordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeKeyword() {
        const currentKeyword = keywords[currentKeywordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentKeyword.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentKeyword.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentKeyword.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentKeywordIndex = (currentKeywordIndex + 1) % keywords.length;
            typingSpeed = 300; // Pause before typing next word
        }
        
        setTimeout(typeKeyword, typingSpeed);
    }
    
    // Start the typing effect
    typeKeyword();
    
    // Add cool matrix-like effect to the scrollable content
    const scrollableContent = document.querySelector('.scrollable-content');
    if (scrollableContent) {
        // Create glowing particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('glow-particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            scrollableContent.appendChild(particle);
        }
        
        // Add scroll highlight effect
        scrollableContent.addEventListener('scroll', function() {
            const paragraphs = document.querySelectorAll('.main-text');
            paragraphs.forEach(p => {
                const rect = p.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                    p.style.borderLeftColor = 'var(--secondary-green)';
                    p.style.transform = 'translateX(5px)';
                } else {
                    p.style.borderLeftColor = 'transparent';
                    p.style.transform = 'translateX(0)';
                }
            });
        });
    }
});

// Mobile-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Fix viewport height issues on mobile
    function setMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', setMobileHeight);
    setMobileHeight();
    
    // Disable animations on mobile for better performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        const animatedElements = document.querySelectorAll('.geometric-elements, .floating-elements, [class*="animate"], [class*="float"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transform = 'none';
        });
    }
    
    // Add touch support for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        }, {passive: true});
    });
});

// Fix mobile menu click issues
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile menu handling
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Make hamburger menu more responsive to touch
    if (hamburger) {
        // Use touchstart for faster response on mobile
        hamburger.addEventListener('touchstart', toggleMenu, {passive: true});
        // Also keep click for desktop and fallback
        hamburger.addEventListener('click', toggleMenu);
        
        // Animate hamburger icon
        function toggleMenu(e) {
            e.preventDefault(); // Prevent any default behavior
            
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = hamburger.classList.contains('active') 
                ? 'rotate(45deg) translate(8px, 8px)' 
                : 'none';
            spans[1].style.opacity = hamburger.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = hamburger.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -7px)' 
                : 'none';
        }
    }

    // Fix nav links click issues on mobile
    navLinksItems.forEach(item => {
        // Use touchstart for faster response on mobile
        item.addEventListener('touchstart', handleNavClick, {passive: false});
        // Also keep click for desktop and fallback
        item.addEventListener('click', handleNavClick);
        
        function handleNavClick(e) {
            // Only prevent default if it's a touchstart event
            if (e.type === 'touchstart') {
                e.preventDefault();
            }
            
            // Close the mobile menu
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Get the href and scroll to the section
            const href = item.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});
