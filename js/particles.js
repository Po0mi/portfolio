function createParticle() {
  const particle = document.createElement("div");
  particle.className = Math.random() > 0.7 ? "particle large" : "particle";

  const startX = Math.random() * window.innerWidth;
  particle.style.left = startX + "px";
  particle.style.top = window.innerHeight + "px";

  document.getElementById("particles").appendChild(particle);

  const tl = gsap.timeline();

  tl.fromTo(
    particle,
    {
      y: 0,
      x: 0,
      opacity: 0,
      scale: 0.5,
    },
    {
      y: -(window.innerHeight + 100),
      x: gsap.utils.random(-50, 50),
      opacity: 1,
      scale: 1,
      duration: gsap.utils.random(12, 18),
      ease: "none",
    }
  ).to(
    particle,
    {
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: "power2.out",
    },
    "-=2"
  );

  gsap.to(particle, {
    x: "+=" + gsap.utils.random(-20, 20),
    duration: gsap.utils.random(3, 6),
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  tl.call(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  });
}

gsap.delayedCall(0, function createParticleLoop() {
  createParticle();
  gsap.delayedCall(gsap.utils.random(0.5, 1.2), createParticleLoop);
});
