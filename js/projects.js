// Projects Data - Now with image paths
const projects = [
  {
    title: "FinanceFlow",
    tags: ["Mobile App", "UI/UX"],
    description:
      "A modern banking app redesign focusing on simplicity and security. Features include real-time transactions, budget tracking, and secure biometric authentication.",
    role: "UI/UX Designer",
    duration: "3 months",
    tech: "Figma, React Native",
    image: "./images/project.png" // Add your image path
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "DataViz Pro",
    tags: ["Web App", "Dashboard"],
    description:
      "Analytics dashboard with intuitive data visualization tools. Built for data analysts to create beautiful charts and gain insights quickly.",
    role: "Full Stack Developer",
    duration: "4 months",
    tech: "React, D3.js, Node.js",
    image: "images/dataviz.jpg", // Add your image path
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "MinimalStore",
    tags: ["E-commerce", "Branding"],
    description:
      "Clean e-commerce experience with focus on product photography. Minimalist design that puts products front and center.",
    role: "Frontend Developer",
    duration: "2 months",
    tech: "HTML, CSS, JavaScript",
    image: "images/minimalstore.jpg", // Add your image path
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "TeamSync",
    tags: ["SaaS", "UI Design"],
    description:
      "Collaboration platform designed for remote teams. Features include video calls, task management, and file sharing.",
    role: "Product Designer",
    duration: "5 months",
    tech: "React, Firebase, WebRTC",
    image: "images/teamsync.jpg", // Add your image path
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "WellnessTrack",
    tags: ["Mobile", "Health"],
    description:
      "Health and fitness tracking app with personalized insights. Track workouts, nutrition, and sleep patterns.",
    role: "Mobile Developer",
    duration: "3 months",
    tech: "Flutter, Firebase",
    image: "images/wellness.jpg", // Add your image path
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "CreativeFolio",
    tags: ["Web", "Portfolio"],
    description:
      "Portfolio platform for creative professionals. Showcase your work with beautiful layouts and smooth animations.",
    role: "Web Developer",
    duration: "2 months",
    tech: "React, GSAP, Three.js",
    image: "images/creativefolio.jpg", // Add your image path
    liveUrl: "#",
    codeUrl: "#",
  },
];

// Initialize Carousel
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentSlide = 0;
  let itemsPerSlide = getItemsPerSlide();

  // Create project cards with images
  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${project.image}" alt="${
      project.title
    }" class="project-image" onerror="this.style.display='none'">
      <h3>${project.title}</h3>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <p>${project.description}</p>
    `;
    card.addEventListener("click", () => openModal(project));
    track.appendChild(card);
  });

  // Create dots
  const totalDots = Math.ceil(projects.length / itemsPerSlide);
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  // Get items per slide based on screen size
  function getItemsPerSlide() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  // Update carousel
  function updateCarousel() {
    const cardWidth = track.querySelector(".project-card").offsetWidth;
    const gap = 20;
    const offset = -currentSlide * itemsPerSlide * (cardWidth + gap);

    gsap.to(track, {
      x: offset,
      duration: 0.6,
      ease: "power2.out",
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // Update buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= totalDots - 1;
  }

  // Go to slide
  function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, totalDots - 1));
    updateCarousel();
  }

  // Navigation
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < totalDots - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) nextBtn.click();
    if (touchEndX - touchStartX > 50) prevBtn.click();
  }

  // Resize handler
  window.addEventListener("resize", () => {
    const newItemsPerSlide = getItemsPerSlide();
    if (newItemsPerSlide !== itemsPerSlide) {
      itemsPerSlide = newItemsPerSlide;
      currentSlide = 0;
      updateCarousel();
    }
  });

  updateCarousel();
});

// Modal Functions with GSAP Animations
function openModal(project) {
  const modal = document.getElementById("projectModal");

  // Populate modal with image
  modal.querySelector(".modal-image").src = project.image;
  modal.querySelector(".modal-image").alt = project.title;
  modal.querySelector(".modal-title").textContent = project.title;
  modal.querySelector(".modal-desc").textContent = project.description;
  modal.querySelector(".modal-role").textContent = project.role;
  modal.querySelector(".modal-duration").textContent = project.duration;
  modal.querySelector(".modal-tech").textContent = project.tech;

  const tagsContainer = modal.querySelector(".modal-tags");
  tagsContainer.innerHTML = "";
  project.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  modal.querySelector(".modal-btn.primary").href = project.liveUrl;
  modal.querySelector(".modal-btn.secondary").href = project.codeUrl;

  // Show modal
  modal.classList.add("active");

  // GSAP Animations
  const tl = gsap.timeline();

  // Overlay fade in
  tl.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 });

  // Container scale and fade
  tl.fromTo(
    ".modal-container",
    { scale: 0.8, opacity: 0, y: 50 },
    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" },
    "-=0.2"
  );

  // Image animation - zoom and fade
  tl.fromTo(
    ".modal-image-wrapper",
    { scale: 0, rotation: -10 },
    { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.5)" },
    "-=0.2"
  );

  // Title slide in
  tl.fromTo(
    ".modal-title",
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4 },
    "-=0.3"
  );

  // Tags stagger
  tl.fromTo(
    ".modal-tags .tag",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3, stagger: 0.1 },
    "-=0.2"
  );

  // Content sections stagger
  tl.fromTo(
    [".modal-section", ".modal-details"],
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.15 },
    "-=0.2"
  );

  // Detail items stagger
  tl.fromTo(
    ".detail-item",
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.3, stagger: 0.1 },
    "-=0.3"
  );

  // Buttons bounce in
  tl.fromTo(
    ".modal-btn",
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.5)",
    },
    "-=0.2"
  );

  // Close button rotation
  tl.fromTo(
    ".modal-close",
    { rotation: -180, scale: 0 },
    { rotation: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
    "-=0.5"
  );
}

function closeModal() {
  const modal = document.getElementById("projectModal");

  // GSAP Close Animation
  const tl = gsap.timeline({
    onComplete: () => modal.classList.remove("active"),
  });

  tl.to(".modal-container", {
    scale: 0.8,
    opacity: 0,
    y: 50,
    duration: 0.3,
    ease: "power2.in",
  });

  tl.to(
    ".modal-overlay",
    {
      opacity: 0,
      duration: 0.2,
    },
    "-=0.1"
  );
}

// Modal Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".modal-overlay").addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
