const submitButton = document.querySelector(".submit-btn");
const inputTextField = document.querySelector(".text-input");
const tasksContainer = document.querySelector(".tasks-container");

function initEventListeners() {
  submitButton.addEventListener("click", saveTask);
}

function getTaskList() {
  let tasksList = window.localStorage.getItem("tasksList");
  tasksList = tasksList || [];
  try {
    tasksList = JSON.parse(tasksList);
  } catch (err) {
    tasksList = [];
    window.localStorage.setItem("tasksList", tasksList);
  }
  return tasksList;
}

function saveTask() {
  let tasksList = getTaskList();

  let inputText = inputTextField.value;
  let taskId = Math.floor(Math.random() * 1000000);

  if (inputText) {
    let task = { id: taskId, title: inputText };
    tasksList.push(task);
    window.localStorage.setItem("tasksList", JSON.stringify(tasksList));

    // display task
    let displayedTasksIdList = getDisplayedTasksId();
    displayTasks(displayedTasksIdList);
  } else {
    console.log("Not saving task - Task title is empty!");
  }
}

function displayTasks(idList = []) {
  let tasksList = getTaskList();

  for (let task of tasksList) {
    if (idList.includes(task["id"].toString())) {
      continue;
    }
    const taskDiv = document.createElement("div");
    const taskPara = document.createElement("p");
    const taskBtn = document.createElement("button");

    taskDiv.classList.add("task-container");
    taskDiv.setAttribute("id", task["id"]);

    taskPara.classList.add("title");
    taskBtn.classList.add("delete-btn", "btn");

    taskPara.textContent = task["title"];
    taskBtn.textContent = "Delete";

    taskDiv.appendChild(taskPara);
    taskDiv.appendChild(taskBtn);
    tasksContainer.appendChild(taskDiv);

    // add Delete EventListener
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => btn.addEventListener("click", deleteTask));
  }
}

function getDisplayedTasksId() {
  let displayedTasksIdList = [];
  const displayedTasks = document.querySelectorAll(".task-container");
  for (const task of displayedTasks) {
    displayedTasksIdList.push(task.id);
  }
  return displayedTasksIdList;
}

function deleteTask(event) {
  let tasksList = getTaskList();

  let taskElement = document.getElementById(event.target.parentNode.id);
  console.log(tasksList);
  for (const task of tasksList) {
    if (taskElement.id == task["id"].toString()) {
      console.log(task["title"]);
      tasksList = tasksList.filter((item) => item != task);
      window.localStorage.setItem("tasksList", JSON.stringify(tasksList));
      tasksContainer.removeChild(event.target.parentNode);
      console.log(tasksList);
    }
  }
}

window.onload = function () {
  initEventListeners();
  displayTasks();
};
