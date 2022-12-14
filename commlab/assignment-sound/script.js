// The 'defer' keyword in html for this script makes this script
// run only when document is ready.

const audio = document.querySelector("#player");
const slideshow = document.querySelector("#slideshow");

/*
Format:
- path to image
- time moment at which to show the image (in seconds)
*/
const pictures = [
  ["assets/images/morning1.jpg", 0],
  ["assets/images/brush1.jpg", 10],
  ["assets/images/cereal.jpg", 22],
  ["assets/images/walk.jpg", 40],
  ["assets/images/dining.jpg", 50],
  ["assets/images/class.jpg", 65],
  ["assets/images/door.jpg", 82],
  ["assets/images/study.jpg", 90],
  ["assets/images/store.jpg", 107],
  ["assets/images/pingpong.jpg", 122],
  ["assets/images/mkp.jpg", 135],
  ["assets/images/basketball.jpg", 142],
  ["assets/images/dark.jpg", 155],
  ["assets/images/night.jpg", 164],
];

// Add the pictures to the HTML.
for (let i = 0; i < pictures.length; i++) {
  pictures[i].push(document.createElement("img"));
  pictures[i][2].setAttribute("src", pictures[i][0]);
  slideshow.appendChild(pictures[i][2]);
}

// Picture transitioning.
let activeIdx = -1;

function transition(nextIdx) {
  for (let i = 0; i < pictures.length; i++) {
    if (i != nextIdx) {
      pictures[i][2].classList.add("transparent");
    }
  }
  pictures[nextIdx][2].classList.remove("transparent");
  activeIdx = nextIdx;
}

// Transition to 0 for the start.
transition(0);

// Track the time moment in the audio.
let prevTime = 0; // time checked in previous iteration

setInterval(function () {
  time = audio.currentTime; // current time being checked
  if (prevTime < time) {
    // Moved forward in time, see if we should transition forwards.
    // Find the picture with biggest index to transition to.
    for (let i = pictures.length - 1; i >= 0; i--) {
      const picTransitionTime = pictures[i][1];
      if (prevTime < picTransitionTime && picTransitionTime <= time) {
        transition(i);
        break;
      }
    }
  } else if (time < prevTime) {
    // Moved backward in time, see if we should transition backwards.
    // Find the picture with smallest index to transition to.
    for (let i = 1; i < pictures.length; i++) {
      const picTransitionTime = pictures[i][1];
      if (time <= picTransitionTime && picTransitionTime < prevTime) {
        transition(i - 1);
        break;
      }
    }
  }
  prevTime = time;
}, 100);
