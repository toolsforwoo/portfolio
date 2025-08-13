// Content management and interactions
class Portfolio {
    constructor() {
        this.content = null;
        this.init();
    }

    async init() {
        await this.loadContent();
        this.renderContent();
        this.setupObservers();
        this.setupInteractions();
        this.updateMetadata();
    }

    async loadContent() {
        try {
            const response = await fetch('content.json');
            this.content = await response.json();
        } catch (error) {
            console.warn('Failed to load content.json, using fallback content');
            this.content = this.getFallbackContent();
        }
    }

    getFallbackContent() {
        return {
            hero: {
                kicker: "NICHOLAS WOO — WEB3 GTM STRATEGIST & WRITER",
                headline: "SHARP NARRATIVE. OPERATOR-GRADE GTM. HIGH-SIGNAL WRITING.",
                deck: "I write the foundations of Web3 business growth.",
                ctas: [
                    { label: "Let's Build Together", href: "#contact", variant: "primary" },
                    { label: "View Work", href: "#work", variant: "secondary" }
                ]
            },
            sections: {
                marketing: {
                    items: [
                        {
                            title: "Content vs Copy",
                            date: "NOV 2024",
                            tags: ["STRATEGY", "WRITING"],
                            insight: "Good commercial writers know how to use both styles.",
                            image: "marketing-1.jpg"
                        }
                    ]
                },
                web3: {
                    items: [
                        {
                            title: "Token Economics",
                            date: "OCT 2024",
                            tags: ["DEFI", "STRATEGY"],
                            insight: "Sustainable tokenomics require narrative alignment.",
                            image: "web3-1.jpg"
                        }
                    ]
                },
                ai: {
                    items: [
                        {
                            title: "AI-Native GTM",
                            date: "DEC 2024",
                            tags: ["AI", "GROWTH"],
                            insight: "The future of marketing is augmented intelligence.",
                            image: "ai-1.jpg"
                        }
                    ]
                }
            },
            blog: [
                {
                    date: "DEC 15, 2024",
                    title: "Why You Should Hire a Web3 Writer",
                    deck: "And why it should be me.",
                    href: "#"
                }
            ],
            links: {
                telegram: "@nikolei666",
                x: "https://x.com/nicholaswoo",
                email: "nicholas.woojw@gmail.com"
            }
        };
    }

    renderContent() {
        // Render marketing cards
        this.renderCards('marketing-cards', this.content.sections.marketing.items);
        
        // Render web3 cards
        this.renderCards('web3-cards', this.content.sections.web3.items);
        
        // Render AI cards
        this.renderCards('ai-cards', this.content.sections.ai.items, true);
        
        // Render blog items
        this.renderBlog();
        
        // Update social links
        this.updateSocialLinks();
    }

    renderCards(containerId, items, showIcon = false) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = items.map(item => `
            <article class="card" data-reveal>
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="card-meta">${item.date}</div>
                    ${showIcon ? this.getCardIcon() : ''}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <p class="card-insight">${item.insight}</p>
                </div>
            </article>
        `).join('');
    }

    getCardIcon() {
        return `
            <svg class="card-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
        `;
    }

    renderBlog() {
        const container = document.getElementById('blog-items');
        if (!container) return;

        container.innerHTML = this.content.blog.map(item => `
            <a href="${item.href}" class="blog-item" data-reveal>
                <div class="blog-date">${item.date}</div>
                <h3 class="blog-title">${item.title}</h3>
                <p class="blog-deck">${item.deck}</p>
            </a>
        `).join('');
    }

    updateSocialLinks() {
        const links = this.content.links;
        
        // Update all social links
        document.querySelectorAll('[data-social="telegram"]').forEach(el => {
            if (el.tagName === 'A') {
                el.href = `https://t.me/${links.telegram.replace('@', '')}`;
                if (el.classList.contains('contact-link')) {
                    el.textContent = `${links.telegram} on Telegram`;
                }
            }
        });

        document.querySelectorAll('[data-social="x"]').forEach(el => {
            if (el.tagName === 'A') {
                el.href = links.x;
            }
        });

        document.querySelectorAll('[data-social="email"]').forEach(el => {
            if (el.tagName === 'A') {
                el.href = `mailto:${links.email}`;
                if (el.classList.contains('contact-link')) {
                    el.textContent = links.email;
                }
            }
        });
    }

    setupObservers() {
        // Intersection Observer for reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || index * 50;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe all elements with data-reveal
        document.querySelectorAll('[data-reveal]').forEach(el => {
            observer.observe(el);
        });

        // Smooth scroll indicator for sections
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    setupInteractions() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });
        }

        // Theme toggle (placeholder functionality)
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                const icon = themeToggle.querySelector('.theme-icon');
                icon.textContent = document.body.classList.contains('light-theme') ? '◑' : '◐';
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = window.innerWidth < 1200 ? 60 : 0;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Parallax effect on hero
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero-bg');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }

        // Dynamic cursor effect for cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    updateMetadata() {
        // Update current date
        const now = new Date();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const currentMonth = monthNames[now.getMonth()];
        const currentYear = now.getFullYear();
        
        const topLeft = document.querySelector('.corner-meta.top-left');
        if (topLeft) {
            topLeft.textContent = `${currentMonth} ${currentYear}`;
        }

        // Update version
        const version = document.querySelector('.version');
        if (version) {
            version.textContent = `v11.${currentYear}`;
        }

        // Generate build hash
        const hash = document.querySelector('.hash');
        if (hash) {
            const buildHash = Math.random().toString(36).substring(2, 8);
            hash.textContent = `build:${buildHash}`;
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Portfolio();
    });
} else {
    new Portfolio();
}

// Handle prefers-reduced-motion
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}
