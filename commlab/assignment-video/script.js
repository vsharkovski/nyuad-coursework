// selecting various elements
const previewsContainer = document.querySelector(".previews-container");
const previews = document.querySelectorAll(".story-preview");

const detailContainer = document.querySelector(".detail-container");
const detailTitle = detailContainer.querySelector("h1");
const vimeoEmbed = document.querySelector("iframe");

// data for the videos
const data = [
  [
    "A Man Died Falling!",
    "There has been another report that somebody fell from the in front of the Arts Center",
    "assets/images/personFalling.png",
    "https://player.vimeo.com/video/773403299?h=17278abddc&badge=0&autopause=0&player_id=0&app_id=58479/embed",
  ],
  [
    "Wild Animal on the Loose!",
    "Oh my God! There is a wild animal on the loose! All the residents at NYU Abu Dhabi",
    "assets/images/dangerousAnimal.png",
    "https://player.vimeo.com/video/773403798?h=a643d43a7e&badge=0&autopause=0&player_id=0&app_id=58479/embed",
  ],
  [
    "Fire in D2!",
    "There has been a report that there is a huge fire in D2",
    "assets/images/fire.png",
    "https://player.vimeo.com/video/773405792?h=820afeb133&badge=0&autopause=0&player_id=0&app_id=58479/embed",
  ],
];

previews.forEach((preview, index) => {
  // set title and description
  preview.querySelector("h2").innerHTML = data[index][0];
  preview.querySelector("p").innerHTML = data[index][1];
  preview.querySelector("img").setAttribute("src", data[index][2]);
  // add click event listener
  preview.addEventListener("click", function () {
    // hide all previews
    previewsContainer.classList.add("invisible");
    // show story detail
    detailTitle.innerHTML = data[index][0];
    vimeoEmbed.setAttribute("title", data[index][0]);
    vimeoEmbed.setAttribute("src", data[index][3]);
    detailContainer.classList.remove("invisible");
  });
});

// time label
const formattedTime = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const timeLabel = document.querySelector(".time-label");
timeLabel.innerHTML = `(${formattedTime})`;
