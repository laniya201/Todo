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
    <div class="flex-grow-1 d-flex align-items-center">
      <span class="todo-text">${text}</span>
      <small class="text-muted ms-3 todo-date">${dueDate ? 'Due: ' + dueDate : ''}</small>
    </div>
    <div>
      <button class="btn btn-secondary btn-sm me-2 edit-btn">Edit</button>
      <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    </div>
  `;

  document.getElementById('todo-list').appendChild(li);
  input.value = '';
  dueDateInput.value = '';

  const deleteBtn = li.querySelector('.delete-btn');
  const editBtn = li.querySelector('.edit-btn');

  // Delete functionality
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  // Edit functionality
  editBtn.addEventListener('click', function () {
    const todoText = li.querySelector('.todo-text');
    const todoDate = li.querySelector('.todo-date');

    if (editBtn.textContent === 'Edit') {
      const currentText = todoText.textContent;
      const currentDate = todoDate.textContent.replace('Due: ', '');

      todoText.innerHTML = `<input type="text" class="form-control form-control-sm edit-text" value="${currentText}">`;
      todoDate.innerHTML = `<input type="date" class="form-control form-control-sm edit-date" value="${currentDate}">`;

      editBtn.textContent = 'Save';
      editBtn.classList.remove('btn-secondary');
      editBtn.classList.add('btn-success');
    } else {
      const newText = li.querySelector('.edit-text').value.trim();
      const newDate = li.querySelector('.edit-date').value;

      if (!newText) return;

      todoText.textContent = newText;
      todoDate.textContent = newDate ? 'Due: ' + newDate : '';

      editBtn.textContent = 'Edit';
      editBtn.classList.remove('btn-success');
      editBtn.classList.add('btn-secondary');
    }
  });
}
