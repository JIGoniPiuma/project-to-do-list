//FALTA LA LOGICA PARA ELIMINAR FORMULARIOS

import { ToDo } from "../logic/todo";
import { renderNewTask } from "./render";

export const toDoList = [];

export function handleEvents() {
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "save-task-btn") {
      e.preventDefault();
      console.log("Save button clicked");
      handleSaveTask();
    }

    if (e.target && e.target.id === "cancel-task-btn") {
      e.preventDefault();
      console.log("Cancel button clicked");
      handleCancelTask();
    }

    if (e.target && e.target.id === "add-task-button") {
      e.preventDefault();
      handleAddChecklistTask();
    }

    if (e.target && e.target.classList.contains("complete-button")) {
      e.preventDefault();
      handleCompleteTask(e.target); // Pasa el botón como referencia
    }
  });
}

function handleSaveTask() {
  const taskForm = document.getElementById("task-form");
  const title = document.querySelector(".task-title-input");
  const startDateInput = document.getElementById("start-date-input");
  const dueDateInput = document.getElementById("due-date-input");

  const startDate = new Date(startDateInput.value);
  const dueDate = new Date(dueDateInput.value);

  if (!taskForm.checkValidity()) {
    alert("Please fill in title and dates");
    title.focus();
    startDateInput.focus();
    dueDateInput.focus();

    return;
  } else if (dueDate < startDate) {
    alert("Due date should be later than start date");
    dueDateInput.focus();
    return;
  } else {
    const newTask = createTask();
    saveInTodoList(newTask);
    saveProperties(newTask);
    // console.log(
    //   newTask.project,
    //   newTask.priority,
    //   newTask.checklist,
    //   newTask.category,
    //   newTask.notes
    // );
    console.log(propertiesObject);
    clearTaskForm();
  }
}

function handleCancelTask() {
  clearTaskForm();
}

function createTask() {
  const title = document.querySelector(".task-title-input").value;
  const description = document.querySelector(".task-description-input").value;
  const startDate = document.getElementById("start-date-input").value;
  const dueDate = document.getElementById("due-date-input").value;
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;

  const category = document.querySelector(".category-input").value;
  const project = document.querySelector(".project-input").value;
  const checkListItems = Array.from(
    document.querySelectorAll(".checklist-task")
  ).map((span) => span.textContent);

  const notes = document.querySelector(".notes-area").value;

  try {
    const newTask = new ToDo(
      title,
      description,
      startDate,
      dueDate,
      priority,
      false,
      category,
      project,
      checkListItems,
      notes,
      ""
    );

    console.log("Nueva tarea creada:", newTask);
    return newTask;
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    alert(`Error: ${error.message}`);
  }
}

function clearTaskForm() {
  const taskForm = document.querySelector(".task-form");
  if (taskForm) {
    taskForm.remove();
  }
}

function saveInTodoList(task) {
  toDoList.push(task);
  console.log(toDoList);
  return toDoList;
}

function handleAddChecklistTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("span");
    label.classList.add("checklist-task");
    label.textContent = taskText;

    listItem.append(checkbox, label);
    document.querySelector(".task-list").appendChild(listItem);
    taskInput.value = "";
  }
}

export const propertiesObject = {
  projects: [],
  priorities: [],
  categories: [],
};

export function saveProperties(task) {
  //paso lo que exista en "propertiesObject.propiedad" a minuscula. EN el primer caso vana estar vacios.
  const existingProjectsLower = propertiesObject.projects.map((p) =>
    p.toLowerCase()
  );
  const existingPrioritiesLower = propertiesObject.priorities.map((p) =>
    p.toLowerCase()
  );
  const existingCategoriesLower = propertiesObject.categories.map((c) =>
    c.toLowerCase()
  );

  //Si en los auxiliares "existing(...)" NO EXISTE task.propiedad(pasada a minuscula) -> se hace push de la task.propiedad en propertiesObject.prop.
  if (!existingProjectsLower.includes(task.project.toLowerCase())) {
    propertiesObject.projects.push(task.project);
  }

  if (!existingPrioritiesLower.includes(task.priority.toLowerCase())) {
    propertiesObject.priorities.push(task.priority);
  }

  if (!existingCategoriesLower.includes(task.category.toLowerCase())) {
    propertiesObject.categories.push(task.category);
  }

  return propertiesObject;
}

function handleCompleteTask(completeButton) {
  const taskContainer = completeButton.closest(".task-container"); // esto recorre el nodo en el DOM hacia arriba hasta en contrar el parent más cercano con ese nombre

  const taskTitle = taskContainer.querySelector(".task-title").textContent; // selecciono su titulo para luego usarlo en el callback de findindex

  const taskIndex = toDoList.findIndex((task) => task.title === taskTitle);// busco en toDOlist el index de la tarea que quiero eliminar y la elimino con SPLICEEE
  if (taskIndex !== -1) {
    toDoList.splice(taskIndex, 1);
  }

  taskContainer.remove();     

  console.log("Tarea completada eliminada:", taskTitle);
}
