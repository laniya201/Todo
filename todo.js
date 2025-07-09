document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const input = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date');
  const text = input.value.trim();
  const dueDate = dueDateInput.value;
  if (!text) return;
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    <span>
      <span class="todo-text">${text}</span>
      ${dueDate ? '<small class="text-muted">Due: <span class="todo-date">' + dueDate + '</span></small>' : ''}
    </span>
    <div>
      <button class="btn btn-secondary btn-sm me-2 edit-btn">Edit</button>
      <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    </div>
  `;
  document.getElementById('todo-list').appendChild(li);
  input.value = '';
  dueDateInput.value = '';

  // Delete functionality
  li.querySelector('.delete-btn').addEventListener('click', function() {
    li.remove();
  });

  // Edit functionality
  li.querySelector('.edit-btn').addEventListener('click', function () {
    const todoText = li.querySelector('.todo-text');
    const todoDate = li.querySelector('.todo-date');
    if (this.textContent === 'Edit') {
      // Switch to edit mode
      todoText.innerHTML = `<input type="text" class="form-control form-control-sm edit-text" value="${todoText.textContent}">`;
      if (todoDate) {
        todoDate.innerHTML = `<input type="date" class="form-control form-control-sm edit-date" value="${todoDate.textContent}">`;
      }
      this.textContent = 'Save';
      this.classList.remove('btn-secondary');
      this.classList.add('btn-success');
    } else {
      // Save changes
      const newText = li.querySelector('.edit-text').value.trim();
      const newDate = todoDate ? li.querySelector('.edit-date').value : '';
      if (!newText) return;
      todoText.textContent = newText;
      if (todoDate) todoDate.textContent = newDate;
      this.textContent = 'Edit';
      this.classList.remove('btn-success');
      this.classList.add('btn-secondary');
    }
  });
}