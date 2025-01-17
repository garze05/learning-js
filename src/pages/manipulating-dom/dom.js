/// Redirect to HTML
//setTimeout (function () { window. location. href = "basics.html"; }, 10);

/*MANIPULANDO EL DOM*/

/// Seleccionar elementos
// getElementbyId: Elemento con id especifico
const title = document.getElementById('title');
// querySelector: Primer elemento con el selector especificado
const mainDiv = document.querySelector('.main-div'); //. al inicio porque es una clase
const image = document.querySelector('img');
// querySelectorAll: Todos los elementos con el selector especificado
const listItems = document.querySelectorAll('ul.list > li');

/// Modificar elementos
title.innerText = 'Manipulando el DOM';
// También se pueden anadir otros elementos HTML
title.innerHTML = '<em>Manipulando el DOM 2</em>';
// Modificar atributos
image.setAttribute('src', '/vite.svg');
// Annadir clases
image.classList.add('img-fluid');
// Remover clase
// image.classList.remove('img-fluid');
// Modificar estilos en linea
mainDiv.style.backgroundColor = '#ffcc00';

/// Eliminar elementos
const oldDiv = document.querySelector('.old-div');
oldDiv.remove();

// Crear elementos e insertarlos
const newDiv = document.createElement('div');
const footer = document.querySelector('footer');
newDiv.innerText = 'Soy un nuevo div';
newDiv.classList.add('new-div');
document.body.insertBefore(newDiv, footer);
// Para añadirlos directamente como hijo al body de último
//document.body.appendChild(elemento);

// Eventos
// Todos los eventos disponibles: https://developer.mozilla.org/en-US/docs/Web/Events
const button = document.querySelector('button');

function showMessage(message) {
    alert(message);
}

// Asignar un evento a un elemento
// si no se pone bind, el evento se ejecuta inmediatamente
// esto porque el evento espera una funcion y no una llamada a funcion
button.addEventListener('click', showMessage.bind(null, 'Hola mundo')); // el null se refiere al this
// Tambien se puede hacer con arrow functions
//button.addEventListener('click', () => showMessage("Hola mundo"));

// Añadiendo items a una lista dinamicamente
const input = document.querySelector('#itemInput');
const addButton = document.querySelector('#addButton');
const list = document.querySelector('#dynamicList');

addButton.addEventListener('click', function() {
    if (input.value.trim() === '') {
        alert('El campo no puede estar vacio');
        return;
    }

    const newItem = document.createElement('li');
    newItem.innerText = input.value;
    list.appendChild(newItem);
    input.value = '';
})

// Eliminando items de una lista dinamicamente
list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.remove();
    }
})

const filterInput = document.querySelector('#filterInput');
const itemsList = document.querySelector('.list');

filterInput.addEventListener('keyup', function() {
  const term = filterInput.value.toLowerCase();
  const items = itemsList.getElementsByTagName('li'); // Esto devuelve una lista de nodos del DOM

  Array.from(items).forEach(function(item) {
    if (item.textContent.toLowerCase().indexOf(term) != -1) {
      item.style.display = 'block';
    }
    else {
      item.style.display = 'none';
    }
  })
});

const draggables = document.querySelectorAll('.draggable');
const dropzone = document.getElementById('dropzone');
const draggablesContainer = document.querySelector('.container');
let draggableParent;

let draggedElement = null;

// Añadir eventos a cada elemento arrastrable
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', function(event) {
    draggedElement = this; // Guarda el elemento que se está arrastrando
    setTimeout(() => { this.style.display = 'none'; }, 0); // Ocultar temporalmente
    console.log(`Arrastrando: ${this.id}`);
  });

  draggable.addEventListener('dragend', function(event) {
    this.style.display = 'block'; // Mostrar nuevamente
    console.log(`Finalizó el arrastre: ${this.id}`);
  });
});

dropzone.addEventListener('dragover', function(event) {
  event.preventDefault();
  this.style.borderColor = 'red';
  dropzone.style.borderWidth = '4px';
});

dropzone.addEventListener('drop', function(event) {
  event.preventDefault();
  if (draggedElement) {
    this.appendChild(draggedElement); // Mueve el elemento arrastrado al área de destino
    console.log(`Elemento soltado: ${draggedElement.id}`);
  }
  this.style.borderWidth = ''; // Restaurar estilo original
  this.style.borderColor = ''; // Restaurar estilo original
});

draggablesContainer.addEventListener('dragover', function(event) {
  event.preventDefault();
});

draggablesContainer.addEventListener('drop', function(event) {
  event.preventDefault();
  if (draggedElement) {
    this.appendChild(draggedElement); // Mueve el elemento arrastrado al área de destino
    console.log(`Elemento soltado: ${draggedElement.id}`);
  }
  dropzone.style.borderWidth = ''; // Restaurar estilo original
  dropzone.style.borderColor = ''; // Restaurar estilo original
});