// Simple text parallax
function initTextParallax() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero text elements move at different speeds
  gsap.to(".title", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".title2", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".sub-text, .sub-text2, .sub-text3", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  // About section text
  gsap.to(".about-me", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Projects section text
  gsap.to(".projects-title", {
    yPercent: -12,
    ease: "none",
    scrollTrigger: {
      trigger: ".projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", initTextParallax);
