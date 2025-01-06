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