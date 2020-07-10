//Selector
const input = document.querySelector('.todo-input');
const button = document.querySelector('.todo-button');
const list = document.querySelector('.todo-list');

//Event Listeners;
document.addEventListener('DOMContentLoaded',getTodos);
button.addEventListener('click',addTodo);
list.addEventListener('click',deleteItem)

//Functions
function addTodo(e){
//prevent defualt
	e.preventDefault();
//create div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
//create Li
	const newTodo=document.createElement("li");
	newTodo.innerText=input.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
//add todo to localstorage
saveLocalTodos(input.value);
//check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
//check delete button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
	deleteButton.classList.add("trash-btn");
	todoDiv.appendChild(deleteButton);
//append to list
	list.appendChild(todoDiv);
//clear todo input value
	input.value = "";
}
//deketeItem Function
function deleteItem(e){
	const item = e.target;

	if(item.classList[0] ==="trash-btn"){
		const todo = item.parentElement;
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend',function(){
			todo.remove();
		})
//CompleteItem Function		
	}
	if(item.classList[0] ==="complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle('completed')
	}
}
//savelocalstorage
function saveLocalTodos(todo){
	//check if any todo existed
	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
	console.log("Hello");
	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){
		//create div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
//create Li
	const newTodo=document.createElement("li");
	newTodo.innerText=todo;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
//check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
//check delete button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
	deleteButton.classList.add("trash-btn");
	todoDiv.appendChild(deleteButton);
//append to list
	list.appendChild(todoDiv);
	})
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos));
}