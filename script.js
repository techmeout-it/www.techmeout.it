/* ========================================
   TechMeOut — JavaScript
   Smooth interactions & animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== i18n TRANSLATIONS =====
    const translations = {
        en: {
            // Nav
            nav_servizi: 'Services',
            nav_realizzati: 'Projects',
            nav_chi_siamo: 'About Us',
            nav_processo: 'Process',
            nav_contattaci: 'Contact Us',

            // Hero
            hero_tag: 'Professional Web Development',
            hero_title: 'Your ideas into <span class="text-gradient">digital experiences</span>',
            hero_subtitle: 'We design and develop modern, fast and optimized websites to help your business grow online.',
            hero_cta: 'Start a project',
            hero_cta2: 'Explore services',

            // Services
            services_tag: 'What we do',
            services_title: 'Our services',
            services_desc: 'From design to launch, and beyond.',
            svc1_title: 'Web Development',
            svc1_desc: 'Custom-built websites developed with the latest technologies to ensure speed, security and a flawless user experience.',
            svc2_title: 'Web Design',
            svc2_desc: 'Elegant and functional designs that communicate your brand. Every interface is crafted to make navigation clear and intuitive for visitors.',
            svc3_title: 'SEO & Optimization',
            svc3_desc: 'Technical and strategic optimization to help you rank on Google. Every website we build is designed to achieve the best positioning.',
            svc4_title: 'Maintenance & Support',
            svc4_desc: 'Ongoing assistance, security updates and performance monitoring to keep your website always at its best.',

            // About
            about_tag: 'About us',
            about_title: 'Two minds,<br>one digital mission',
            about_desc1: 'We are two developers with a passion for the web and technology. We founded <strong>TechMeOut</strong> with a clear goal: creating websites that are not only visually appealing, but that actually work.',
            about_desc2: 'We believe every business deserves a professional online presence. That\'s why we work closely with our clients, listening to their needs and turning them into concrete solutions.',
            val1_title: 'Quality',
            val1_desc: 'Clean code and high standards',
            val2_title: 'Transparency',
            val2_desc: 'Direct and honest communication',
            val3_title: 'Innovation',
            val3_desc: 'Always up to date with the latest technologies',

            // Process
            process_tag: 'How we work',
            process_title: 'Our process',
            process_desc: 'A structured approach for excellent results, every time.',
            step1_title: 'Listen',
            step1_desc: 'We sit down with you to understand your needs, goals and target audience.',
            step2_title: 'Design',
            step2_desc: 'We create wireframes and mockups to define the structure, design and user experience of the site.',
            step3_title: 'Development',
            step3_desc: 'We turn the design into code, optimizing every detail for performance and SEO.',
            step4_title: 'Launch & Support',
            step4_desc: 'We publish the site and support you with ongoing maintenance and updates.',

            // Contact
            contact_tag: 'Let\'s talk',
            contact_title: 'Have a project<br>in mind?',
            contact_desc: 'Tell us about your idea. We\'ll get back to you as soon as possible to discuss how to make it happen.',
            form_name: 'Name',
            form_name_ph: 'Your name',
            form_email: 'Email',
            form_email_ph: 'Your email',
            form_message: 'Message',
            form_message_ph: 'Tell us about your project...',
            form_submit: 'Send message',
            form_success_title: 'Message sent!',
            form_success_desc: 'Thank you {name}, we\'ll get back to you soon.',

            // Footer
            footer_tagline: 'Professional web development.<br>From your idea to your website.',
            footer_nav: 'Navigation',
            footer_contatti: 'Contact',
            footer_servizi: 'Services',
            footer_manutenzione: 'Maintenance',
            footer_copy: '&copy; 2026 TechMeOut. All rights reserved.',

            // Lavori page
            lavori_tag: 'Our work',
            lavori_title: 'Completed projects',
            lavori_subtitle: 'A selection of websites we have designed and developed.<br>Each project is unique, tailored to meet specific needs.',
            visit_site: 'Visit website',
            contact_us: 'Contact Us',
            lavori_cta_desc: 'Tell us about your idea. We\'d love to turn it into your next website.',

            // Project descriptions
            proj_ansible_desc: 'Master automation with Ansible. Hands-on tutorials, real-world examples and a complete path to take your DevOps skills to a professional level.',
            proj_cpl_desc: 'Practical tutorials, real tools, immediately applicable skills. Learn Ansible, Terraform and Kubernetes with production-ready guides and accelerate your growth as a Cloud Engineer.',
            proj_lb_desc: 'AI, Kubernetes and Cloud automation to grow your business. The expertise of an experienced consultant to transform your infrastructure in a fast, modern and effective way.',
            proj_oe_desc: 'Transform your infrastructure with AI-ready platforms. Reduce costs, accelerate releases and stay compliant, thanks to independent consulting and a ready-to-use Platform Engineering solution.',
            proj_tf_desc: 'Automate better, every day. Discover the method to learn Terraform quickly and effectively, with a creative DevOps approach designed for Cloud Engineers, SysAdmins and IT professionals who want to level up their automation skills.',
            proj_vtv_desc: 'Cloud, cybersecurity and digital transformation to grow your business. Innovative IT solutions and strategic consulting to help you thrive in a fast-changing technology landscape.',
            proj_tende_desc: 'Italy\'s #1 Community for Rooftop Tents and Camping. Discover the best campsites, share your adventures and find everything you need to travel with your rooftop tent.',
            proj_t4_desc: 'Passion, friendship and adventure on four wheels. A group of enthusiasts of the legendary Volkswagen T4, the iconic van produced from 1990 to 2003 that made van and camper history.',
            proj_cta_title: 'Yours could be next',
            proj_cta_desc: 'Want your project featured here? Tell us about your idea and let\'s build your website together.',
        }
    };

    // Italian defaults are already in HTML
    const italianTexts = {};

    function saveItalianDefaults() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!italianTexts[key]) {
                italianTexts[key] = el.innerHTML;
            }
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (!italianTexts[key]) {
                italianTexts[key] = el.getAttribute('placeholder');
            }
        });
    }

    function setLanguage(lang) {
        if (lang === 'it') {
            // Restore Italian
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (italianTexts[key]) {
                    el.innerHTML = italianTexts[key];
                }
            });
            document.querySelectorAll('[data-i18n-ph]').forEach(el => {
                const key = el.getAttribute('data-i18n-ph');
                if (italianTexts[key]) {
                    el.setAttribute('placeholder', italianTexts[key]);
                }
            });
            document.documentElement.lang = 'it';
        } else if (translations[lang]) {
            const dict = translations[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    // Preserve SVGs inside buttons
                    const svg = el.querySelector('svg');
                    el.innerHTML = dict[key];
                    if (svg && !el.querySelector('svg')) {
                        el.innerHTML += ' ';
                        el.appendChild(svg);
                    }
                }
            });
            document.querySelectorAll('[data-i18n-ph]').forEach(el => {
                const key = el.getAttribute('data-i18n-ph');
                if (dict[key]) {
                    el.setAttribute('placeholder', dict[key]);
                }
            });
            document.documentElement.lang = lang;
        }

        // Update active flag
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('lang-btn--active', btn.getAttribute('data-lang') === lang);
        });

        localStorage.setItem('techmeout-lang', lang);
    }

    // Save Italian defaults before any switch
    saveItalianDefaults();

    // Init language from localStorage
    const savedLang = localStorage.getItem('techmeout-lang') || 'it';
    if (savedLang !== 'it') {
        setLanguage(savedLang);
    }

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    // ===== MOBILE MENU =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // ===== SMOOTH SCROLL (for nav links) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = () => {
        // Auto-add reveal class to key elements
        const selectors = [
            '.section__header',
            '.service-card',
            '.project-card',
            '.about__text',
            '.about__visual',
            '.process-step',
            '.contact__info',
            '.contact__form'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('reveal');
            });
        });

        // Add stagger class to grids
        document.querySelectorAll('.services-grid, .process-grid, .projects-grid').forEach(el => {
            el.classList.add('reveal-stagger');
        });
    };

    revealElements();

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });


    // ===== COUNTER ANIMATION =====
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero__stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }


    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');

    const activateNavLink = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activateNavLink, { passive: true });


    // ===== FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();

            // Basic validation
            if (!name || !email || !message) {
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return;
            }

            // Show success (replace form content)
            const currentLang = localStorage.getItem('techmeout-lang') || 'it';
            const successTitle = currentLang === 'en' ? 'Message sent!' : 'Messaggio inviato!';
            const successDesc = currentLang === 'en' 
                ? `Thank you ${escapeHtml(name)}, we'll get back to you soon.`
                : `Grazie ${escapeHtml(name)}, ti ricontatteremo presto.`;
            contactForm.innerHTML = `
                <div class="form-success show">
                    <div class="form-success__icon">✓</div>
                    <h3 class="form-success__title">${successTitle}</h3>
                    <p class="form-success__desc">${successDesc}</p>
                </div>
            `;
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

});
