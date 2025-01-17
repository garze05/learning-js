import { loadComponent } from "./utils/components.js";

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

  ("Favicon cargado");
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
  // Solo incluir en Promise.all las operaciones de carga realmente asíncronas
  Promise.all([
    document.fonts.ready,
    loadComponent('header', '/header.html'),
    loadComponent('footer', '/footer.html')
  ])
  .then(() => {
    // Primero las operaciones que afectan al contenido/estructura
    updateCurrentNavPage();
    addFavicon('/javascript.svg');  // Esto puede ir después ya que no es crítico para el layout

    // Luego, en el siguiente frame, las operaciones visuales
    requestAnimationFrame(() => {
      document.body.classList.remove('invisible-until-loaded');
      document.body.classList.add('content-loaded');
      
      // Usar querySelector para mayor seguridad
      const header = document.querySelector('#header');
      const footer = document.querySelector('#footer');
      if (header) header.classList.remove('component-placeholder');
      if (footer) footer.classList.remove('component-placeholder');
    });
  })
  .catch(error => {
    console.error('Error durante la carga:', error);
    // Asegurar que la página sea visible incluso si algo falla
    document.body.classList.remove('invisible-until-loaded');
  });
});