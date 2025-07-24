import { loadComponent } from "./utils/components.js";
// function addCss(fileName) {

//   let head = document.head;
//   let link = document.createElement("link");

//   link.type = "text/css";
//   link.rel = "stylesheet";
//   link.href = fileName;

//   head.appendChild(link);
// }

export const basePath = import.meta.env.BASE_URL;
// console.log("basePath:",basePath);
updatePaths();

function updatePaths() {
  // Define paths to skip
  const skipPaths = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "http://",
    "https://",
    "//",
    "/learning-js/",
  ];

  // Helper function to check if path should be updated
  const shouldUpdatePath = (path) => {
    if (!path) return false;
    return (
      path.startsWith("/") && !skipPaths.some((skip) => path.includes(skip))
    );
  };

  // Images - only local images
  document.querySelectorAll('img[src^="/"]').forEach((img) => {
    const originalSrc = img.getAttribute("src");
    if (shouldUpdatePath(originalSrc)) {
      img.setAttribute("src", originalSrc.replace(/^\//, basePath));
    }
  });

  // Stylesheets - only local styles
  document
    .querySelectorAll('link[rel="stylesheet"][href^="/"]')
    .forEach((link) => {
      const originalHref = link.getAttribute("href");
      if (shouldUpdatePath(originalHref)) {
        link.setAttribute("href", originalHref.replace(/^\//, basePath));
      }
    });

  // Links and iframes - only local paths
  document
    .querySelectorAll('a[href^="/"], iframe[src^="/"]')
    .forEach((element) => {
      const isLink = element.tagName.toLowerCase() === "a";
      const attr = isLink ? "href" : "src";
      const originalValue = element.getAttribute(attr);

      if (shouldUpdatePath(originalValue)) {
        element.setAttribute(attr, originalValue.replace(/^\//, basePath));
      }
    });

  // Module Scripts - only local scripts
  document
    .querySelectorAll('script[type="module"][src^="/"]')
    .forEach((script) => {
      const originalSrc = script.getAttribute("src");
      if (shouldUpdatePath(originalSrc)) {
        script.setAttribute("src", originalSrc.replace(/^\//, basePath));
      }
    });
}

// Test cases to add:
// const testPath = '/src/pages/';
// console.log('basePath:', basePath);
// console.log('Original:', testPath);
// console.log('Modified:', testPath.replace(/^\/(?!\/)/, '/learning-js/'));

// Contenedor que deberian de tener todos los main
export const container = document.querySelector("div .container");

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
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Solo incluir en Promise.all las operaciones de carga realmente asíncronas
  Promise.all([
    document.fonts.ready,
    loadComponent("header", `${basePath}header.html`),
    loadComponent("footer", `${basePath}footer.html`),
  ])
    .then(() => {
      updatePaths(),
        // Primero las operaciones que afectan al contenido/estructura
        updateCurrentNavPage();
      addFavicon(`${basePath}javascript.svg`); // Esto puede ir después ya que no es crítico para el layout

      // Luego, en el siguiente frame, las operaciones visuales
      requestAnimationFrame(() => {
        document.body.classList.remove("invisible-until-loaded");
        document.body.classList.add("content-loaded");

        // Usar querySelector para mayor seguridad
        const header = document.querySelector("#header");
        const footer = document.querySelector("#footer");
        if (header) header.classList.remove("component-placeholder");
        if (footer) footer.classList.remove("component-placeholder");
      });
    })
    .catch((error) => {
      console.error("Error durante la carga:", error);
      // Asegurar que la página sea visible incluso si algo falla
      document.body.classList.remove("invisible-until-loaded");
    });
});
