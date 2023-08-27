const addBtn = document.querySelector("#add-task");
const newTask = document.querySelector("#Wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".task-count");
let taskcount = 0;

// Function to update the taskcount value
const updateCount = (taskcount) => {
  countValue.innerText = taskcount;
};

// Function to handle add, edit, and delete task
const addTask = () => {
// variable to store task value entered by user
  const taskName = newTask.value.trim();
  error.style.display = "none";

// display error message if task value is empty
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }
  
  const task = `<div class = "task"> 
    <input type = "checkbox" class = "task-check"> 
    <span class= "taskname"> ${taskName} </span> 
    <button class ="edit"> <i class="fa-solid fa-pen-to-square"> </i>
    </button> <button class = "delete"><i class="fa-solid fa-trash"></i> </button> 
    </div>`;
  
//  add html element to dom at the end
  taskContainer.insertAdjacentHTML("beforeend", task);

// Handle delete Button functionality
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskcount = taskcount - 1;
      updateCount(taskcount);
    };
  });

// Handle edit button functionality
  const editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((editButton) => {
    editButton.onclick = (e) => {
      let targetTask = e.target;
      if (!(e.target.className == "edit")) {
        targetTask = e.target.parentElement;
      }
      newTask.value = targetTask.previousElementSibling?.innerText;
      targetTask.parentNode.remove();
      taskcount -= 1;
      updateCount(taskcount);
    };
  });

// To handle checkbox functionality
  const taskCheck = document.querySelectorAll(".task-check");
  taskCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskcount -= 1;
      } else {
        taskcount += 1;
      }
      updateCount(taskcount);
    };
  });
  taskcount += 1;
  updateCount(taskcount);
  newTask.value = "";
}

// Eventlistener attached to click event with ADD button
addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskcount = 0;
    updateCount(taskcount);
    newTask.value = "";
}
