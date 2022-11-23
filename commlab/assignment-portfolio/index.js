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
  new ColumnData("#journeys", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#cp-repo", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#commlab-30mmf", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#commlab-comic", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#commlab-sound", "assets/images/pia23444-1600.jpg"),
  new ColumnData("#commlab-video", "assets/images/pia23444-1600.jpg"),
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
