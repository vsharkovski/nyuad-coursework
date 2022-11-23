const toggleNav = () => {
  document.body.dataset.nav =
    document.body.dataset.nav === "false" ? "true" : "false";
};

class ColumnData {
  constructor(route, imageUrl) {
    this.imageUrl = imageUrl;
    this.route = route;
  }
}

const interestsData = [
  new ColumnData("#reading", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#photography", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#coding", "assets/images/pia23444-1600.jpg"),
];

const projectsData = [
  new ColumnData(
    "https://github.com/vsharkovski/Journeys",
    "assets/images/projects/journeys.png"
  ),
  new ColumnData(
    "https://github.com/vsharkovski/Competitive-Programming",
    "assets/images/projects/competitive-programming-repo.png"
  ),
  new ColumnData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-30mmf/",
    "assets/images/projects/commlab-30mmf.png"
  ),
  new ColumnData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-comic/",
    "assets/images/projects/commlab-comic.png"
  ),
  new ColumnData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-sound/",
    "assets/images/projects/commlab-sound.png"
  ),
  new ColumnData(
    "https://vsharkovski.github.io/nyuad-coursework/commlab/assignment-video/",
    "assets/images/projects/commlab-video.png"
  ),
];

const addToColumn = (column, data) => {
  data.forEach((info) => {
    const div = document.createElement("div");
    column.appendChild(div);

    const a = document.createElement("a");
    a.setAttribute("href", info.route);
    div.appendChild(a);

    const img = document.createElement("img");
    img.setAttribute("src", info.imageUrl);
    a.appendChild(img);
  });
};

const leftColumn = document.querySelector(".left-column");
const rightColumn = document.querySelector(".right-column");

addToColumn(leftColumn, interestsData);
addToColumn(rightColumn, projectsData);
