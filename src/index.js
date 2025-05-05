
import { renderNewTask } from "./ui/render.js";
import { handleEvents } from "./ui/events.js";
import { renderSections } from "./ui/render.js";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  renderNewTask();
  handleEvents();
  renderSections();
});
