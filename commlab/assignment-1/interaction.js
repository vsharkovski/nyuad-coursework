$(document).ready(function () {
  /*
   * Nav logo rotation and movement
   */
  const logo = $(".nav-logo");
  const logoContainer = $(".nav-logo-container");

  const animationUpdateMs = 20;
  const rotationFactor = 1 / 20;
  const translationFactor = 1 / 3000;

  // Every few milliseconds, rotate the logo a small amount clockwise
  // And also move it (oscillate) left and right
  setInterval(function () {
    const date = new Date();
    const angle = (date.getTime() * rotationFactor) % 360;
    const rotateString = "rotate(" + angle.toString() + "deg) ";

    // position = ((number between -1 and 1) * 0.5) * width of container
    const position =
      (Math.sin(date.getTime() * translationFactor) / 2) *
      logoContainer.width();
    const translateString = "translate(" + position.toString() + "%, 0%)";

    // Order is important (rightmost is applied first)
    logo.css("transform", translateString + " " + rotateString);
  }, animationUpdateMs);

  /*
   * Image switch on click
   */
  const mainImage = $(".main-image");
  const imageSources = [
    "assets/bear-wave-400x400.png",
    "assets/bear-wave-2-400x400.png",
  ];
  let currentImageSourceIdx = 0;

  mainImage.click(function () {
    currentImageSourceIdx = (currentImageSourceIdx + 1) % imageSources.length;
    mainImage[0].src = imageSources[currentImageSourceIdx];
  });

  /*
   * Behind-the-scenes visibility tracking
   */
  const btsTrigger = $(".bts-trigger");
  const btsSection = $("#behind-the-scenes");

  // Whether we've shown the behind-the-scenes section
  let isBtsSectionShown = false;
  // How long to wait before checking if the behind-the-scenes section
  // should be shown on the screen
  const trackingDelayMs = 20;
  // The time window allowed for clicking between the first and last
  // event we are tracking
  const timeWindowMs = 8000;
  // The last 3 times when the logo was clicked,
  // in number of milliseconds since epoch.
  // Times are sorted (oldest --> newest)
  const lastLogoClickMs = [0, 0, 0];
  // The last time the 'About me' picture was clicked
  let lastPictureClickMs = 0;
  // The last time the bts-trigger was clicked
  let lastTriggerClickMs = 0;

  // When logo is clicked, remove oldest time and add newest (current)
  logo.click(function () {
    lastLogoClickMs.shift();
    const date = new Date();
    lastLogoClickMs.push(date.getTime());
  });

  // When the 'About me' picture is clicked, update the time
  mainImage.click(function () {
    const date = new Date();
    lastPictureClickMs = date.getTime();
  });

  // When the trigger is clicked, update the time
  btsTrigger.click(function () {
    const date = new Date();
    lastTriggerClickMs = date.getTime();
  });

  // Event listener that shows the behind-the-scenes section
  // if at any moment the teddy bear logo is clicked 3 times in\
  // succession and then the trigger is clicked, all within
  // the allowed time range
  setInterval(function () {
    if (
      !isBtsSectionShown &&
      lastLogoClickMs[0] > 0 &&
      lastPictureClickMs > 0 &&
      lastTriggerClickMs > 0 &&
      lastLogoClickMs[2] < lastPictureClickMs &&
      lastPictureClickMs < lastTriggerClickMs &&
      lastTriggerClickMs - lastLogoClickMs[0] < timeWindowMs
    ) {
      isBtsSectionShown = true;
      // make section visible
      btsSection.removeClass("visibility-hidden");
      // scroll to it
      btsSection[0].scrollIntoView();
    }
  }, trackingDelayMs);
});
