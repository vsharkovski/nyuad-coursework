import data from "./assets/data.json" assert { type: "json" };

// Initialize global variables.
let activeMap = null;
let activeExperience = null;
let audio = null;
let audioTarget = null;
let currentTime = null;

const experienceWrapperElement = document.querySelector(".experience-wrapper");
const experienceBackdropElement = document.querySelector(
  ".experience-wrapper .backdrop"
);
const experienceHeaderElement = document.querySelector(".experience .header");
const experienceTitleElement = document.querySelector(".experience .title");
const experienceRecordElement = document.querySelector(".experience .recorded");
const experienceContentElement = document.querySelector(".experience .content");
const audioContainerElement = document.querySelector(".audio-container");
const disclaimerElement = document.querySelector(".disclaimer");

// Initialize triggers.
for (let map of data.maps) {
  for (let trigger of map.triggers) {
    const element = document.getElementById(trigger.elementId);

    if (!element) {
      console.error(
        "Could not find trigger element with id",
        trigger.elementId
      );
      continue;
    }

    // Add "trigger" class to the DOM element.
    element.classList.add("trigger");

    // Set up click event based on event type.
    const ifAtTriggerTime = (callback) => {
      if (trigger.mapTimes.includes(currentTime)) callback();
    };

    if (trigger.type == "changeMap") {
      // Change map.
      const newMap = data.maps.find((map) => map.name == trigger.target);
      if (newMap === undefined) {
        console.error("Could not find target map with name", trigger.target);
      } else {
        element.addEventListener("click", () =>
          ifAtTriggerTime(() => setMap(newMap))
        );
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
        element.addEventListener("click", () =>
          ifAtTriggerTime(() => setExperience(newExperience))
        );
      }
    } else {
      console.error("Trigger", trigger.name, "has unknown type", trigger.type);
    }
  }
}

// Initialize back buttons.
document
  .querySelectorAll(".back-button")
  .forEach((button) => button.addEventListener("click", goBack));

// Initialize time button.
document
  .querySelectorAll(".time-button")
  .forEach((button) => button.addEventListener("click", switchTime));

// Initialize help button.
document
  .querySelectorAll(".help-button")
  .forEach((button) =>
    button.addEventListener("click", () => appear(disclaimerElement))
  );

// Make it day or night at the start.
switchTime();

// Initialize disclaimer click event.
disclaimerElement.addEventListener("click", () => {
  // Remove the disclaimer.
  hide(disclaimerElement, true);

  // Find map to be initially active and show it.
  activeMap = data.maps.find((map) => map.name == "campus");
  if (activeMap === undefined) {
    console.error("Could not find initial active map.");
  } else {
    setMap(activeMap);
  }
});

// Initialize experience wrapper backdrop click event when experience is shown.
experienceBackdropElement.addEventListener("click", () => {
  if (activeExperience) {
    // stopExperience();
  }
});

// Function for showing a target map.
function setMap(targetMap) {
  stopExperience();
  activeMap = targetMap;

  // Show map.
  data.maps.forEach((map) => {
    const element = document.getElementById(map.elementId);
    if (map == targetMap) {
      appear(element);
    } else {
      hide(element, true);
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
    hide(element, false);
    setTimeout(() => appear(element), delay);
  };

  const paragraphs = experience.description.map((text, index) => {
    const element = document.createElement("p");
    element.appendChild(document.createTextNode(text));
    hideAndShowDelayed(element, getAppearanceDelay(index));
    return element;
  });
  experienceContentElement.replaceChildren(...paragraphs);

  // // Add delayed appearance animation on header.
  // hideAndShowDelayed(
  //   experienceHeaderElement,
  //   getAppearanceDelay(experience.description.length)
  // );

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
  audio.volume = 1;
  audio.controls = true;

  audioTarget = experience.soundFile;
  audio.addEventListener("loadeddata", () => {
    if (audioTarget == experience.soundFile) {
      audio.play();
    }
  });

  // Replace the old audio element with the new element.
  audioContainerElement.replaceChildren(audio);

  // Make experience wrapper visible.
  appear(experienceWrapperElement);
}

// Function for stopping to show the current experience.
function stopExperience() {
  // Stop audio.
  if (audio) {
    audio.pause();
  }
  audio = null;

  // Update variable and hide wrapper.
  activeExperience = null;
  hide(experienceWrapperElement, true);
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
function hide(e, absolute) {
  if (absolute) {
    e.classList.add("hidden");
  } else {
    e.classList.add("dark");
  }
  e.classList.remove("appearing");
}

// Function for making an element appear.
function appear(e) {
  e.classList.remove("hidden", "dark");
  e.classList.add("appearing");
}

// Function for switching from day to night and vice versa.
function switchTime() {
  // currentTime can initially be "night" or null.
  const timeSwitchingFrom = currentTime;
  const timeSwitchingTo = currentTime == "day" ? "night" : "day";

  document.body.classList.remove(timeSwitchingFrom);
  document.body.classList.add(timeSwitchingTo);

  // Make all trigger elements for this time visible.
  for (let map of data.maps) {
    const triggerElementsAndVisibility = map.triggers
      .filter((trigger) => trigger.type == "showExperience")
      .map((trigger) => [
        document.getElementById(trigger.elementId),
        trigger.mapTimes.includes(timeSwitchingTo),
      ]);

    // First hide all trigger elements.
    for (let [element, _] of triggerElementsAndVisibility) {
      hide(element, true);
    }

    // Then show appropriate elements.
    for (let [element, visibility] of triggerElementsAndVisibility) {
      if (visibility) {
        appear(element);
      }
    }
  }

  currentTime = timeSwitchingTo;
}
