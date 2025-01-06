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

colorDiv.addEventListener('click', () => {
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  colorDiv.style.backgroundColor = "#" + randomColor;
});