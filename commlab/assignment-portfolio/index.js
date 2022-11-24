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

/*
Items
*/

class ItemData {
  constructor(route, imageUrl, title = "") {
    this.route = route;
    this.imageUrl = imageUrl;
    this.title = title;
  }
}

const navData = [
  new ItemData("#about", "assets/images/pia23444-1600.jpg", "About"),
  new ItemData("#projects", "assets/images/pia23444-1600.jpg", "Projects"),
  new ItemData("#contact", "assets/images/pia23444-1600.jpg", "Contact"),
];

const navLinks = document.querySelector("#nav-links");

navData.forEach((item) => {
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

const interestsData = [
  new ItemData("#reading", "assets/images/pia23444-1600.jpg"),
  new ItemData("#photography", "assets/images/pia23444-1600.jpg"),
  new ItemData("#coding", "assets/images/pia23444-1600.jpg"),
];

const projectsData = [
  new ItemData(
    "https://github.com/vsharkovski/Journeys",
    "assets/images/projects/journeys.png"
  ),
  new ItemData(
    "https://github.com/vsharkovski/Competitive-Programming",
    "assets/images/projects/competitive-programming-repo.png"
  ),
  new ItemData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-30mmf/",
    "assets/images/projects/commlab-30mmf.png"
  ),
  new ItemData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-comic/",
    "assets/images/projects/commlab-comic.png"
  ),
  new ItemData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-sound/",
    "assets/images/projects/commlab-sound.png"
  ),
  new ItemData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-video/",
    "assets/images/projects/commlab-video.png"
  ),
];

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

addToColumn(leftColumn, interestsData);
addToColumn(rightColumn, projectsData);

/*
Focus change on navigation
*/

window.addEventListener("hashchange", (event) => {
  const hashURLIndex = event.newURL.lastIndexOf("#");
  if (hashURLIndex === -1) {
    return;
  }
  const hash = event.newURL.slice(hashURLIndex + 1, event.newURL.length);
  if (!hash) {
    return;
  }
  console.log(hash);
});
