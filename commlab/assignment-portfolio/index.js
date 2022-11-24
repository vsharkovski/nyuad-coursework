/*
Focus
*/

const setFocus = (focus, item) => {
  const ds = document.body.dataset;
  if (focus === "main") {
    // pass
  } else if (focus === "nav") {
    // pass
  } else if (focus === "item") {
    // show the item
  } else {
    console.error("Invalid focus value");
    return;
  }
  ds.focus = focus;
};

const navToggle = document.querySelector("#nav-toggle");

navToggle.addEventListener("click", () => {
  const ds = document.body.dataset;
  if (ds.focus === "main") {
    setFocus("nav");
  } else {
    setFocus("main");
  }
});

// Focus change on navigation (when the route anchor changes)
window.addEventListener("hashchange", (event) => {
  const fragment = getRouteFragment(event.newURL);
  console.log(fragment);
});

// Utility functiion to get route anchor
const getRouteFragment = (url) => {
  const hashURLIndex = url.lastIndexOf("#");
  if (hashURLIndex === -1) return null;
  const hash = url.slice(hashURLIndex + 1, url.length);
  return hash;
};

/*
Items
*/

class ItemData {
  constructor(category, route, imageUrl, title = "") {
    this.category = category;
    this.route = route;
    this.imageUrl = imageUrl;
    this.title = title;
  }
}

const allData = [
  new ItemData("nav", "#about", "assets/images/pia23444-1600.jpg", "About"),
  new ItemData(
    "nav",
    "#projects",
    "assets/images/pia23444-1600.jpg",
    "Projects"
  ),
  new ItemData("nav", "#contact", "assets/images/pia23444-1600.jpg", "Contact"),
  new ItemData("interests", "#reading", "assets/images/pia23444-1600.jpg"),
  new ItemData("interests", "#photography", "assets/images/pia23444-1600.jpg"),
  new ItemData("interests", "#coding", "assets/images/pia23444-1600.jpg"),
  new ItemData(
    "projects",
    "https://github.com/vsharkovski/Journeys",
    "assets/images/projects/journeys.png"
  ),
  new ItemData(
    "projects",
    "https://github.com/vsharkovski/Competitive-Programming",
    "assets/images/projects/competitive-programming-repo.png"
  ),
  new ItemData(
    "projects",
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-30mmf/",
    "assets/images/projects/commlab-30mmf.png"
  ),
  new ItemData(
    "projects",
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-comic/",
    "assets/images/projects/commlab-comic.png"
  ),
  new ItemData(
    "projects",
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-sound/",
    "assets/images/projects/commlab-sound.png"
  ),
  new ItemData(
    "projects",
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-video/",
    "assets/images/projects/commlab-video.png"
  ),
];

const navLinks = document.querySelector("#nav-links");

allData
  .filter((it) => it.category == "nav")
  .forEach((item) => {
    const a = document.createElement("a");
    a.setAttribute("href", item.route);
    a.classList.add("nav-link");
    navLinks.appendChild(a);

    const h2 = document.createElement("h2");
    h2.innerHTML = item.title;
    a.appendChild(h2);

    const img = document.createElement("img");
    img.src = item.imageUrl;
    a.appendChild(img);
  });

const addToColumn = (column, data) => {
  data.forEach((item) => {
    const div = document.createElement("div");
    column.appendChild(div);

    const a = document.createElement("a");
    a.setAttribute("href", item.route);
    div.appendChild(a);

    const img = document.createElement("img");
    img.setAttribute("src", item.imageUrl);
    a.appendChild(img);
  });
};

const leftColumn = document.querySelector(".left-column");
const rightColumn = document.querySelector(".right-column");

addToColumn(
  leftColumn,
  allData.filter((it) => it.category === "interests")
);
addToColumn(
  rightColumn,
  allData.filter((it) => it.category === "projects")
);
