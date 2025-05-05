import {
  format,
  formatRelative,
  isToday,
  isTomorrow,
  parseISO,
  differenceInCalendarDays,
  startOfDay,
  getTime,
} from "date-fns";

export class ToDo {
  constructor(
    title, //check
    description, //check
    startDate, //check
    dueDate, //check
    priority, //check
    complete,
    category, //check
    project, //check
    checklist, //check
    notes //check
  ) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = Boolean(complete);
    this.category = category;
    this.project = project;
    this.checklist = checklist;
    this.notes = notes;
  }

  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }

  setPriority(priority) {
    this.priority = priority;
  }
  toggleComplete() {
    this.complete = !this.complete;
  }

  setCategory(category) {
    this.category = category;
  }
  setProject(project) {
    this.project = project;
  }
  addChecklist(checklist) {
    this.checklist = checklist; // pendiente armar
  }
  addNotes(notes) {
    this.notes = notes;
  }
  getFormattedDistanceStrict() {
    return formatDistanceStrict(this.dueDate, this.startDate, {
      addSuffix: true,
      unit: "day",
    });
  }
}
