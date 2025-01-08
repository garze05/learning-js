/// Contador
const contador = document.getElementById('contador');
const contadorBtn = document.getElementById('btnIncrement');
const resetBtn = document.getElementById('btnReset');
let count = 0; // Initial countdown

// Escuchar boton de incremento
contadorBtn.addEventListener('click', () => {
    count++;
    contador.innerText = count;
});

// Reset
resetBtn.addEventListener('click', () => {
  count = 0;
  contador.innerText = count;
});

/// Cambiar color de div
const colorDiv = document.getElementById('colorDiv');
const changeBtn = document.getElementById('btnChange');
let auto = true;
let intervalId;

function randomColor() {
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  colorDiv.style.backgroundColor = "#" + randomColor;
}

function startAutoChange() {
  intervalId = setInterval(randomColor, 1000);
}

function stopAutoChange() {
  clearInterval(intervalId);
}

changeBtn.addEventListener('click', () => {
  auto = !auto;
  if (auto === false) {
    changeBtn.innerText = 'Cambio de color: Manual';
    colorDiv.innerText = 'Hazme click';
    colorDiv.style.cursor = 'pointer';
    stopAutoChange();
    colorDiv.addEventListener('click', randomColor);
  } else {
    changeBtn.innerText = 'Cambio de color: Automático';
    colorDiv.innerText = '';
    colorDiv.style.cursor = '';
    colorDiv.removeEventListener('click', randomColor);
    startAutoChange();
  }
});

if (auto) {
  startAutoChange();
}

/// Lista dinamica
const btnAdd = document.querySelector('#addButton');
const input = document.querySelector('#itemInput');
const list = document.getElementById('dynamicList');

btnAdd.addEventListener('click', () => {
  // Comprobemos que el input no esté vacío
  if (input.value.trim() === '') { // Cortar los espacios en blanco
    alert("El campo no puede estar vacío");
    return;
  }

  const newItem = document.createElement('li');
  newItem.innerText = input.value;
  list.appendChild(newItem); // Agregar el nuevo item a la lista
  input.value = ''; // Limpiar el input
});

// Soporte para enter
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) { // Enter
    btnAdd.click();
  }
});

// Filtrar lista
input.addEventListener('keyup', () => {
  const term = input.value.toLowerCase(); // Para comparar en minúsculas
  const items = list.getElementsByTagName('li'); // Lista de nodos

  Array.from(items).forEach(item => {
    if (item.textContent.toLowerCase().indexOf(term) != -1){ // Si el término está en el texto
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

/// Galeria de imagenes
const imgs = document.querySelectorAll('img');
const imgNumber = imgs.length;
const nextBtn = document.getElementById('btnNext');
const prevBtn = document.getElementById('btnPrev');
const caption = document.getElementById('caption');
let currentImg = 0;

caption.innerText = `Imagen ${currentImg+1} de ${imgNumber}`;

nextBtn.addEventListener('click', () => {
  if (currentImg < imgNumber) {
    imgs[currentImg - 1].style.display = 'none';
    imgs[currentImg].style.display = 'block';
    currentImg++;
    caption.innerText = `Imagen ${currentImg} de ${imgNumber}`;
  }
});

prevBtn.addEventListener('click', () => {
  if (currentImg > 1) {
    imgs[currentImg - 1].style.display = 'none';
    imgs[currentImg - 2].style.display = 'block';
    currentImg--;
    caption.innerText = `Imagen ${currentImg} de ${imgNumber}`;
  }
});
console.log(imgs);
