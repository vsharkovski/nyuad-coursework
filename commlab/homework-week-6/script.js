const starMoveStart = 13000;
const starMoveEnd = 52000;
const fadeoutStart = 71000;
const fadeoutEnd = 72000;

function createStar(xOffset = 0) {
  const height = Math.random();
  const x = Math.random() * 100 + xOffset;
  const y = Math.random() * 100;
  const star = $(`
    <div
      class="star aspect-1-1"
      style="height: ${height}%; top: ${y.toString()}%; left: ${x.toString()}%"
      data-${starMoveStart}="left: ${x.toString()}%"
      data-${starMoveEnd}="left: ${x - 105}%"
      data-${fadeoutStart}="opacity: 1"
      data-${fadeoutEnd}="opacity: 0"
    </div>
  `);
  return star;
}

$(document).ready(function () {
  for (let i = 0; i < 50; i++) {
    const star = createStar();
    $("body").append(star);
  }
  for (let i = 0; i < 50; i++) {
    const star = createStar(100);
    $("body").append(star);
  }
  const sk = skrollr.init();
});
