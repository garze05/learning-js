/* Ideas 
- al completar tarea que se desplace abajo en una seccion de completadas
- que tenga un limite de caracteres, no que de error si no que corte el input
- poder arrastrar y reordenar las tareas
*/
import { isVoid, showElement, hideElement } from "../../utils/utils";

// Upper form
const formContainer = document.querySelector('#formContainer');
  const addFirstTaskContainer = formContainer.querySelector('#addFirstTaskContainer')
  const todoForm = formContainer.querySelector('#todoForm');
  const todoInput = formContainer.querySelector('#todoInput');

// Filter
const filterContainer = document.querySelector('#filterContainer');
  const filter = filterContainer.querySelector('#filter');

// Lists
const todoListContainer = document.querySelector('#todoListContainer');
  const todoList = todoListContainer.querySelector('#todoList');
const completedListContainer = document.querySelector('#completedListContainer');
  const completedList = completedListContainer.querySelector('#completedList');

// Variables
let todoListCount = 0;
let completedListCount = 0;
let taskCount = 0;

todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que el formulario se envíe, controlamos que pasa con JS

  // Validamos que el input no esté vacío
  const taskText = todoInput.value.trim();

  if (taskText === '') {
    return;
  }

  addTask(taskText);
  todoInput.value = '';
});

function addTask(text, completed = false, date = null) {
  const li = document.createElement('li');

  // Hace que todo el <li> sea arrastrable
  // li.setAttribute('draggable', 'true');

  const format = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: true
  });

  li.innerHTML = `
    <input type="checkbox">
    <div class="task-content">
      <span>${text}</span>
      <p class="date">Fecha creación: ${date === null ? format.format(new Date()) : date}</p>
    </div>
    <button class="btnEdit"></button>
    <button class="btnDelete"></button>
  `;

  // Verificar si la tarea estaba completa por localStorage
  if (completed) {
    li.querySelector('span').classList.add('completed');
    li.querySelector('.date').classList.add('completed');
    li.querySelector('input').checked = true;
    completedList.appendChild(li);
  } else {
    todoList.appendChild(li);
  }

  // Para marcar que esta completada
  li.querySelector('input').addEventListener('change', () => {
    li.querySelector('span').classList.toggle('completed');
    li.querySelector('.date').classList.toggle('completed');
    
    if (li.querySelector('span').classList.contains('completed')) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    saveTasks();
    handleFilterChange(); // Actualizar la vista después de cambiar el estado de la tarea
  });

  // Eliminar tarea
  li.querySelector('.btnDelete').addEventListener('click', (e) => {
    e.stopPropagation();
    li.classList.add('removing');
    li.addEventListener('transitionend', () => {
      deleteTask(li);
      saveTasks();
    });
  });

  // Editar tarea
  li.querySelector('.btnEdit').addEventListener('click', (e) => {
    e.stopPropagation();
    editTask(li);
    console.log("Editando tarea");
  });

  saveTasks();

  // Reiniciar el filtro a "todos" cuando se agrega la primera tarea
  if (todoList.children.length === 1 && completedList.children.length === 0) {
    filter.value = 'all';
    handleFilterChange();
  }

  // Verificar el filtro actual y ocultar la tarea si es necesario
  if (filter.value === 'completed' && !completed) {
    hideElement(li);
  } else if (filter.value === 'uncompleted' && completed) {
    hideElement(li);
  }
}

function deleteTask(task) {
  // if (confirm('¿Estás seguro de eliminar esta tarea?'))
  task.remove();
}

function editTask(task) {
  const btnEdit = task.querySelector('.btnEdit');
  btnEdit.style.backgroundImage = btnEdit.style.backgroundImage.includes('save.svg') 
    ? 'url("/public/edit.svg")' 
    : 'url("/public/save.svg")';
  const span = task.querySelector('span');
  const currentText = span.textContent;
  span.innerHTML = `
  <input type="text" value="${currentText}" />
  `;
  const input = span.querySelector('input');
  input.focus();

  input.addEventListener('blur', () => { // Cuando se pierde el foco
    // Si salimos del input sin escribir nada, regresamos el texto original
    if (isVoid(input)) {
      span.textContent = currentText;
    } else {
      span.textContent = input.value;
      saveTasks();
      btnEdit.style.backgroundImage = 'url("/public/edit.svg")';
    }
  });

  input.addEventListener('keypress', (e) => {
    // Tecla enter o escape
    if (e.key === 'Enter' || e.key === 'Escape') {
      // Si salimos del input sin escribir nada, regresamos el texto original
      if (isVoid(input)) {
        span.textContent = currentText;
      } else {
        span.textContent = input.value;
        saveTasks();
      }
    }
  });
}

function handleFilterChange() {
  
  switch (filter.value) {
    case 'all':
      showElement(todoListContainer);
      showElement(completedListContainer);
      break;
    case 'completed':
        showElement(completedListContainer);
        hideElement(todoListContainer);
      break;
    case 'uncompleted':
        showElement(todoListContainer);
        hideElement(completedListContainer);
      break;
  }
}

function handleCounter() {
  // Obtener cuantos li hay en cada lista
  todoListCount = todoList.children.length;
  completedListCount = completedList.children.length;

  taskCount = todoListCount + completedListCount;

  if (taskCount === 0) {
    handleDownAnimations();
  } else {
    handleUpAnimations();
  }

  console.log(taskCount);

  // Mostrar cuantas tareas hay
  document.getElementById('todoCounter').textContent = todoListCount;
  document.getElementById('completedCounter').textContent = completedListCount;
}

function handleDownAnimations() {
  showElement(addFirstTaskContainer);
  addFirstTaskContainer.classList.remove('fade-out');
  addFirstTaskContainer.classList.add('fade-in');

  hideElement(todoListContainer);
  hideElement(completedListContainer);
  hideElement(filterContainer);

  formContainer.classList.remove('element-up');
  formContainer.classList.add('element-down');
}

function handleUpAnimations() {
  addFirstTaskContainer.classList.remove('fade-in');
  hideElement(addFirstTaskContainer);

  showElement(todoListContainer);
  showElement(filterContainer);
  showElement(completedListContainer);
  todoListContainer.classList.remove('fade-out');
  todoListContainer.classList.add('fade-in');
  filterContainer.classList.remove('fade-out');
  filterContainer.classList.add('fade-in');
  completedListContainer.classList.remove('fade-out');
  completedListContainer.classList.add('fade-in');

  formContainer.classList.remove('element-down');
  formContainer.classList.add('element-up');
}

// Guardar tareas en localStorage
function saveTasks() {
  const allTasks = Array.from(todoList.children).concat(Array.from(completedList.children));
  const tasks = allTasks.map((li) => ({
    text: li.querySelector('span').textContent,
    completed: li.querySelector('span').classList.contains('completed'),
    date: li.querySelector('.date').textContent.replace('Fecha creación: ', '')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  handleCounter();
}

// Cargar tareas desde localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => {
    addTask(task.text, task.completed, task.date);
  });
  filter.addEventListener('change', handleFilterChange);
  handleCounter();
  if (savedTasks.length > 0) {
    handleUpAnimations();
  } else {
    formContainer.classList.remove('element-up');
  }
});


