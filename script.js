let form = document.getElementById('form')
let textInput = document.getElementById('textInput')
let msg = document.getElementById('msg')
let dateInput = document.getElementById('dateInput')
let textarea = document.getElementById('textarea')
let tasks = document.getElementById('tasks')
let add = document.getElementById('add')


//form event listner when press add button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //every time when submit trigger this validation
  form_validation();

})

//form validation
let form_validation = () => {
  if (textInput.value === "") {
    console.log('Failure')
    msg.innerText = "Task cannot be blank"
  }
  else {
    console.log('Success');
    msg.innerText = "";
    acceptData();
    //it off the form after fill the form and press add
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
}


//store data into object
let data = [] ;
let acceptData = () => {

  data.push({
    text:textInput.value,
    date : dateInput.value,
    description : textarea.value,
  })
  localStorage.setItem("data", JSON.stringify(data))
  
  // console.log(data)
  createTasks();
}



//create task card 
let createTasks = () => {
  tasks.innerHTML=""
  data.map((x,y)=>{
       //y  index no
       //x target individual element
       return (tasks.innerHTML += `
       <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
          <span class="options">
           <i  onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa fa-check-square-o"></i>
           <i onClick="deleteTask(this) ; createTasks()" class="fa fa-trash" aria-hidden="true"></i>
          </span>
       </div>
       `)
  })
  
  resetForm();
}

//reset form after add tasks
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

//delete task
let deleteTask = (e) => {
  e.parentElement.parentElement.remove() //delete parent div of the task card
  // console.log(  e.parentElement.parentElement.id)
  data.splice(  e.parentElement.parentElement.id, 1)
  localStorage.setItem("data", JSON.stringify(data))
 console.log( data)
}

//update task
let editTask = (e) => {
  let selectedTask= e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerText;
  dateInput.value = selectedTask.children[1].innerText;
  textarea.value = selectedTask.children[2].innerText;
  selectedTask.remove();

  deleteTask(e)
}

(()=>{
  data=JSON.parse(localStorage.getItem("data")) || []
  console.log(data)
  createTasks();

})()