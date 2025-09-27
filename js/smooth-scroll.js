function initSectionScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          gsap.to(window, {
            scrollTo: {
              y: targetSection,
              offsetY: 50,
            },
            duration: 1.2,
            ease: "power2.inOut",
          });
        }
      });
    });
  }

  function initHeroExitAnimation() {
    const heroElements = {
      title: document.querySelector(".title"),
      subtitle: document.querySelector(".title2"),
      description: document.querySelector(".sub-text2"),
      japanese: document.querySelector(".sub-text3"),
      socials: document.querySelector(".soc-med"),
      indicator: document.querySelector(".indicator"),
    };

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.set(heroElements.title, {
          y: progress * -100,
          opacity: 1 - progress * 1.5,
        });

        gsap.set(heroElements.subtitle, {
          y: progress * -50,
          opacity: 1 - progress * 1.2,
        });

        gsap.set(heroElements.description, {
          x: progress * -100,
          opacity: 1 - progress * 0.8,
        });

        gsap.set(heroElements.japanese, {
          x: progress * 100,
          opacity: 1 - progress * 0.8,
        });

        gsap.set(heroElements.socials, {
          y: progress * 50,
          opacity: 1 - progress,
        });
      },
    });
  }

  function initAboutSectionAnimation() {
    const aboutTitle = document.querySelector(".about-me");
    const textContent = document.querySelector(".text-content");

    // About section animations
    gsap.fromTo(
      aboutTitle,
      {
        scale: 0.8,
        opacity: 0,
        y: 100,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutTitle,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      textContent,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContent,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  function initSkillsSectionAnimation() {
    const skillsBackground = document.querySelector(".skills-background");
    const skillsIntro = document.querySelector(".skills-intro");
    const skillCards = document.querySelectorAll(".shibui-card");

    // Skills background animation
    if (skillsBackground) {
      gsap.fromTo(
        skillsBackground,
        {
          scale: 0.8,
          opacity: 0,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Skills intro animation
    if (skillsIntro) {
      gsap.fromTo(
        skillsIntro,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsIntro,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Skill cards animation
    gsap.fromTo(
      skillCards,
      {
        y: 60,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
        stagger: {
          amount: 1.2,
          grid: [2, 3],
          from: "start",
        },
        scrollTrigger: {
          trigger: ".shibui-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  function initProjectsSectionAnimation() {
    const projectBackground = document.querySelector(".project-bacground");
    const projectIntro = document.querySelector(".project-intro");
    const projectCards = document.querySelectorAll(".project-card");

    // Project background animation
    if (projectBackground) {
      gsap.fromTo(
        projectBackground,
        {
          scale: 0.8,
          opacity: 0,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectBackground,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (projectIntro) {
      gsap.fromTo(
        projectIntro,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectIntro,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    projectCards.forEach((card, index) => {
      const isMainCard = card.classList.contains("main");

      gsap.fromTo(
        card,
        {
          y: isMainCard ? 100 : 60,
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          scale: 0.9,
          rotationY: index % 2 === 0 ? -15 : 15,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: isMainCard ? 1.2 : 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power1.out",
        });
      });
    });
  }

  function initSectionTransitions() {
    const sections = [".hero", ".about", ".skills", ".projects"];

    sections.forEach((selector, index) => {
      const nextSection = sections[index + 1];
      if (!nextSection) return;

      ScrollTrigger.create({
        trigger: selector,
        start: "bottom 20%",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentSection = document.querySelector(selector);

          if (currentSection) {
            gsap.set(currentSection, {
              opacity: 1 - progress * 0.3,
              scale: 1 - progress * 0.05,
            });
          }
        },
      });
    });
  }

  function initParallaxBackgrounds() {
    const wrappers = document.querySelectorAll(
      ".hero-wrapper, .about-wrapper, .projects-wrapper"
    );

    wrappers.forEach((wrapper) => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(wrapper, {
            "--parallax-y": `${progress * 50}px`,
          });
        },
      });
    });
  }

  // Initialize all animations
  initSmoothScrolling();
  initHeroExitAnimation();
  initAboutSectionAnimation();
  initSkillsSectionAnimation(); // New separate function for skills
  initProjectsSectionAnimation();
  initSectionTransitions();
  initParallaxBackgrounds();

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}

document.addEventListener("DOMContentLoaded", initSectionScrollAnimations);

window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});
