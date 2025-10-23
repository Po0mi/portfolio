// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate title on load - more subtle
gsap.to(".section-title", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power2.out",
  delay: 0.1,
});

// Animate skill cards with stagger effect - gentler entrance
gsap.to(".skill-card", {
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.08,
  ease: "power2.out",
});

// Particle explosion on hover - fewer particles
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
  const particlesContainer = card.querySelector(".particles");

  card.addEventListener("mouseenter", () => {
    // Reduced particles from 12 to 6
    for (let i = 0; i < 6; i++) {
      createParticle(particlesContainer);
    }

    // Subtle scale - reduced from 1.05 to 1.02
    gsap.to(card, {
      scale: 1.02,
      duration: 0.4,
      ease: "power1.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.4,
      ease: "power1.out",
    });
  });
});

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random starting position near center
  const startX = 50 + (Math.random() - 0.5) * 15;
  const startY = 50 + (Math.random() - 0.5) * 15;

  // Shorter travel distance - reduced from 50-100 to 30-60
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 30;
  const endX = startX + Math.cos(angle) * distance;
  const endY = startY + Math.sin(angle) * distance;

  particle.style.left = startX + "%";
  particle.style.top = startY + "%";

  container.appendChild(particle);

  // Slower, gentler particle animation
  gsap.to(particle, {
    left: endX + "%",
    top: endY + "%",
    opacity: 0,
    scale: 0,
    duration: 1 + Math.random() * 0.3,
    ease: "power1.out",
    onComplete: () => particle.remove(),
  });
}

// More subtle magnetic effect - reduced tilt angles
skillCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    // Reduced rotation from 10 degrees to 5 degrees
    gsap.to(card, {
      rotationY: deltaX * 5,
      rotationX: -deltaY * 5,
      duration: 0.4,
      ease: "power1.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power2.out", // Changed from elastic for smoother return
    });
  });
});

// Gentler click animation
skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Reduced scale effect
    gsap
      .timeline()
      .to(card, {
        scale: 0.98,
        duration: 0.1,
      })
      .to(card, {
        scale: 1.03,
        duration: 0.25,
        ease: "power2.out", // Changed from elastic for subtlety
      })
      .to(card, {
        scale: 1,
        duration: 0.2,
      });

    // Fewer particles on click - reduced from 20 to 10
    const particlesContainer = card.querySelector(".particles");
    for (let i = 0; i < 10; i++) {
      createParticle(particlesContainer);
    }
  });
});
// End of js/skills.js
