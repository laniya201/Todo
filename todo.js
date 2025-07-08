document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    <span>${text}</span>
    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
  `;
  document.getElementById('todo-list').appendChild(li);
  input.value = '';
  li.querySelector('.delete-btn').addEventListener('click', function() {
    li.remove();
  });
}