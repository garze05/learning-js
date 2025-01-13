function addCss(fileName) {

  let head = document.head;
  let link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}

const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Components for the header and footer
header.innerHTML = 
`
<header>
  <div class="header-container">
    <h1>learning-js</h1>
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/src/manipulating-dom/">Manipulando el DOM</a></li>
        <li><a href="/src/basic-exercises/">Ejercicios básicos</a></li>
      </ul>
    </nav>
  </div>
</header>
`

footer.innerHTML = 
`
<footer>
  <div class="footer-container">
    <p>&copy; 2025 <a href="https://github.com/garze05">garze05</a></p>
  </div>
</footer>
`

addCss('/src/header.css');
addCss('/src/footer.css');