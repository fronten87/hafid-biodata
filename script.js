const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  updateThemeIcon();
});

function updateThemeIcon() {
  const isLight = root.getAttribute("data-theme") === "light";
  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

/* Typing effect */
const words = ["Pelajar", "IT Enthusiast", "Future Programmer"];
let wordIndex = 0, charIndex = 0, deleting = false;
const typing = document.getElementById("typing");

function typeEffect() {
  const current = words[wordIndex];
  typing.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = deleting ? 55 : 90;
  if (!deleting && charIndex > current.length) {
    deleting = true; delay = 1300;
  } else if (deleting && charIndex < 0) {
    deleting = false; wordIndex = (wordIndex + 1) % words.length; charIndex = 0; delay = 350;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

/* Scroll reveal */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* Demo form: frontend only, no backend/email service */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formNote").textContent =
    "Pesan siap dikirim. Hubungkan form ini ke layanan/backend jika ingin benar-benar menerima pesan.";
  e.target.reset();
});
