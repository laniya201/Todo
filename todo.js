let todos = [];

document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});
document.getElementById('search-btn').addEventListener('click', renderTodos);
document.getElementById('search-input').addEventListener('input', renderTodos);
document.getElementById('filter-date').addEventListener('change', renderTodos);

function addTodo() {
  const input = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date');
  const text = input.value.trim();
  const dueDate = dueDateInput.value;
  if (!text) return;
  todos.push({ text, dueDate });
  input.value = '';
  dueDateInput.value = '';
    alert('Todo added successfully!');
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  const search = document.getElementById('search-input').value.toLowerCase();
  const filterDate = document.getElementById('filter-date').value;

  todos.forEach((todo, idx) => {
    if (
      (search && !todo.text.toLowerCase().includes(search)) ||
      (filterDate && todo.dueDate !== filterDate)
    ) return;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div class="flex-grow-1 d-flex align-items-center">
        <span class="todo-text">${todo.text}</span>
        <small class="text-muted ms-3 todo-date">${todo.dueDate ? 'Due: ' + todo.dueDate : ''}</small>
      </div>
      <div>
        <button class="btn btn-secondary btn-sm me-2 edit-btn">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </div>
    `;

    // Delete
    li.querySelector('.delete-btn').addEventListener('click', function() {
      todos.splice(idx, 1);
      renderTodos();
    });

    // Edit
   li.querySelector('.edit-btn').addEventListener('click', function editHandler() {
  const todoText = li.querySelector('.todo-text');
  const todoDate = li.querySelector('.todo-date');
  if (this.textContent === 'Edit') {
    todoText.innerHTML = `<input type="text" class="form-control form-control-sm edit-text" value="${todo.text}">`;
    todoDate.innerHTML = `<input type="date" class="form-control form-control-sm edit-date" value="${todo.dueDate}">`;
    this.textContent = 'Save';
    this.classList.remove('btn-secondary');
    this.classList.add('btn-success');
  } else {
    const newText = li.querySelector('.edit-text').value.trim();
    const newDate = li.querySelector('.edit-date').value;
    if (!newText) return;
    todos[idx].text = newText;
    todos[idx].dueDate = newDate;
    renderTodos();
  }

      
    });

    list.appendChild(li);
  });
}

// Initial render
renderTodos();