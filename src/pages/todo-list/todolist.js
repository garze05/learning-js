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
    <span>${text}</span>
    <button class="btnDelete">Eliminar</button>
  `;

  // Verificar si la tarea estaba completa por localStorage
  if (completed) li.classList.add('completed');

  // Para marcar que esta completada
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const btnDelete = li.querySelector('.btnDelete');
  btnDelete.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el evento se propague a los padres
    li.remove();
    saveTasks();
  });

  todoList.appendChild(li);
  saveTasks();
}

function deleteTask(task) {
  task.remove();
}

// Guardar tareas en localStorage
function saveTasks() {
  const tasks = Array.from(todoList.children).map((li) => ({
    text: li.querySelector('span').textContent,
    completed: li.classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => {
    addTask(task.text, task.completed);
  });
});


