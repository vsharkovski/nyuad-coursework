import data from "./assets/data.json" assert { type: "json" };

// Initialize global variables.
let activeMap = null;
let activeExperience = null;

// Initialize triggers.
for (let map of data.maps) {
  for (let trigger of map.triggers) {
    const element = document.getElementById(trigger.elementId);

    // Add "trigger" class to the DOM element.
    element.classList.add("trigger");

    // Set up click event based on event type.
    if (trigger.type == "changeMap") {
      // Change map.
      const newMap = data.maps.find((map) => map.name == trigger.target);
      if (newMap === null) {
        console.error("Could not find target map with name", trigger.target);
      } else {
        element.addEventListener("click", () => {
          activeMap = newMap;
          showMap(newMap);
        });
      }
    } else if (trigger.type == "showExperience") {
      // Change experience.
      const newExperience = data.experiences.find(
        (exp) => exp.name == trigger.target
      );
      if (newExperience === null) {
        console.error(
          "Could not find target experience with name",
          trigger.target
        );
      } else {
        element.addEventListener("click", () => {
          activeExperience = newExperience;
          showExperience(newExperience);
        });
      }
    } else {
      console.error("Trigger", trigger.name, "has unknown type", trigger.type);
    }
  }
}

// Find map to be initially active and show it.
activeMap = data.maps.find((map) => map.name == "campus");
if (activeMap === null) {
  console.error("Could not find initial active map.");
} else {
  showMap(activeMap);
}

// Function for showing a target map.
function showMap(targetMap) {
  data.maps.forEach((map) => {
    const element = document.getElementById(map.elementId);
    if (map == targetMap) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}

// Function for showing an experience.
function showExperience(experience) {}
