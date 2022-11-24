/*
Focus
*/

let currentFragment = null;
let focusedItem = null;

const setFocus = (focus) => {
  const ds = document.body.dataset;
  if (focus !== "main" && focus !== "nav" && focus !== "item") {
    console.error("Invalid focus value");
    return;
  }
  ds.focus = focus;
};

// Navigate based on fragment
const navigateFromFragment = (fragment) => {
  if (fragment === currentFragment) return;
  currentFragment = fragment;
  window.location.hash = fragment;
  if (fragment === "" || fragment === "#" || fragment === "#main") {
    setFocus("main");
    if (focusedItem) {
      focusedItem.classList.remove("focused-item-page");
      focusedItem = null;
    }
  } else if (fragment === "#nav") {
    setFocus("nav");
    if (focusedItem) {
      focusedItem.classList.remove("focused-item-page");
      focusedItem = null;
    }
  } else {
    setFocus("item");
    // show the item
    const elem = document.querySelector(fragment);
    if (elem && elem != focusedItem) {
      if (focusedItem) {
        focusedItem.classList.remove("focused-item-page");
      }
      focusedItem = elem;
      focusedItem.classList.add("focused-item-page");
    }
  }
};

// Process initial fragment
navigateFromFragment(window.location.hash);

// Process fragment change
window.addEventListener("hashchange", (event) => navigateFromFragment(window.location.hash));

// Handle clicking nav toggle
const navToggle = document.querySelector("#nav-toggle");

navToggle.addEventListener("click", () => {
  const fragment = window.location.hash;
  if (fragment === "" || fragment === "#" || fragment === "#main") {
    // now on main, go to nav
    navigateFromFragment("#nav");
  } else {
    // go back to main
    navigateFromFragment("#main");
  }
});

/*
Items
*/

const allData = [
  {
    category: "nav",
    route: "#about",
    imageUrl: "assets/images/nav/whoami.jpg",
    title: "About",
  },
  {
    category: "nav",
    route: "#projects",
    imageUrl: "assets/images/nav/hard-working.jpg",
    title: "Projects",
  },
  {
    category: "interests",
    route: "https://palewebserial.wordpress.com/",
    imageUrl: "assets/images/interests/pale-prologue.jpg",
  },
  {
    category: "interests",
    route: "#about",
    imageUrl: "assets/images/interests/drvo-na-rid.jpg",
  },
  {
    category: "interests",
    route: "https://twigserial.wordpress.com/",
    imageUrl: "assets/images/interests/twig-god.jpg",
  },
  {
    category: "interests",
    route: "#about",
    imageUrl: "assets/images/interests/selo-prespa.jpg",
  },
  {
    category: "interests",
    route: "https://github.com/vsharkovski",
    imageUrl: "assets/images/interests/journeys-location-service.jpg",
  },
  {
    category: "interests",
    route: "#about",
    imageUrl: "assets/images/interests/skopje-vardar.jpg",
  },
  {
    category: "projects",
    route: "https://github.com/vsharkovski/Journeys",
    imageUrl: "assets/images/projects/journeys.jpg",
  },
  {
    category: "projects",
    route: "https://github.com/vsharkovski/Competitive-Programming",
    imageUrl: "assets/images/projects/competitive-programming-repo.jpg",
  },
  {
    category: "projects",
    route: "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-30mmf/",
    imageUrl: "assets/images/projects/commlab-30mmf.jpg",
  },
  {
    category: "projects",
    route: "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-comic/",
    imageUrl: "assets/images/projects/commlab-comic.jpg",
  },
  {
    category: "projects",
    route: "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-sound/",
    imageUrl: "assets/images/projects/commlab-sound.jpg",
  },
  {
    category: "projects",
    route: "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-video/",
    imageUrl: "assets/images/projects/commlab-video.jpg",
  },
];

// Add all nav items
const navLinks = document.querySelector("#nav-links");

allData
  .filter((it) => it.category == "nav")
  .forEach((item) => {
    const a = document.createElement("a");
    a.setAttribute("href", item.route);
    a.classList.add("nav-link");
    navLinks.appendChild(a);

    const h = document.createElement("h4");
    h.innerHTML = item.title;
    a.appendChild(h);

    const img = document.createElement("img");
    img.src = item.imageUrl;
    a.appendChild(img);
  });

// Add all column items
const createElementFromDataPoint = (data) => {
  const div = document.createElement("div");

  const a = document.createElement("a");
  a.setAttribute("href", data.route);
  div.appendChild(a);

  const img = document.createElement("img");
  img.setAttribute("src", data.imageUrl);
  a.appendChild(img);

  return div;
};

const addToColumn = (column, data) => {
  for (let iteration = 0; iteration < 2; iteration++) {
    data.forEach((dataPoint) => {
      const elem = createElementFromDataPoint(dataPoint);
      column.appendChild(elem);
    });
  }
};

addToColumn(
  document.querySelector("#about .scrolling-column"),
  allData.filter((it) => it.category === "interests")
);

addToColumn(
  document.querySelector("#projects .scrolling-column"),
  allData.filter((it) => it.category === "projects")
);

/*
Add items in random order to main grid
*/

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

// shuffle the items
const shuffledData = allData.filter((it) => it.category === "interests" || it.category === "projects");
shuffleArray(shuffledData);

// create grid columns
const numGridColumns = 4;
const columns = [];
const grid = document.querySelector("#main-grid");
let itemToAddIndex = 0;

for (let colIndex = 0; colIndex < numGridColumns; colIndex++) {
  // create column element
  const col = document.createElement("div");
  col.classList.add("main-grid-column");
  grid.appendChild(col);
  columns.push(col);

  // add items to this column
  let numToAdd = Math.min(Math.floor(shuffledData.length / numGridColumns, shuffledData.length - itemToAddIndex + 1));
  while (numToAdd > 0) {
    // add next item
    const elem = createElementFromDataPoint(shuffledData[itemToAddIndex]);
    col.appendChild(elem);

    // update indices
    itemToAddIndex++;
    numToAdd--;
  }
}
