//! Getting all the html elements
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

//! Form validation part
const formValidation = () => {
  if (
    textInput.value === "" ||
    dateInput.value === "" ||
    textarea.value === ""
  ) {
    msg.innerHTML = "Input Fields Cannot Be Empty😒";
    // console.log("data not found");
  } else {
    msg.innerHTML = "";
    //console.log("data found");
    getData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

//! submit logic

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//! getting details from the form input and storing it in data in array of objects.

let data = [{}];

const getData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    task: textarea.value,
  });
  //to save the data to local storage
  localStorage.setItem("data", JSON.stringify(data));
  //console.log("get",data);
  createTask();
};

//! create function used to get the data and display in the my tasks

const createTask = () => {
  tasks.innerHTML = "";
  data.map((ele, y) => {
    return (tasks.innerHTML += `
             <div id=${y}>
             <span class="fw-bolder">${ele.text}</span>
              <span class="fw-bolder">${ele.date}</span>
               <p class="fw-bold">${ele.task}</p>
               <span class="options">
               <i class="fa-solid fa-pen-to-square fa-beat fa-lg" style="color: #FFD43B;"></i>
               <i class="fa-solid fa-trash fa-beat fa-lg" style="color: #FFD43B;"></i>
            `);
  });
  resetForm();
};

//! resetting the form after displaying the task

const resetForm =() =>{
        textInput.value = "";
        dateInput.value ="";
        textarea.value = "";
};
(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    //console.log("reset",data);
    createTask();
    
}) ();

