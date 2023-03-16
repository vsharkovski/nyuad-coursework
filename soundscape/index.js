import data from "./assets/data.json" assert { type: "json" };

// Add "trigger" class to all DOM elements of all triggers.
for (let map of data.maps) {
  for (let trigger of map.triggers) {
    const elem = document.getElementById(trigger.elementId);
    elem.classList.add("trigger");
  }
}

// Find initial active map and hide all other maps.
let activeMap = data.maps.find((map) => map.name == "campus");
if (activeMap === null) {
  console.error("Could not find initial active map.");
} else {
  data.maps.forEach((map) => {
    if (map != activeMap) {
      const elem = document.getElementById(map.elementId);
      elem.classList.add("hidden");
    }
  });
}

// Active sound is initially null.
let activeSound = null;
