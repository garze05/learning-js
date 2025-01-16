import { lightOrDark } from "../../utils/colors";

// Funciones generales
function hideElement(element) {
  if (element.style.display !== 'none') {
    element.style.display = 'none';
  }
  return element.style.display;
}

function showElement(element) {
  if (element.style.display === 'none') {
    element.style.display = 'flex';
    element.style.justifyContent = 'center';
    element.style.alignItems = 'center';
    element.style.alignSelf = 'center';
  }
  return element.style.display;
}

/* CONTADOR MAS Y MENOS  */
const contador = document.getElementById('contador');
const btnIncrement = document.getElementById('btnIncrement');
const btnDecrement = document.getElementById('btnDecrement');
const resetBtn = document.getElementById('btnReset');
let count = 0; // Initial countdown

// Escuchar boton de incremento
btnIncrement.addEventListener('click', () => {
    count++;
    contador.innerText = count;
});

// Escuchar boton de decremento
btnDecrement.addEventListener('click', () => {
  count--;
  contador.innerText = count;
})

// Reset
resetBtn.addEventListener('click', () => {
  count = 0;
  contador.innerText = count;
});

//--------------------------//
//* CAMBIAR COLOR DE DIV *//
const colorDiv = document.getElementById('colorDiv');
const changeBtn = document.getElementById('btnChange');
const currentColorText = document.querySelector('#colorDivContainer p')

let auto = true;
let intervalId;
let color;

function updateColorText(){
  currentColorText.textContent = "Color: #" + color;
}

function randomColor() {
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

function changeDivColor() {
  colorDiv.style.backgroundColor = "#" + color;
  console.log(lightOrDark(color));
  if (lightOrDark(color) === 'dark') {
    colorDiv.style.color = 'white';
  } else {
    colorDiv.style.color = 'black';
  }
}

function startAutoChange() {
  intervalId = setInterval(function() { color = randomColor(); changeDivColor(); updateColorText();} , 1000);
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
    
    colorDiv.addEventListener('click', function() { 
      color = randomColor(); 
      changeDivColor(); 
      updateColorText();
    });
  } else {
    changeBtn.innerText = 'Cambio de color: Automático';
    colorDiv.innerText = '';
    colorDiv.style.cursor = '';
    colorDiv.removeEventListener('click', function() { color = randomColor(); changeDivColor(); updateColorText();});
    startAutoChange();
  }
});

if (auto) {
  color = randomColor();
  changeDivColor();
  updateColorText();
  startAutoChange();
}

//-----------------------//
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
      item.style.color = 'black';
    } else {
      item.style.color = 'lightgray';
    }
  });
});

/// Galeria de imagenes dinamica

// Antes de mostrar la galeria
const imgNumberInput = document.getElementById('numberOfImgs');
let imgNumber = 0;
const btnGenerate = document.getElementById('btnGenerate');


// Galeria
const nextBtn = document.getElementById('btnNext');
const prevBtn = document.getElementById('btnPrev');
const caption = document.getElementById('caption');
const btnCambiarNImgs = document.getElementById('btnCambiarNImgs');
const galleryContainer = document.getElementById('galleryContainer');
let imgs;
let currentImg = 0;

btnGenerate.addEventListener('click', () => {
  imgNumber = imgNumberInput.value; // const imgNumber = imgs.length;
  
  if (imgNumber < 2) { 
    alert('Debe haber al menos dos imagenes');
    return;
  }

  if (currentImg > imgNumber - 1) {
    currentImg = imgNumber - 1;
  }

  hideElement(btnGenerate);
  hideElement(imgNumberInput);

  // Ejecucion inicial
  generateImgs();

  // Mostrar galeria
  showElement(galleryContainer);
  showElement(caption)
  showElement(nextBtn);
  showElement(prevBtn);
  showElement(btnCambiarNImgs);
})

btnCambiarNImgs.addEventListener('click', () => {
  hideElement(galleryContainer);
  hideElement(caption);
  hideElement(nextBtn);
  hideElement(prevBtn);
  hideElement(btnCambiarNImgs);
  
  showElement(btnGenerate);
  showElement(imgNumberInput);
});

// function generateImgs() {
//   for (let i = 0; i < imgNumber; i++) {
//     const newImg = document.createElement('img');
//     newImg.setAttribute('src', `https://picsum.photos/300?random=${i+1}`);
//     newImg.setAttribute('alt', `Imagen ${i+1}`);
//     // newImg.style.display = 'none'; de esto se encarga updateImage()
//     galleryContainer.appendChild(newImg);
//   }
//   imgs = galleryContainer.getElementsByTagName('img');
// }

async function generateImgs() {
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.style.display = 'block'; // Mostrar el spinner

  try {
    const response = await fetch(`https://picsum.photos/v2/list?limit=${imgNumber}`);
    if (!response.ok) {
      throw new Error('Error al obtener las imágenes');
    }
    const data = await response.json();
    data.forEach((imgData, i) => {
      const newImg = document.createElement('img');
      newImg.setAttribute('src', imgData.download_url);
      newImg.setAttribute('alt', `Imagen ${i+1}`);
      newImg.setAttribute('height', 300);
      galleryContainer.appendChild(newImg);
    });
    imgs = galleryContainer.getElementsByTagName('img');
    updateImage();
    updateCaption();
  }
  catch (error) {
    console.error(error);
    alert('Hubo un error al cargar las imágenes. Inténtalo de nuevo.');
  } finally {
    loadingSpinner.style.display = 'none'; // Ocultar el spinner
  }
}

function updateCaption() {
  caption.innerText = `Imagen ${currentImg+1} de ${imgNumber}`;
}

function updateImage() {
  Array.from(imgs).forEach(img => {
    img.style.display = 'none';
  });
  imgs[currentImg].style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  if ((currentImg+1) < imgNumber) {
    currentImg++;
    updateImage();
    updateCaption();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentImg > 0) {
    currentImg--;
    updateImage();
    updateCaption();
  }
});

// window.addEventListener(
//   "keydown",
//   (event) => {
//     const p = document.createElement("p");
//     p.textContent = `KeyboardEvent: key='${event.key}' | code='${event.code}'`;
//     document.getElementById("output").appendChild(p);
//     window.scrollTo(0, document.body.scrollHeight);
//   },
//   true,
// );