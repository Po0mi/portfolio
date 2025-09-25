function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scrolldown");
  const heroSection = document.querySelector(".hero");

  if (!scrollIndicator || !heroSection) return;

  gsap.registerPlugin(ScrollTrigger);

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  scrollIndicator.appendChild(progressBar);

  const pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true });

  pulseTimeline
    .to(scrollIndicator, {
      scale: 1.15,
      borderColor: "rgba(189, 178, 178, 0.5)",
      duration: 2,
      ease: "power2.inOut",
    })
    .to(
      scrollIndicator.querySelector("::before"),
      {
        boxShadow: "0px -8px 12px 3px rgba(189, 178, 178, 0.5)",
        scale: 1.2,
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );

  gsap.to(".scroll-progress::after", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(scrollIndicator, {
    opacity: 0,
    scale: 0.7,
    y: -20,
    scrollTrigger: {
      trigger: ".hero",
      start: "80% top",
      end: "bottom top",
      scrub: 1,
      onComplete: () => pulseTimeline.pause(),
      onReverseComplete: () => pulseTimeline.resume(),
    },
  });

  gsap.to(scrollIndicator, {
    borderColor: "rgba(189, 178, 178, 0.5)",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "50% top",
      scrub: 1,
    },
  });

  gsap.fromTo(
    scrollIndicator,
    { scale: 1 },
    {
      scale: 1.3,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "30% top",
        scrub: 2,
        yoyo: true,
      },
    }
  );

  scrollIndicator.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: {
        y: "#about-skills",
        offsetY: 50,
      },
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(scrollIndicator, {
      scale: 0.85,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "back.out(1.7)",
    });
  });

  scrollIndicator.addEventListener("mouseenter", () => {
    gsap.to(scrollIndicator, {
      scale: 1.2,
      borderColor: "rgba(189, 178, 178, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  scrollIndicator.addEventListener("mouseleave", () => {
    gsap.to(scrollIndicator, {
      scale: 1,
      borderColor: "rgba(189, 178, 178, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "60% top",
    end: "80% top",
    onEnter: () => {
      gsap.to(scrollIndicator, {
        y: "+=10",
        duration: 0.5,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut",
      });
    },
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}

document.addEventListener("DOMContentLoaded", initScrollIndicator);

window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});
