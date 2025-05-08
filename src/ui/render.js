import { getFromLocalStorage } from "../storage/storage";
import { cleanupEmptyBuckets } from "./events";

//Crear la renderización del task
export function renderNewTask() {
  const addTaskButton = document.querySelector(".new-task");
  const dashboard = document.querySelector(".dashboard");

  if (!addTaskButton || !dashboard) {
    console.error("Elementos no encontrados:");
    console.log("Botón:", addTaskButton);
    console.log("Dashboard:", dashboard);
    return;
  }
  addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    dashboard.innerHTML = "";
    const taskForm = document.createElement("form");
    taskForm.classList.add("task-form");
    taskForm.id = "task-form";

    const taskContainerTitle = document.createElement("h1");
    taskContainerTitle.classList.add("task-title");
    taskContainerTitle.textContent = "New Task";

    const titleInput = document.createElement("input");
    titleInput.classList.add("task-title-input");
    titleInput.type = "text";
    titleInput.placeholder = "Task title";
    titleInput.required = true;

    // CCreo el text area del Description
    const descTextarea = document.createElement("textarea");
    descTextarea.classList.add("task-description-input");
    descTextarea.placeholder = "Description (optional)";

    //crear un container para los date inputs

    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");

    //crear el start date

    const startDateContainer = document.createElement("div");
    startDateContainer.classList.add("start-date-container");

    const startDate = document.createElement("input");
    startDate.classList.add("date-selector");
    startDate.type = "date";
    startDate.id = "start-date-input";
    startDate.name = "start-date";
    startDate.required = true;

    startDate.min = "2018-01-01";
    startDate.max = "2100-01-01";
    const startDateLabel = document.createElement("label");
    startDateLabel.htmlFor = "start-date-input"; // Debe coincidir con el id del input
    startDateLabel.textContent = "Start date:";

    startDateContainer.appendChild(startDateLabel);
    startDateContainer.appendChild(startDate);

    //crear el due Date

    const dueDateContainer = document.createElement("div");
    dueDateContainer.classList.add("due-date-container");

    const dueDate = document.createElement("input");
    dueDate.classList.add("date-selector");
    dueDate.type = "date";
    dueDate.id = "due-date-input";
    dueDate.name = "due-date";
    dueDate.required = true;

    dueDate.min = new Date().toISOString().split("T")[0];
    dueDate.max = "2100-01-01";
    const dueDateLabel = document.createElement("label");
    dueDateLabel.htmlFor = "due-date-input";
    dueDateLabel.textContent = "Due Date";

    dueDateContainer.appendChild(dueDateLabel);
    dueDateContainer.appendChild(dueDate);

    //append de los dos divs en dateContainer

    dateContainer.appendChild(startDateContainer);
    dateContainer.appendChild(dueDateContainer);

    //creo Priority checklist

    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add("priority-checklist");

    const prioritySubtitle = document.createElement("h2");
    prioritySubtitle.textContent = "Priority";
    prioritySubtitle.classList.add("task-subtitle");

    priorityContainer.appendChild(prioritySubtitle);

    const priorityLabel = document.createElement("label");
    priorityLabel.classList.add("priority-label");
    priorityLabel.htmlFor = "priority";
    priorityLabel.textContent = "Priority";

    const priorities = ["Low", "Medium", "High"];

    priorities.forEach((priority) => {
      // Crear radio input
      const priorityRadio = document.createElement("input");
      priorityRadio.type = "radio";
      priorityRadio.id = `priority-${priority.toLowerCase()}`;
      priorityRadio.name = "priority"; // ¡Mismo name para agrupar!
      priorityRadio.value = priority.toLowerCase();
      priorityRadio.required = true;

      // Marcar "Medium" como seleccionado por defecto
      if (priority === "Medium") priorityRadio.checked = true;

      // Crear label asociado
      const radioLabel = document.createElement("label");
      radioLabel.htmlFor = priorityRadio.id;
      radioLabel.textContent = priority;

      // Agregar al contenedor

      priorityContainer.append(
        priorityRadio,
        radioLabel,
        document.createElement("br")
      );
    });

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categorySubtitle = document.createElement("h2");
    categorySubtitle.classList.add("task-subtitle");
    categorySubtitle.textContent = "Category";

    const categoryInput = document.createElement("input");

    categoryInput.classList.add("category-input");
    categoryInput.type = "text";
    categoryInput.placeholder = "Category";
    categoryInput.textContent = "Others";
    categoryInput.required = true;

    categoryContainer.append(categorySubtitle, categoryInput);

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");

    const projectSubtitle = document.createElement("h2");
    projectSubtitle.classList.add("task-subtitle");
    projectSubtitle.textContent = "Project";

    const projectInput = document.createElement("input");
    projectInput.classList.add("project-input");
    projectInput.type = "text";
    projectInput.placeholder = "Project";
    projectInput.textContent = "Others";
    projectInput.required = true;

    projectContainer.append(projectSubtitle, projectInput);

    const checkListContainer = document.createElement("div");
    checkListContainer.classList.add("checklist-container");

    // Crear título
    const checkListSubtitle = document.createElement("h2");
    checkListSubtitle.classList.add("task-subtitle");
    checkListSubtitle.textContent = "Checklist";

    // Crear input para nuevas tareas
    const checklistTaskInput = document.createElement("input");
    checklistTaskInput.classList.add("task-input");
    checklistTaskInput.id = "task-input";
    checklistTaskInput.type = "text";
    checklistTaskInput.placeholder = "Add a task...";

    // Crear botón para agregar tareas
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";
    addTaskButton.id = "add-task-button";

    // Crear lista para mostrar tareas
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    // Agregar todo al contenedor
    checkListContainer.append(
      checkListSubtitle,
      checklistTaskInput,
      addTaskButton,
      taskList
    );

    const notesContainer = document.createElement("div");
    notesContainer.classList.add(".notes-container");

    const notesSubtitle = document.createElement("h2");
    notesSubtitle.classList.add("task-subtitle");
    notesSubtitle.textContent = "Notes";

    const notesArea = document.createElement("textarea");
    notesArea.classList.add("notes-area");

    notesContainer.append(notesSubtitle, notesArea);

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "✓ Save";
    saveButton.classList.add("save-task-btn");
    saveButton.id = "save-task-btn";

    // Botón Cancelar
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "✕ Cancel";
    cancelButton.classList.add("cancel-task-btn");
    cancelButton.id = "cancel-task-btn";

    // Construir estructura
    taskForm.append(
      taskContainerTitle,
      titleInput,
      descTextarea,
      dateContainer,
      priorityContainer,
      categoryContainer,
      projectContainer,
      checkListContainer,
      notesContainer,
      saveButton,
      cancelButton
    );
    dashboard.appendChild(taskForm);
  });
}

export function renderSections() {
  // esta deberia estar en file events.js
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("section-title")) {
      e.preventDefault();

      const sectionType = e.target.dataset.section;

      render(sectionType);
    }
  });
}

function render(section) {
  const propertiesObject = getFromLocalStorage("propertiesObject");
  const toDoList = getFromLocalStorage("toDoListArray");
  const prioritiesArray = propertiesObject.priorities;
  const projectsArray = propertiesObject.projects;
  const categoriesArray = propertiesObject.categories;

  const dashboard = document.querySelector(".dashboard");
  dashboard.innerHTML = "";

  if (section === "priority") {
    const priorityBucketsObj = {};

    prioritiesArray.forEach((priority) => {
      const priorityBucket = createBucket(priority);
      dashboard.appendChild(priorityBucket);
      priorityBucketsObj[priority] = priorityBucket; // guardo el DIV en el objeto en su respectiva propiedad
    });

    toDoList.forEach((todo) => {
      const taskContainer = createTaskCard(todo);
      const priority = todo.priority;
      const targetBucket = priorityBucketsObj[priority];

      if (targetBucket) {
        targetBucket.appendChild(taskContainer);
      } else {
        alert(`No existe un bucket para la prioridad: ${priority}`);
      }
    });
  } else if (section === "projects") {
    const projectBucketsObj = {};

    projectsArray.forEach((project) => {
      const projectBucket = createBucket(project);
      dashboard.appendChild(projectBucket);
      projectBucketsObj[project.toLowerCase()] = projectBucket; // guardo el DIV en el objeto en su respectiva propiedad
    });

    toDoList.forEach((todo) => {
      const taskContainer = createTaskCard(todo);
      const project = todo.project.toLowerCase();
      const targetBucket = projectBucketsObj[project];

      if (targetBucket) {
        targetBucket.appendChild(taskContainer);
      } else {
        alert(`No existe un bucket para el bucket: ${project}`);
      }
    });
  } else if (section === "category") {
    const categoryBucketsObj = {};

    categoriesArray.forEach((category) => {
      const categoryBucket = createBucket(category);
      dashboard.appendChild(categoryBucket);
      categoryBucketsObj[category.toLowerCase()] = categoryBucket; // guardo el DIV en el objeto en su respectiva propiedad
    });

    toDoList.forEach((todo) => {
      const taskContainer = createTaskCard(todo);
      const category = todo.category.toLowerCase();
      const targetBucket = categoryBucketsObj[category];

      if (targetBucket) {
        targetBucket.appendChild(taskContainer);
      } else {
        alert(`No existe un bucket para el bucket: ${category}`);
      }
    });
  }

  cleanupEmptyBuckets();
  toDoList.forEach((todo) => {
    const inputDate = new Date(todo.dueDate); // esto me pone la fecha del input en formato OBJETO DATE
    const today = new Date();

    const taskContainer = createTaskCard(todo);

    //crear funcion que haga un attach Bucket para cada seccion.

    if (section === "today") {
      if (
        inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate()
      ) {
        dashboard.appendChild(taskContainer);
      }
    } else if (section === "upcoming") {
      if (
        inputDate.getFullYear() != today.getFullYear() ||
        inputDate.getMonth() != today.getMonth() ||
        inputDate.getDate() != today.getDate()
      ) {
        dashboard.appendChild(taskContainer);
      }
    }
  });
}
// Tengo un Array con las priorities (no repetidas)
// en cada for each voy a obtener una priority
// tengo que renderizar n priorities, siendo n la cantidad de priorities que haya en el array.

function createBucket(tag) {
  const bucket = document.createElement("div");
  bucket.classList.add("bucket");
  bucket.id = tag;

  const tagTitle = document.createElement("h2");
  tagTitle.classList.add("bucket-title");
  tagTitle.textContent = tag;

  bucket.appendChild(tagTitle);

  return bucket;
}

function createTaskCard(todo) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.setAttribute("data-priority", todo.priority.toLowerCase());

  const taskTitle = document.createElement("h2");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = todo.title;

  const tagContainer = document.createElement("div");
  tagContainer.classList.add("tag-container");

  const priorityTagContainer = document.createElement("div");
  priorityTagContainer.classList.add("subcontainer");

  const priorityTagTitle = document.createElement("span");
  priorityTagTitle.classList.add("tag-title");
  priorityTagTitle.textContent = "Priority";

  const priorityTag = document.createElement("h3");
  priorityTag.classList.add("tag");
  priorityTag.id = "priority-tag";
  priorityTag.textContent = todo.priority;

  priorityTagContainer.append(priorityTagTitle, priorityTag);

  const categoryTagContainer = document.createElement("div");
  categoryTagContainer.classList.add("subcontainer");

  const categoryTagTitle = document.createElement("span");
  categoryTagTitle.classList.add("tag-title");
  categoryTagTitle.textContent = "Category";

  const categoryTag = document.createElement("h3");
  categoryTag.classList.add("tag");
  categoryTag.id = "category-tag";
  categoryTag.textContent = todo.category;

  categoryTagContainer.append(categoryTagTitle, categoryTag);

  const projectTagContainer = document.createElement("div");
  projectTagContainer.classList.add("subcontainer");

  const projectTagTitle = document.createElement("span");
  projectTagTitle.classList.add("tag-title");
  projectTagTitle.textContent = "Project";

  const projectTag = document.createElement("h3");
  projectTag.classList.add("tag");
  projectTag.id = "project-tag";
  projectTag.textContent = todo.project;

  projectTagContainer.append(projectTagTitle, projectTag);

  tagContainer.append(
    priorityTagContainer,
    categoryTagContainer,
    projectTagContainer
  );

  const dateContainer = document.createElement("div");
  dateContainer.classList.add("date-container");

  const dateCreated = document.createElement("p");
  dateCreated.classList.add("date-title");
  dateCreated.textContent = "Created";

  const startDate = document.createElement("p");
  startDate.classList.add("date");
  startDate.textContent = todo.startDate;

  const dateDeadline = document.createElement("p");
  dateDeadline.classList.add("date-title");
  dateDeadline.textContent = "Due Date";

  const dueDate = document.createElement("p");
  dueDate.classList.add("date");
  dueDate.textContent = todo.dueDate;
  dateContainer.append(dateCreated, startDate, dateDeadline, dueDate);

  const taskDescriptionContainer = document.createElement("div");
  taskDescriptionContainer.classList.add("description-container");

  const taskDescriptionTitle = document.createElement("h4");
  taskDescriptionTitle.classList.add("task-subtitle");
  taskDescriptionTitle.textContent = "Description";

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task-description");
  taskDescription.textContent = todo.description;

  taskDescriptionContainer.append(taskDescriptionTitle, taskDescription);

  const checklistContainer = document.createElement("div");
  checklistContainer.classList.add("checklist-container");

  const checklistTitle = document.createElement("h4");
  checklistTitle.classList.add("task-subtitle");
  checklistTitle.textContent = "Checklist";

  const checklist = document.createElement("ul");
  checklist.classList.add("checklist");

  const checklistItems = todo.checklist; // esto es un array

  checklistItems.forEach((item) => {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("span");
    label.classList.add("checklist-task");
    label.textContent = item;

    listItem.append(checkbox, label);
    checklist.appendChild(listItem);
  });

  checklistContainer.append(checklistTitle, checklist);

  const notesContainer = document.createElement("div");
  notesContainer.classList.add(".notes-container");

  const notesSubtitle = document.createElement("h2");
  notesSubtitle.classList.add("task-subtitle");
  notesSubtitle.textContent = "Notes";

  const notesArea = document.createElement("div");
  notesArea.classList.add("notes-area");
  notesArea.textContent = todo.notes;

  notesContainer.append(notesSubtitle, notesArea);

  const toggleCompleteBtn = document.createElement("button");
  toggleCompleteBtn.type = "submit";
  toggleCompleteBtn.classList.add("complete-button");
  toggleCompleteBtn.textContent = "Completed";

  taskContainer.append(
    taskTitle,
    tagContainer,
    dateContainer,
    taskDescriptionContainer,
    checklistContainer,
    notesContainer,
    toggleCompleteBtn
  );

  return taskContainer;
}

// para que los section titles permanezcan en BOLD cuando se clickean

document.querySelectorAll(".section-title").forEach((title) => {
  title.addEventListener("click", () => {
    // 1. Remover "bold-text" de TODOS los títulos
    document.querySelectorAll(".section-title").forEach((t) => {
      t.classList.remove("bold-text");
    });

    // 2. Agregar "bold-text" solo al título clickeado
    title.classList.add("bold-text");
  });
});
