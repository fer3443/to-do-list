const btnSubmit = document.querySelector("#btnSubmit");
const validateTask = document.querySelector('#validateTask')
const inputTitle = document.querySelector("#taskTitle");
const inputDescription = document.querySelector("#taskDescription");
const inputDate = document.querySelector('#taskDate');
const inputTime = document.querySelector('#taskTime');
//capturo el formulario para poder limpiarlo luego de enviar los valores
const form = document.querySelector('#form')
//creo un array Tareas que almacena las tareas que voy pusheando desde newTask
let tasks = []
//como el array tasks se vacia si actualizo y pusheo una nueva tarea le digo que tome los datos de LS si es que hay sino que tome el array vacio
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
}
//Creo una clase para instanciar las tareas a futuro
class Task {
    constructor(title, description, date, time){
        this.title = title
        this.description = description
        this.date = date
        this.time = time
    }
}

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    const title = inputTitle.value
    const description = inputDescription.value
    const date = inputDate.value
    const time = inputTime.value
    //validaciones
    if(!title || !description || !date || !time){
        return alert('debe completar todos los campos')
    }
    //instanceo una nueva tarea, que recibe como parametro los sgtes datos:
    const newTask = new Task (title, description, date, time)
    tasks.push(newTask)
    form.reset()
    //ahora procedo a guardar en el LS el array de tasks
    localStorage.setItem('tasks', JSON.stringify(tasks))
})