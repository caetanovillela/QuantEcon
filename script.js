document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 80; // Number of particles
    const connectionDistance = 150; // Max distance to draw lines
    const moveSpeed = 0.3; // Speed of particles
    
    // Resize canvas to fit the hero section
    function resize() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            width = canvas.width = heroSection.offsetWidth;
            height = canvas.height = heroSection.offsetHeight;
        }
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * moveSpeed;
            this.vy = (Math.random() - 0.5) * moveSpeed;
            this.size = Math.random() * 2 + 1; // Random size between 1 and 3
            this.alpha = Math.random() * 0.5 + 0.2; // Random opacity
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(173, 216, 230, ${this.alpha})`; // Light blue particles
            ctx.fill();
        }
    }
    
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            
            // Draw connections
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // Fade out line as distance increases
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(173, 216, 230, ${opacity * 0.2})`; // Faint light blue lines
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        resize();
        init(); // Re-initialize particles on resize to avoid stretching
    });
    
    init();
    animate();
});
