/* ========================================
   TechMeOut — WOW Interactions
   Scroll progress, 3D tilt, particles, typing
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== SCROLL PROGRESS BAR =====
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });


    // ===== HERO PARTICLES =====
    const hero = document.querySelector('.hero');
    if (hero) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero__particles';
        hero.prepend(particlesContainer);

        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'hero__particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (6 + Math.random() * 8) + 's';
            p.style.animationDelay = (Math.random() * 6) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(p);
        }
    }


    // ===== 3D TILT ON CARDS =====
    const tiltCards = document.querySelectorAll('.service-card, .project-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    });


    // ===== CODE WINDOW TYPING EFFECT =====
    const codeWindow = document.querySelector('.code-window__content code');
    if (codeWindow) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypingAnimation(codeWindow);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(codeWindow);
    }

    function startTypingAnimation(el) {
        const fullHTML = el.innerHTML;
        el.innerHTML = '';
        el.style.visibility = 'visible';

        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'code-typing-cursor';
        el.appendChild(cursor);

        // Type character by character (preserving HTML tags)
        let i = 0;
        let insideTag = false;
        let buffer = '';

        function typeNext() {
            if (i >= fullHTML.length) {
                // Remove cursor after a moment
                setTimeout(() => cursor.remove(), 2000);
                return;
            }

            const char = fullHTML[i];

            if (char === '<') insideTag = true;
            if (insideTag) {
                buffer += char;
                if (char === '>') {
                    insideTag = false;
                    // Insert the complete tag before the cursor
                    cursor.insertAdjacentHTML('beforebegin', buffer);
                    buffer = '';
                }
                i++;
                typeNext(); // Tags appear instantly
                return;
            }

            // Regular character
            cursor.insertAdjacentHTML('beforebegin', char);
            i++;
            setTimeout(typeNext, 12 + Math.random() * 18);
        }

        typeNext();
    }


    // ===== MAGNETIC HOVER ON NAV =====
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            link.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });


    // ===== PARALLAX HERO GRID =====
    const heroGrid = document.querySelector('.hero__bg-grid');
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroGrid.style.transform = `translateY(${scroll * 0.3}px)`;
            }
        }, { passive: true });
    }


    // ===== COUNTER ANIMATION ENHANCEMENT =====
    // (The existing counter code works; this just adds a subtle scale pop)
    document.querySelectorAll('.stat__number').forEach(el => {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                el.style.animation = 'stat-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                obs.unobserve(el);
            }
        }, { threshold: 0.5 });
        obs.observe(el);
    });

    // Add stat pop keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes stat-pop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

});
