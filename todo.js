console.log('======= TODO ========');

const $ = (selector) => document.querySelector(selector);
const _ = (tag) => document.createElement(tag);
const todos = [];

function createEl(tag, innerText, ...classList) {
    const el = _(tag);
    el.classList.add(...classList);

    if (innerText) {
        el.innerText = innerText;
    }

    return el;
}

function renderTodos() {
    $('.todos-wrapper').innerHTML = '';
    todos.forEach((todo, index) => {
        const todoCard = createEl('div', null,'todo-card');
        const todoTitle = createEl('p', todo, 'todo-title');
        const todoHr = createEl('hr');
        const btnWrapper = createEl('div', null, 'btn-wrapper');
        const deleteBtn = createEl('button', 'Delete', 'btn-delete');
        const editBtn = createEl('button', 'Edit', 'btn-edit');
        const editWrapper = createEl('div', null, 'todo-edit-wrapper');
        const editInput = createEl('input', null, 'edit-input');
        const editSaveBtn = createEl('button', 'Save', 'btn-save');

        
        deleteBtn.setAttribute('data-index', index);
        deleteBtn.addEventListener('click', deleteItem);
        
        editSaveBtn.setAttribute('data-save', index)
        editSaveBtn.addEventListener('click', editItem);
        
        editBtn.addEventListener('click', Toggle);
        
        editWrapper.classList.add('hidden');
        btnWrapper.append(editBtn, deleteBtn);
        editWrapper.append(editInput, editSaveBtn);
        todoCard.append(todoTitle, todoHr, btnWrapper, editWrapper);
        $('.todos-wrapper').append(todoCard);

        function Toggle() {
            editWrapper.classList.toggle('hidden')
        }

        function editItem(event) {
            const dataIndex = event.target.dataset.save;
            let editTodo = todoTitle.innerText;
            editTodo = editInput.value;
            todos.splice(dataIndex, 1, editTodo);
            renderTodos();
            }
    });
}

function deleteItem(event) {
    const dataIndex = event.target.dataset.index;
    todos.splice(dataIndex, 1);
    renderTodos()
}

function addTodo(event) {
    event.preventDefault();

    const value = $('#todo-input').value;
    
    if (!value.trim()) return;

    todos.push(value.trim());

    renderTodos();
    event.target.reset();
}

renderTodos();

$('#todo-form').addEventListener('submit', addTodo);