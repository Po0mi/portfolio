function startKanjiLoader() {
  const strokes = document.querySelectorAll(".kanji-stroke");
  const character = document.querySelector(".kanji-character");
  const loadingText = document.querySelector(".loading-text");
  const loader = document.getElementById("loader");

  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(() => {
        loader.classList.add("hidden");
        // Initialize the Evolution Chain after loader completes
        initializeEvolutionChain();
      }, 0);
    },
  });

  gsap.set([strokes, character, loadingText], { opacity: 0 });
  gsap.set(loadingText, { y: 20 });

  tl.to(loadingText, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
  })

    .to(".stroke-1", { opacity: 1, duration: 0.4 }, 0.8)
    .to(".stroke-2", { opacity: 1, duration: 0.4 }, 1.2)
    .to(".stroke-3", { opacity: 1, duration: 0.4 }, 1.6)
    .to(".stroke-4", { opacity: 1, duration: 0.4 }, 2.0)
    .to(".stroke-5", { opacity: 1, duration: 0.4 }, 2.4)

    .to(
      character,
      {
        opacity: 1,
        scale: [0.8, 1.1, 1],
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      3.0
    )

    .to(
      strokes,
      {
        opacity: 0,
        duration: 0.3,
      },
      3.5
    );
}

function initializeEvolutionChain() {
  // Add a slight delay for smooth transition
  setTimeout(() => {
    // Animate the scroll indicator in
    const indicator = document.getElementById("evolutionIndicator");
    if (indicator) {
      gsap.fromTo(
        indicator,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }

    // Initialize the Evolution Chain class
    if (typeof EvolutionChainIndicator !== "undefined") {
      window.evolutionIndicator = new EvolutionChainIndicator();
    }
  }, 200);
}

function showLoader() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  startKanjiLoader();
}

window.addEventListener("load", () => {
  startKanjiLoader();
});
