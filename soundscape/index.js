import data from "./assets/data.json" assert { type: "json" };

// Initialize global variables.
let activeMap = null;
let activeExperience = null;
let audio = null;
let audioTarget = null;

const experienceWrapperElement = document.querySelector(".experience-wrapper");
const experienceHeaderElement = document.querySelector(".experience .header");
const experienceTitleElement = document.querySelector(".experience .title");
const experienceRecordElement = document.querySelector(".experience .recorded");
const experienceContentElement = document.querySelector(".experience .content");

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
      if (newMap === undefined) {
        console.error("Could not find target map with name", trigger.target);
      } else {
        element.addEventListener("click", () => {
          activeMap = newMap;
          setMap(newMap);
        });
      }
    } else if (trigger.type == "showExperience") {
      // Change experience.
      const newExperience = data.experiences.find(
        (exp) => exp.name == trigger.target
      );
      if (newExperience === undefined) {
        console.error(
          "Could not find target experience with name",
          trigger.target
        );
      } else {
        element.addEventListener("click", () => {
          setExperience(newExperience);
        });
      }
    } else {
      console.error("Trigger", trigger.name, "has unknown type", trigger.type);
    }
  }
}

// Initialize back buttons.
document.querySelectorAll(".back-button").forEach((button) => {
  button.addEventListener("click", () => {
    goBack();
  });
});

// Initialize disclaimer click event.
const disclaimerElement = document.querySelector(".disclaimer");

disclaimerElement.addEventListener("click", () => {
  // Remove the disclaimer
  disclaimerElement.remove();
  
  // Find map to be initially active and show it.
  activeMap = data.maps.find((map) => map.name == "campus");
  if (activeMap === undefined) {
    console.error("Could not find initial active map.");
  } else {
    setMap(activeMap);
  }
});

// Function for showing a target map.
function setMap(targetMap) {
  stopExperience();

  // Show map.
  data.maps.forEach((map) => {
    const element = document.getElementById(map.elementId);
    if (map == targetMap) {
      appear(element);
    } else {
      hide(element);
    }
  });
}

// Function for showing an experience.
function setExperience(experience) {
  stopExperience();
  activeExperience = experience;

  // Replace children of content element with new paragraphs.
  const initialAppearanceDelay = 1;
  const appearanceDuration = 8;

  const getAppearanceDelay = (index) =>
    (initialAppearanceDelay + index * appearanceDuration) * 1000;

  const hideAndShowDelayed = (element, delay) => {
    element.style.animationDuration = `${appearanceDuration}s`;
    hide(element);
    setTimeout(() => appear(element), delay);
  };

  const paragraphs = experience.description.map((text, index) => {
    const element = document.createElement("p");
    element.appendChild(document.createTextNode(text));
    hideAndShowDelayed(element, getAppearanceDelay(index));
    return element;
  });
  experienceContentElement.replaceChildren(...paragraphs);

  // Add delayed appearance animation on header.
  hideAndShowDelayed(
    experienceHeaderElement,
    getAppearanceDelay(experience.description.length)
  );

  // Update other info.
  experienceTitleElement.replaceChildren(
    document.createTextNode(experience.title)
  );
  experienceRecordElement.replaceChildren(
    document.createTextNode(experience.recorded)
  );

  // Play audio.
  audio = new Audio(experience.soundFile);
  audio.loop = true;
  audio.volume = 0.1;

  audioTarget = experience.soundFile;
  audio.addEventListener("loadeddata", () => {
    if (audioTarget == experience.soundFile) {
      audio.play();
    }
  });

  // Make experience wrapper visible.
  appear(experienceWrapperElement);
}

// Funciton for stopping to show the current experience.
function stopExperience() {
  // Stop audio.
  if (audio) {
    audio.pause();
  }
  audio = null;

  // Update variable and hide wrapper.
  activeExperience = null;
  hide(experienceWrapperElement);
}

// Function for going back, either from a map or from an experience.
function goBack() {
  if (activeExperience) {
    stopExperience();
  } else {
    // Go to main map.
    activeMap = data.maps.find((map) => map.name == "campus");
    setMap(activeMap);
  }
}

// Function for hiding an element.
function hide(e) {
  e.classList.add("hidden");
  e.classList.remove("appearing");
}

// Function for making an element appear.
function appear(e) {
  e.classList.remove("hidden");
  e.classList.add("appearing");
}
