// Advanced Portfolio Interactions
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupTypewriter();
        this.setupProjectBooks();
        this.setupParticles();
        this.setupScrollEffects();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter-js');
        if (typewriterElement) {
            const texts = [
                'Data Analyst',
                'SQL Expert', 
                'Python Developer',
                'ETL Specialist',
                'BI Developer'
            ];
            
            let textIndex = 0;
            let characterIndex = 0;
            let isDeleting = false;

            const typeWriter = () => {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    typewriterElement.textContent = currentText.substring(0, characterIndex - 1);
                    characterIndex--;
                } else {
                    typewriterElement.textContent = currentText.substring(0, characterIndex + 1);
                    characterIndex++;
                }

                let typeSpeed = isDeleting ? 50 : 100;

                if (!isDeleting && characterIndex === currentText.length) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && characterIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typeSpeed = 500;
                }

                setTimeout(typeWriter, typeSpeed);
            };

            typeWriter();
        }
    }

    setupProjectBooks() {
        const books = document.querySelectorAll('.project-book');
        
        books.forEach((book, index) => {
            book.addEventListener('click', () => {
                this.openProjectModal(index);
            });

            book.addEventListener('mouseenter', () => {
                book.style.transform = 'rotateY(-15deg) rotateX(5deg) scale(1.05)';
            });

            book.addEventListener('mouseleave', () => {
                book.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            });
        });
    }

    openProjectModal(projectIndex) {
        const projects = [
            {
                title: 'ETL Pipeline Tự động',
                description: 'Chi tiết về dự án ETL Pipeline...',
                technologies: ['Python', 'Airflow', 'PostgreSQL', 'Docker'],
                images: ['project1-1.jpg', 'project1-2.jpg'],
                githubLink: 'https://github.com/tuannghiahuynh/etl-pipeline'
            },
            {
                title: 'Dashboard BI Realtime',
                description: 'Chi tiết về dashboard BI...',
                technologies: ['Superset', 'PostgreSQL', 'Redis', 'Celery'],
                images: ['project2-1.jpg', 'project2-2.jpg'],
                githubLink: 'https://github.com/tuannghiahuynh/bi-dashboard'
            },
            {
                title: 'Data Warehouse Optimization',
                description: 'Chi tiết về tối ưu data warehouse...',
                technologies: ['ClickHouse', 'SQL', 'Python', 'Grafana'],
                images: ['project3-1.jpg', 'project3-2.jpg'],
                githubLink: 'https://github.com/tuannghiahuynh/dw-optimization'
            }
        ];

        const project = projects[projectIndex];
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-90vh overflow-y-auto">
                <div class="p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-3xl font-bold">${project.title}</h2>
                        <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">×</button>
                    </div>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <p class="text-gray-600 mb-6">${project.description}</p>
                            <div class="mb-6">
                                <h3 class="text-xl font-semibold mb-3">Technologies Used:</h3>
                                <div class="flex flex-wrap gap-2">
                                    ${project.technologies.map(tech => 
                                        `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            <a href="${project.githubLink}" target="_blank" 
                               class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                <i class="fab fa-github mr-2"></i>
                                View on GitHub
                            </a>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop" 
                                 alt="Project Screenshot" class="rounded-lg shadow-lg w-full">
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    setupParticles() {
        // Simple particle system for hero section
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.5';
        
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.style.position = 'relative';
            heroSection.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const particles = [];

            const resizeCanvas = () => {
                canvas.width = heroSection.offsetWidth;
                canvas.height = heroSection.offsetHeight;
            };

            const createParticles = () => {
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 3 + 1
                    });
                }
            };

            const animateParticles = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.fill();
                });

                requestAnimationFrame(animateParticles);
            };

            resizeCanvas();
            createParticles();
            animateParticles();

            window.addEventListener('resize', resizeCanvas);
        }
    }

    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// CV Download functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[href="#"][class*="download"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary link for download
            const link = document.createElement('a');
            link.href = 'assets/Tuan-Nghia-Huynh-CV.pdf'; // Path to your actual CV file
            link.download = 'Tuan-Nghia-Huynh-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});