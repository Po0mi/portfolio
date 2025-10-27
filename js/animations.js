// ============================================
// SMOOTH SCROLLING FIX
// ============================================

// CRITICAL: Configure ScrollTrigger BEFORE any other GSAP code runs
gsap.registerPlugin(ScrollTrigger);

// Disable ScrollTrigger's scroll hijacking
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  ignoreMobileResize: true,
});

// Prevent ScrollTrigger from interfering with smooth scroll
ScrollTrigger.normalizeScroll(false);

// ============================================
// SMOOTH SCROLLING IMPLEMENTATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll function
  function smoothScrollTo(element) {
    const yOffset = 0; // Adjust if you have a fixed header offset needed
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  // Handle all navigation anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute("href");

      // Handle empty hash or just "#"
      if (targetId === "#" || targetId === "") return;

      const target = document.querySelector(targetId);

      if (target) {
        smoothScrollTo(target);

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Scroll indicator click
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", (e) => {
      e.preventDefault();
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        smoothScrollTo(aboutSection);
      }
    });
  }

  // Update active indicator on scroll
  const sections = document.querySelectorAll("section[id]");
  const indicatorDots = document.querySelectorAll(".indicator-dot");

  function updateActiveIndicator() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        indicatorDots.forEach((dot) => {
          dot.classList.remove("active");
          if (dot.getAttribute("data-section") === sectionId) {
            dot.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveIndicator);
  updateActiveIndicator(); // Initialize on load
});

// ============================================
// ENHANCED GSAP ANIMATIONS (FIXED VERSION)
// ============================================

// Set default ease for smoother animations
gsap.defaults({ ease: "power3.out" });

// ============================================
// INITIAL PAGE LOAD ANIMATIONS
// ============================================

// Create master timeline for coordinated entrance
const tlIntro = gsap.timeline({ defaults: { ease: "power3.out" } });

// Navigation links with enhanced stagger and bounce
tlIntro.fromTo(
  ".nav-links li",
  {
    y: -50,
    opacity: 0,
    rotationX: -90,
  },
  {
    y: 0,
    opacity: 1,
    rotationX: 0,
    duration: 0.8,
    stagger: {
      each: 0.1,
      ease: "power2.out",
    },
  }
);

// Section indicators with slide-in effect
tlIntro.fromTo(
  ".indicator-dot",
  {
    x: -100,
    opacity: 0,
    scale: 0,
  },
  {
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)",
  },
  "-=0.6"
);

// Hero title with split reveal effect
tlIntro
  .from("#main-title", {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "power4.out",
  })
  .from(
    "#main-title2",
    {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power4.out",
    },
    "-=0.8"
  );

// Subtitle with typewriter-like reveal
tlIntro.from(".subtitle", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

// Hero description with blur effect
tlIntro.from(".hero-description", {
  y: 30,
  opacity: 0,
  filter: "blur(10px)",
  duration: 1,
  ease: "power2.out",
});

// Floating card with 3D entrance
tlIntro.from(".floating-card", {
  x: 100,
  opacity: 0,
  rotationY: 45,
  duration: 1.2,
  ease: "power3.out",
});

// ============================================
// SCROLL-TRIGGERED ANIMATIONS (FIXED - NO SCRUB)
// ============================================

// About section - REMOVED scrub to fix smooth scroll
gsap.from(".about-text", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    end: "top 20%",
    toggleActions: "play none none reverse",
    // REMOVED: scrub: 0.5 - This was causing the smooth scroll issue
  },
  x: -100,
  opacity: 0,
  duration: 1,
});

gsap.from(".download-btn-v1", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  scale: 0.9,
  duration: 1,
  ease: "back.out(1.4)",
});

// ============================================
// CARD ANIMATIONS WITH ENHANCED EFFECTS
// ============================================

// Skill cards with flip and stagger
gsap.utils.toArray(".skill-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    {
      y: 100,
      opacity: 0,
      rotationX: -30,
      transformPerspective: 1000,
    },
    {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1,
      delay: i * 0.15,
      ease: "power3.out",
    }
  );

  // Hover animation
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Service cards with enhanced scale effect
gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    {
      scale: 0.5,
      opacity: 0,
      filter: "blur(5px)",
    },
    {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      delay: i * 0.12,
      ease: "power3.out",
    }
  );

  // Interactive hover effect
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.08,
      rotation: 2,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });
});

// Project carousel with slide effect
gsap.utils.toArray(".carousel-track").forEach((track, i) => {
  gsap.fromTo(
    track,
    {
      x: -100,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: track,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
      x: 0,
      opacity: 1,
      duration: 1.2,
      delay: i * 0.15,
      ease: "power3.out",
    }
  );
});

// Contact info cards with bounce
gsap.utils.toArray(".info-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    {
      y: 80,
      opacity: 0,
      scale: 0.8,
    },
    {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: i * 0.12,
      ease: "back.out(1.4)",
    }
  );
});

// Contact form with slide-up effect
gsap.utils.toArray(".contact-form-wrapper").forEach((form, i) => {
  gsap.fromTo(
    form,
    {
      y: 100,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: form,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none none",
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: i * 0.15,
      ease: "power3.out",
    }
  );
});

// ============================================
// CONTINUOUS ANIMATIONS
// ============================================

// Floating animation for hero card
gsap.to(".floating-card", {
  y: "+=20",
  duration: 2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});

gsap.utils.toArray(".section-label").forEach((label, i) => {
  gsap.fromTo(
    label,
    {
      x: -80,
      opacity: 0,
      scale: 0.95,
      filter: "blur(5px)",
    },
    {
      scrollTrigger: {
        trigger: label,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    }
  );
});
