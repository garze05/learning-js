import { loadComponent } from "../components/components.js";

// Carga de html de header y footer
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', '/components/header.html');
  loadComponent('footer', '/components/footer.html');
});

addCss('/components/header.css');
addCss('/components/footer.css');
addFavicon();

function addCss(fileName) {

  let head = document.head;
  let link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}

function addFavicon() {
  // Basado en <link rel="icon" type="image/svg+xml" href="/public/javascript.svg" />
  let head = document.head;
  let link = document.createElement("link");

  link.rel = "icon";
  link.type = "image/svg+xml";
  link.href = "/public/javascript.svg";

  head.appendChild(link);
}

/* Añadir la clase de active al link actual automaticamente */
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});