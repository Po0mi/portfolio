// Add this to your JavaScript file or in a <script> tag
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }

  // Optional: Update scroll progress indicator
  const scrollProgress =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  backToTopButton.style.setProperty("--progress", scrollProgress + "%");
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
