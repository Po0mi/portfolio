const projectsData = {
  featured: {
    id: 0,
    title: "Web Base Management System",
    type: "Full-Stack Application",
    description:
      "Modern Web Base management system with secure payments, inventory management, and admin dashboard.",
    image: "images/project.png",
    tech: ["PHP", "HTML", "CSS", "JavaScript"],
    links: [
      {
        text: "Live",
        icon: "fas fa-external-link-alt",
        url: "https://philippineredcross-iloilochapter.org",
      },
      {
        text: "GitHub",
        icon: "fab fa-github",
        url: "https://github.com/Po0mi/prc_management",
      },
    ],
    meta: {
      type: "Full-Stack Application",
      status: "Live & Active",
      users: "500+ Daily",
    },
  },
  others: [
    {
      id: 1,
      title: "Portfolio Project",
      type: "Website",
      description:
        "Project Portfolio for a friend featuring modern design and interactive elements.",
      image: "images/project2.png",
      tech: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Live",
          icon: "fas fa-external-link-alt",
          url: "https://po0mi.github.io/project",
        },
        {
          text: "Source",
          icon: "fab fa-github",
          url: "https://github.com/Po0mi/project",
        },
      ],
      meta: {
        type: "Website",
        status: "Completed",
        users: "Personal Project",
      },
    },
    {
      id: 2,
      title: "Black Jack Game",
      type: "Game",
      description:
        "A simple Black jack game with intuitive UI using Python and modern design principles.",
      image: "images/project3.png",
      tech: ["Python"],
      links: [
        {
          text: "Download",
          icon: "fas fa-download",
          url: "https://github.com/Po0mi/Simple-python-blackjack",
        },
        {
          text: "Source",
          icon: "fab fa-github",
          url: "https://github.com/Po0mi/Simple-python-blackjack",
        },
      ],
      meta: {
        type: "Game",
        status: "Completed",
        users: "Single Player",
      },
    },
    {
      id: 3,
      title: "School Project Portfolio",
      type: "Website",
      description:
        "Academic portfolio project showcasing web development skills and design capabilities.",
      image: "images/project4.png",
      tech: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Live",
          icon: "fas fa-external-link-alt",
          url: "https://po0mi.github.io/De-Castro_Finals",
        },
        {
          text: "Source",
          icon: "fab fa-github",
          url: "https://github.com/Po0mi/De-Castro_Finals",
        },
      ],
      meta: {
        type: "Website",
        status: "Academic Project",
        users: "Portfolio",
      },
    },
    {
      id: 4,
      title: "Python Calculator",
      type: "Desktop App",
      description:
        "A fully functional calculator application built with Python featuring basic arithmetic operations, advanced mathematical functions, and an intuitive GUI interface using Tkinter.",
      image: "images/project5.jpg",
      tech: ["Python"],
      links: [
        {
          text: "Download",
          icon: "fas fa-download",
          url: "https://github.com/Po0mi/calculator",
        },
        {
          text: "Source",
          icon: "fab fa-github",
          url: "https://github.com/Po0mi/calculator",
        },
      ],
      meta: {
        type: "Desktop App",
        status: "Completed",
        users: "Personal Tool",
      },
    },
  ],
};

let isSwapping = false;

function swapProjects(clickedProjectId) {
  if (isSwapping) return;

  isSwapping = true;
  const featuredProject = document.getElementById("featuredProject");
  const otherProjects = document.getElementById("otherProjects");

  // Add loading state
  featuredProject.classList.add("loading");
  otherProjects.classList.add("loading");

  // Start swap animation
  featuredProject.classList.add("swapping-out");

  setTimeout(() => {
    // Find the clicked project data
    const newFeaturedData = projectsData.others.find(
      (p) => p.id === clickedProjectId
    );
    const currentFeaturedData = projectsData.featured;

    // Update featured project data
    projectsData.featured = newFeaturedData;

    // Move current featured to others array
    const clickedIndex = projectsData.others.findIndex(
      (p) => p.id === clickedProjectId
    );
    projectsData.others[clickedIndex] = currentFeaturedData;

    // Update DOM
    updateFeaturedProject(newFeaturedData);
    updateOtherProjects();

    // Remove swap out animation and add swap in
    featuredProject.classList.remove("swapping-out");
    featuredProject.classList.add("swapping-in");

    setTimeout(() => {
      featuredProject.classList.remove("swapping-in");
      featuredProject.classList.remove("loading");
      otherProjects.classList.remove("loading");
      isSwapping = false;
    }, 500);
  }, 250);
}

function updateFeaturedProject(data) {
  document.getElementById(
    "featuredImage"
  ).style.backgroundImage = `url('${data.image}')`;
  document.getElementById("featuredTitle").textContent = data.title;
  document.getElementById("featuredDescription").textContent = data.description;

  // Update tech tags
  const techContainer = document.getElementById("featuredTech");
  techContainer.innerHTML = data.tech
    .map((tech) => `<span class="tech-tag">${tech}</span>`)
    .join("");

  // Update links
  const linksContainer = document.getElementById("featuredLinks");
  linksContainer.innerHTML = data.links
    .map(
      (link) =>
        `<a href="${link.url}" class="featured-link">
      <i class="${link.icon}"></i>
      ${link.text}
    </a>`
    )
    .join("");

  // Update meta
  const metaContainer = document.getElementById("featuredMeta");
  metaContainer.innerHTML = `
    <div class="meta-item">
      <span class="meta-label">Type</span>
      <span class="meta-value">${data.meta.type}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Status</span>
      <span class="meta-value">${data.meta.status}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Users</span>
      <span class="meta-value">${data.meta.users}</span>
    </div>
  `;
}

function updateOtherProjects() {
  const container = document.getElementById("otherProjects");
  container.innerHTML = projectsData.others
    .map(
      (project) => `
    <div class="other-project" data-project="${project.id}">
      <div class="other-project-image" style="background-image: url('${
        project.image
      }')"></div>
      <h4>${project.title}</h4>
      <p class="other-project-type">${project.type}</p>
      <p class="other-project-desc">${project.description.substring(
        0,
        80
      )}...</p>
      <div class="other-project-tech">
        ${project.tech
          .slice(0, 3)
          .map((tech) => `<span class="other-tech-tag">${tech}</span>`)
          .join("")}
      </div>
    </div>
  `
    )
    .join("");

  // Re-attach event listeners
  attachOtherProjectListeners();
}

function attachOtherProjectListeners() {
  document.querySelectorAll(".other-project").forEach((project) => {
    project.addEventListener("click", (e) => {
      const projectId = parseInt(e.currentTarget.dataset.project);
      swapProjects(projectId);
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  attachOtherProjectListeners();
});
