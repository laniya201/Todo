let todos = [] || localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});
document.getElementById('search-btn').addEventListener('click', renderTodos);
document.getElementById('search-input').addEventListener('input', renderTodos);
document.getElementById('filter-date').addEventListener('change', renderTodos);

document.getElementById('export-json-btn').addEventListener('click', function() {
  const dataStr = JSON.stringify(todos, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'todos.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('export-text-btn').addEventListener('click', function() {
  const text = todos.map(todo =>
    `Task: ${todo.text}\nDue: ${todo.dueDate || 'N/A'}\nCompleted: ${todo.completed ? 'Yes' : 'No'}\n`
  ).join('\n');
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'todos.txt';
  a.click();
  URL.revokeObjectURL(url);
});
function addTodo() {
  const input = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date');
  const text = input.value.trim();
  const dueDate = dueDateInput.value;
  if (!text) return;
  todos.push({ text, dueDate, completed: false });
  input.value = '';
  dueDateInput.value = '';
  alert('Todo added successfully!');
  localStorage.setItem('todos', JSON.stringify(todos));
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
        <input type="checkbox" class="form-check-input me-2 complete-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text ${todo.completed ? 'text-decoration-line-through text-muted' : ''}">${todo.text}</span>
        <small class="text-muted ms-3 todo-date">${todo.dueDate ? 'Due: ' + todo.dueDate : ''}</small>
      </div>
      <div>
        <button class="btn btn-secondary btn-sm me-2 edit-btn">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </div>
    `;

    // Handle completion checkbox
    li.querySelector('.complete-checkbox').addEventListener('change', function () {
      todos[idx].completed = this.checked;
      renderTodos();
    });

    // Delete
    li.querySelector('.delete-btn').addEventListener('click', function () {
      todos.splice(idx, 1);
      renderTodos();
    });
    // Save todos to localStorage

    // Edit
    li.querySelector('.edit-btn').addEventListener('click', function () {
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

  updateSummary(); // Update summary dropdown
}

function updateSummary() {
  const summary = document.getElementById('todo-summary');
  const total = todos.length;
  const pending = todos.filter(todo => !todo.completed).length;
  const completed = total - pending;

  summary.innerHTML = `
    <option selected disabled>Todo Summary</option>
    <option>Total Todos: ${total}</option>
    <option>Pending Todos: ${pending}</option>
    <option>Completed Todos: ${completed}</option>
  `;
}

// Initial render
renderTodos();
todos.push({ text, dueDate, completed: false });
input.value = '';
dueDateInput.value = '';
alert('Todo added successfully!::');

renderTodos();
saveTodos();// After todos.splice(idx, 1); renderTodos();
saveTodos();