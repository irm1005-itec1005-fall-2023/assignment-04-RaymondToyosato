/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

// Constants
const appID = "app";
const headingText = "To do. To done. ✅";

// DOM Elements
let appContainer = document.getElementById(appID);

//
// Functions
//

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  h1.innerText = headingText;
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  let todos = [];

  function addTodo(text) {
    const now = new Date();
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      initTime: now.toLocaleString()
    };
    todos.push(todo);
    renderTodos();
  }

  function renderTodos() {
    const todoItems = todos.filter(todo => !todo.completed);
    const completedItems = todos.filter(todo => todo.completed);

    document.getElementById('todo-list').innerHTML =
      todoItems.length ?
        todoItems.map(todo => createTodoHtml(todo, false)).join('') :
        '<li class="empty">No pending tasks</li>';

    document.getElementById('completed-list').innerHTML =
      completedItems.length ?
        completedItems.map(todo => createTodoHtml(todo, true)).join('') :
        '<li class="empty">No completed tasks</li>';
  }

function createTodoHtml(todo, isCompleted) {
    return `<li class="${isCompleted ? 'completed' : ''}" data-id="${todo.id}">
                <span class="text">${todo.text}</span>
                <span class="init-time">Added on: ${todo.initTime}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </li>`;
}

  window.deleteTodo = function (id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  };

  window.toggleTodo = function (id) {
    todos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    renderTodos();
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText) {
      addTodo(todoText);
      input.value = '';
    }
  });

  document.getElementById('todo-list').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      const id = parseInt(e.target.dataset.id);
      toggleTodo(id);
    }
  });

  document.getElementById('completed-list').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      const id = parseInt(e.target.dataset.id);
      toggleTodo(id);
    }
  });

  renderTodos();
});

//
// Inits & Event Listeners
//
inititialise();