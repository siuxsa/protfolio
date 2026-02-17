<script>
// Only run if canvas exists and is visible
const canvas = document.getElementById("cyber-bg");

if (canvas && canvas.offsetParent !== null) { // offsetParent checks if element is visible
    console.log("Desktop detected: background animation running.");

    const ctx = canvas.getContext("2d");

    // Colors
    const PARTICLE_COLOR = "#0ff";
    const LINE_COLOR = "rgba(0, 255, 255, 0.2)";

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = 2;
        }
        move() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = PARTICLE_COLOR;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let p of particles) {
            p.move();
            p.draw();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = LINE_COLOR;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
} else {
    console.log("Mobile detected or canvas not found: background animation disabled.");
}
</script>