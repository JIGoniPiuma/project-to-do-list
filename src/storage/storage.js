export function saveInLocalStorage(item) {
  // PASARLE COMO VARIABLE el KEY asi me evito las validaciones y es una func universal/
  let key = "";

  if (typeof item === "object" && item !== null && !Array.isArray(item)) {
    key = "propertiesObject";
  } else if (Array.isArray(item)) {
    // Item es un array
    key = "toDoListArray";
  }
  try {
    const itemJson = JSON.stringify(item);

    localStorage.setItem(key, itemJson);
    return true;
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    return null;
  }
}

export function getFromLocalStorage(key) {
  try {
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      return parsedItem;
    } else {
      if (key === "toDoListArray") {
        return [];
      } else {
        return {
          projects: [],
          priorities: [],
          categories: [],
        };
      }
    }
  } catch (error) {
    console.error(
      "Error al intentar obtener la información en localStorage:",
      error
    );
    return null;
  }
}
