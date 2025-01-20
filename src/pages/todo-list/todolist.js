import { isVoid, showElement, hideElement } from "../../utils/utils";

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que el formulario se envíe, controlamos que pasa con JS

  // Validamos que el input no esté vacío
  const taskText = todoInput.value.trim();

  if (taskText === '') {
    alert('El campo no puede estar vacío');
    return;
  }

  addTask(taskText);
  todoInput.value = '';
});


// Modificar la función addTask para incluir almacenamiento
function addTask(text, completed = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox">
    <span>${text}</span>
    <button class=btnEdit>Editar</button>
    <button class="btnDelete">Eliminar</button>
  `;

  // Verificar si la tarea estaba completa por localStorage
  if (completed) {
    li.querySelector('span').classList.add('completed');
    li.querySelector('input').checked = true;
  }

  // Para marcar que esta completada
  li.querySelector('input').addEventListener('change', () => {
    li.querySelector('span').classList.toggle('completed');
    saveTasks();
    handleFilterChange(); // Actualizar la vista después de cambiar el estado de la tarea
  });

  li.querySelector('.btnDelete').addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el evento se propague a los padres
    deleteTask(li);
    saveTasks();
  });

  li.querySelector('.btnEdit').addEventListener('click', (e) => {
    e.stopPropagation();
    editTask(li);
    console.log("Editando tarea");
  });

  todoList.appendChild(li);
  saveTasks();

  // Reiniciar el filtro a "todos" cuando se agrega la primera tarea
  if (todoList.children.length === 1) {
    document.getElementById('filter').value = 'all';
    handleFilterChange();
  }

  // Verificar el filtro actual y ocultar la tarea si es necesario
  const filterValue = document.getElementById('filter').value;
  if (filterValue === 'completed' && !completed) {
    hideElement(li);
  } else if (filterValue === 'uncompleted' && completed) {
    hideElement(li);
  }
}

function deleteTask(task) {
  // if (confirm('¿Estás seguro de eliminar esta tarea?'))
  task.remove();
}

function editTask(task) {
  task.querySelector('.btnEdit').innerText === 'Guardar' ? task.querySelector('.btnEdit').innerText = 'Editar' : task.querySelector('.btnEdit').innerText = 'Guardar';
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
      task.querySelector('.btnEdit').innerText = 'Editar';
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
  const filterValue = document.getElementById('filter').value;
  const tasks = Array.from(todoList.children);

  tasks.forEach((task) => {
    switch (filterValue) {
      case 'all':
        showElement(task);
        break;
      case 'completed':
        if (task.querySelector('span').classList.contains('completed')) {
          showElement(task);
        } else {
          hideElement(task);
        }
        break;
      case 'uncompleted':
        if (!task.querySelector('span').classList.contains('completed')) {
          showElement(task);
        } else {
          hideElement(task);
        }
        break;
    }
  });
}

// Guardar tareas en localStorage
function saveTasks() {
  const tasks = Array.from(todoList.children).map((li) => ({
    text: li.querySelector('span').textContent,
    completed: li.querySelector('span').classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => {
    addTask(task.text, task.completed);
  });

  document.getElementById('filter').addEventListener('change', handleFilterChange);
});


