const btnSubmit = document.querySelector("#btnSubmit");
const validateTask = document.querySelector("#validateTask");
const taskSuccessfully = document.querySelector("#taskSuccessfully");
const inputTitle = document.querySelector("#taskTitle");
const inputDescription = document.querySelector("#taskDescription");
const inputDate = document.querySelector("#taskDate");
const inputTime = document.querySelector("#taskTime");
//capturo el formulario para poder limpiarlo luego de enviar los valores
const form = document.querySelector("#form");
const formModal = document.querySelector("#modalForm");
//creo un array Tareas que almacena las tareas que voy pusheando desde newTask
let tasks = [];
//capturo el contenedor donde voy a insertar las cards de las tareas
const taskCount = document.querySelector("#taskCount");
const cardContainer = document.querySelector("#cardContainer");
//modal de BS
var myModal = new bootstrap.Modal(document.getElementById('modalTask'))
//como el array tasks se vacia si actualizo y pusheo una nueva tarea le digo que tome los datos de LS si es que hay sino que tome el array vacio
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

//Creo una clase para instanciar las tareas a futuro
class Task {
  constructor(id, title, description, date, time) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
  }
}
//condicion para renderizar cantidad de tareas
function countTask() {
  if (!tasks) {
    taskCount.innerHTML = "<p>0 Tareas</p>";
  } else {
    taskCount.innerHTML = `<p>${tasks.length} Tareas</p>`;
  }
}
//funcion para aviso de carga exitosa
function succesfully() {
  return (
    taskSuccessfully.classList.toggle("active"),
    setTimeout(() => {
      taskSuccessfully.classList.toggle("active");
    }, 2000)
  );
}
//funcion para crear una tarea nueva
function addTask() {
  cardContainer.innerHTML = ""; //para limpiar el cuerpo antes de cargar las taskCard
  tasks.map((item) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.innerHTML = `
		<div class="taskHead d-flex justify-content-between align-item-center">
				<h5>${item.title}</h5>
				<p>${item.date}</p>
				<p>${item.time || "sin horario"}</p>
		</div>
		<div class="taskBody">           
			<p class="description">${item.description}</p>
			<div class="boxBtn">
			<button
			type="button"
			class="btnUpdateTask"
			data-bs-toggle="modal"
			data-bs-target="#modalTask"
      onclick="loadUpdateTask(${item.id})"
		>
		<box-icon color="#d8e700" name='pencil'></box-icon>
		</button>
				<button class="btnDeleteTask" onclick="deleteTask(${
          item.id
        })"><box-icon color="red" name='message-square-x'></box-icon></button>
			</div>
		</div>
		`;
    cardContainer.appendChild(taskCard);
  });
}

function loadTask(e) {
  e.preventDefault();
  const title = inputTitle.value.trim(); //para eliminar los espacios innecesarios
  const description = inputDescription.value;
  const date = inputDate.value;
  let time = inputTime.value;
  let id = Date.now();

  //validaciones
  if (!title || !description || !date) {
    return (
      validateTask.classList.toggle("active"),
      setTimeout(() => {
        validateTask.classList.toggle("active");
      }, 2000)
    );
  }
  //instanceo una nueva tarea, que recibe como parametro los sgtes datos:
  const newTask = new Task(id, title, description, date, time);
  tasks.push(newTask);
  form.reset();
  //ahora procedo a guardar en el LS el array de tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));
  succesfully();
  addTask();
  countTask();
}
countTask();
addTask();

form.addEventListener("submit", loadTask);

function deleteTask(id) {
  let index = tasks.findIndex((item) => item.id == id); //la funcion findIndex busca y devuelve el elemento con el index que coincide con la condicion que le damos en la callback
  let validationDelete = confirm(
    `Esta seguro/a que quiere borrar la tarea ${tasks[index].title}?`
  );
  //como confirm devuelve un boolean uso ese valor
  if (validationDelete) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTask();
    countTask();
  }
}
//creo una variable nula para almacenar a futuro el id que recibo de la tarea a modificar
let idTaskUpdate = null;

function loadUpdateTask(id) {

  idTaskUpdate = id
  let index = tasks.findIndex((item) => item.id == idTaskUpdate);
  //capturo los inputs del formModal y los completo con los datos de la tarea almacenada en el array de tasks
  document.querySelector("#updateTaskTitle").value = tasks[index].title;
  document.querySelector("#updateTaskDescription").value =
    tasks[index].description;
  document.querySelector("#updateTaskDate").value = tasks[index].date;
  document.querySelector("#updateTaskTime").value = tasks[index].time;
}

function updateTask(e) {
  e.preventDefault();
  let index = tasks.findIndex((item) => item.id == idTaskUpdate);
  //a los datos almacenados en el array de tasks los modifico con los nuevos valores que ingreso por inputs del formModal
  tasks[index].title = document.querySelector("#updateTaskTitle").value
  tasks[index].description = document.querySelector("#updateTaskDescription").value
  tasks[index].date = document.querySelector("#updateTaskDate").value
  tasks[index].time = document.querySelector("#updateTaskTime").value
  //almaceno los datos en el LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTask()
  myModal.hide()//cierro el modal de bs
  succesfully()
}
formModal.addEventListener("submit", updateTask);
