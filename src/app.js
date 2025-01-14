import { loadComponent } from "./utils/components.js";

const header = document.querySelector('header');
const footer = document.querySelector('footer');

// function addCss(fileName) {

//   let head = document.head;
//   let link = document.createElement("link");

//   link.type = "text/css";
//   link.rel = "stylesheet";
//   link.href = fileName;

//   head.appendChild(link);
// }

function addFavicon(icon) {
  // Basado en <link rel="icon" type="image/svg+xml" href="/javascript.svg" />
  let head = document.head;
  let link = document.createElement("link");

  link.rel = "icon";
  link.type = "image/svg+xml";
  link.href = icon;

  head.appendChild(link);
}

/* Añadir la clase de active al link actual automaticamente */
function updateCurrentNavPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
// Esperar a que todo esté listo
Promise.all([
  document.fonts.ready,
  loadComponent('header', '/src/components/header/header.html'),
  loadComponent('footer', '/src/components/footer/footer.html'),
  addFavicon('/javascript.svg'),
  
]).then(() => {
  updateCurrentNavPage(),
  document.body.classList.remove('invisible-until-loaded');
  document.body.classList.add('content-loaded');
  header.classList.remove('component-placeholder');
  footer.classList.remove('component-placeholder');
});
});