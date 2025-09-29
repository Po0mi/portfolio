class EvolutionChainIndicator {
  constructor() {
    this.nodes = document.querySelectorAll(".kanji-node");
    this.progressLine = document.getElementById("progressLine");
    this.progressDots = document.querySelectorAll(".progress-dot");
    this.currentSection = 0;

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateProgress();
  }

  attachEventListeners() {
    // Scroll listener
    window.addEventListener("scroll", () => this.updateProgress());

    // Node click listeners
    this.nodes.forEach((node, index) => {
      node.addEventListener("click", () => this.navigateToSection(index));
    });

    // Resize listener
    window.addEventListener("resize", () => this.updateProgress());
  }

  updateProgress() {
    const scrolled = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((scrolled / maxScroll) * 100, 100);

    // Update progress line
    if (this.progressLine) {
      this.progressLine.style.height = progress + "%";
    }

    // Calculate current section
    const sectionIndex = Math.floor((progress / 100) * this.nodes.length);
    const currentSection = Math.min(sectionIndex, this.nodes.length - 1);

    // Update nodes
    this.updateNodes(currentSection, progress);

    // Update progress dots
    this.updateProgressDots(currentSection);
  }

  updateNodes(currentSection, progress) {
    this.nodes.forEach((node, index) => {
      // Remove all state classes
      node.classList.remove("evolved", "current");

      if (index < currentSection) {
        // Previous sections are evolved
        node.classList.add("evolved");
      } else if (index === currentSection) {
        // Current section
        node.classList.add("current");
      }
      // Future sections remain in default state
    });
  }

  updateProgressDots(currentSection) {
    this.progressDots.forEach((dot, index) => {
      if (index <= currentSection) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  navigateToSection(sectionIndex) {
    const progress = (sectionIndex / (this.nodes.length - 1)) * 100;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (progress / 100) * maxScroll;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }

  // Method to manually set section (useful for specific page sections)
  setCurrentSection(sectionIndex) {
    this.currentSection = Math.max(
      0,
      Math.min(sectionIndex, this.nodes.length - 1)
    );
    this.updateNodes(
      this.currentSection,
      (this.currentSection / (this.nodes.length - 1)) * 100
    );
    this.updateProgressDots(this.currentSection);
  }
}

// Initialize the indicator
document.addEventListener("DOMContentLoaded", () => {
  window.evolutionIndicator = new EvolutionChainIndicator();
});

// Example of manual section setting (optional)
// window.evolutionIndicator.setCurrentSection(2); // Set to Skills section
