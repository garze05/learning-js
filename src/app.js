import { loadComponent } from "../components/components.js";

// Carga de html de header y footer
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', '/components/header.html');
  loadComponent('footer', '/components/footer.html');
});

addCss('/components/header.css');
addCss('/components/footer.css');
addFavicon();
addFont("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap");

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

function addFont(linkfont) {
  let head = document.head;
  let link1 = document.createElement("link");
  let link2 = document.createElement("link");
  let link3 = document.createElement("link");

  link1.rel, link2.rel = "preconnect";
  link1.href = "https://fonts.googleapis.com";
  link2.href = "https://fonts.gstatic.com";
  link3.href = linkfont
  link3.rel = "stylesheet";

  head.appendChild(link1);
  head.appendChild(link2);
  head.appendChild(link3)
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