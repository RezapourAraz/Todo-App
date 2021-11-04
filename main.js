const input = document.querySelector(".input");
const submit = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
let userNotif = document.querySelector(".user-notif");

const timer = document.querySelector(".timer");
const calendar = document.querySelector(".calendar");



submit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodo);


// create & add element function
function addTodo (e) {
    e.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    saveLocalTodo(input.value);

    const newTodo = document.createElement("li");
    newTodo.innerText = input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    input.value = "";
    
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
}
// delete & complete buttun function
function deleteCompleteTodo (event) {
    const item = event.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.remove();
        removeLocalTodo(todo);
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
// select option fuction
function filterTodo (event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    })
}
// save to local storage function
function saveLocalTodo (todo) {
    let todos ;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
// remove item from local 
function removeLocalTodo (todo) {
    let todos ;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// loaded info from local
function getTodo () {

    let todos ;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    })

    function counterUpdate () {
        let counter = todos.length;
        userNotif.innerText = `You Have ${counter} Tasks To Do!`;
    }
    counterUpdate();

}

function showTime () {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    if (h === 0) {
        h = 12;
    }

    h = (h < 10) ? `0${h}` : h ;
    m = (m < 10) ? `0${m}` : m ;
    s = (s < 10) ? `0${s}` : s ;

    timer.innerText = `${h}:${m}:${s}`;
}
setInterval(showTime, 1000);

function showDate () {
    let date = new Date();
    let year = date.getFullYear();
    let mon = date.getUTCMonth() + 1;
    let day = date.getDate();
    
    switch (mon) {
        case 1:
            mon = "January";
            break;
        case 2:
            mon = "February";
            break;
        case 3:
            mon = "March";
            break;
        case 4:
            mon = "April";
            break;
        case 5:
            mon = "May";
            break;
        case 6:
            mon = "June";
            break;
        case 7:
            mon = "July";
            break;
        case 8:
            mon = "August";
            break;
        case 9:
            mon = "September";
            break;
        case 10:
            mon = "October";
            break;
        case 11:
            mon = "November";
            break;
        case 12:
            mon = "December";
            break;
        }
    
        calendar.innerText = `${day} ${mon}, ${year}`;
    
}
showDate();