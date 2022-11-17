// Status is either 'not started', 'playing', or 'lost', or 'won'
let gameStatus = "not started";
let currentPanel = "";

// Scroll delay in milliseconds
const scrollDelay = 1000;

// Lose time in milliseconds
// (Time before scrolling to lose panel)
const loseDelay = 1000;

let clickedDocumentOnce = false;

$(document).ready(function () {
  // prepare game start
  prepareStartGame();

  // On document click first time
  $(document).click(function () {
    if (!clickedDocumentOnce) {
      clickedDocumentOnce = true;
      updateMusic();
    }
  });

  // On start button click
  $("#btn-start").click(function () {
    if (gameStatus == "not started" && currentPanel == "welcome") {
      gameStatus = "playing";
      updateMusic();
      continueToPanel(
        "bedroom",
        $("#bedroom-panel"),
        dummyAfterAnimation,
        bedroomAnimation
      );
    }
  });

  // On restart button click (note: multiple buttons)
  // Please do not change it to #btn-restart
  $(".btn-restart").click(function () {
    if (gameStatus == "lost" || gameStatus == "won") {
      prepareStartGame();
    }
  });

  // Bedroom events
  $("#bedroom-panel .trigger-wrong").click(function () {
    if (gameStatus == "playing" && currentPanel == "bedroom") {
      loseGame(
        "Kitty touched a wire from the lamp, got shocked and died... R.I.P."
      );
    }
  });
  $("#bedroom-panel .trigger-right").click(function () {
    if (gameStatus == "playing" && currentPanel == "bedroom") {
      continueToPanel(
        "kitchen",
        $("#kitchen-panel"),
        bedroomAfterAnimation,
        kitchenAnimation
      );
    }
  });

  // Kitchen events
  $("#kitchen-panel .trigger-wrong").click(function () {
    if (gameStatus == "playing" && currentPanel == "kitchen") {
      loseGame("Kitty touched the toaster and became toast itself... R.I.P.");
    }
  });
  $("#kitchen-panel .trigger-right").click(function () {
    if (gameStatus == "playing" && currentPanel == "kitchen") {
      continueToPanel(
        "living-room",
        $("#living-room-panel"),
        kitchenAfterAnimation,
        livingRoomAnimation
      );
    }
  });

  // Living room events
  $("#living-room-panel .trigger-wrong").click(function () {
    if (gameStatus == "playing" && currentPanel == "living-room") {
      loseGame("Kitty touched the TV and the TV fell over it... R.I.P.");
    }
  });
  $("#living-room-panel .trigger-right").click(function () {
    if (gameStatus == "playing" && currentPanel == "living-room") {
      continueToPanel(
        "bathroom",
        $("#bathroom-panel"),
        livingRoomAfterAnimation,
        bathroomAnimation
      );
    }
  });

  // Bathroom events
  $("#bathroom-panel .trigger-wrong").click(function () {
    if (gameStatus == "playing" && currentPanel == "bathroom") {
      loseGame("Kitty fell in the bathtub and fell asleep forever... R.I.P.");
    }
  });
  $("#bathroom-panel .trigger-right").click(function () {
    if (gameStatus == "playing" && currentPanel == "bathroom") {
      continueToPanel(
        "garage",
        $("#garage-panel"),
        bathroomAfterAnimation,
        garageAnimation
      );
    }
  });

  // Garage events
  $("#garage-panel .trigger-wrong").click(function () {
    if (gameStatus == "playing" && currentPanel == "garage") {
      loseGame(
        "Kitty accidentally turned on the lawnmower and became pasta... R.I.P."
      );
    }
  });
  $("#garage-panel .trigger-right").click(function () {
    if (gameStatus == "playing" && currentPanel == "garage") {
      garageAfterAnimation(function () {
        gameStatus = "won";
        doConfetti();
        updateMusic();
        continueToPanel("win", $("#win-panel"));
      });
    }
  });

  // Button animations
  $(".bubbly-button").click(function (btn) {
    btn = $(btn);
    btn.removeClass("animate");
    btn.addClass("animate");
    setTimeout(function () {
      btn.removeClass("animate");
    }, 700);
  });

  // Cat follow cursor
  let mouseOldX = 0;
  $(document).mousemove(function (e) {
    const cat = $("#cat");

    // flip cat if needed
    if (e.pageX < mouseOldX) {
      cat.css({ transform: "scaleX(1)" });
    } else if (mouseOldX  < e.pageX) {
      cat.css({ transform: "scaleX(-1)" });
    }

    // position the cat
    cat.css({ left: e.pageX - 20, top: e.pageY - 20 });

    // update old mouse position
    mouseOldX = e.pageX;
  });
});

// Core game

function scrollTo(elem) {
  const scrollOffset = 100;
  $("html, body").animate(
    { scrollTop: elem.offset().top - scrollOffset },
    scrollDelay
  );
}

function prepareStartGame() {
  gameStatus = "not started";
  updateMusic();
  $(".panel, #mouse").css({ visibility: "hidden" });
  continueToPanel("welcome", $("#welcome-panel"));
}

function loseGame(loseMessage) {
  gameStatus = "lost";
  currentPanel = "lose";
  updateMusic();
  // after a delay...
  setTimeout(function () {
    // make all panels invisible
    $(".panel").css({ visibility: "hidden" });
    // set message in lose panel
    $("#lose-panel p").html(loseMessage);
    // go to lose panel
    continueToPanel("lose", $("#lose-panel"));
  }, loseDelay);
}

function continueToPanel(
  nextPanelName,
  nextPanel,
  currPanelEndAnim = dummyAfterAnimation,
  nextPanelAnim = function () {}
) {
  currentPanel = nextPanelName;
  currPanelEndAnim(function () {
    // make next panel visible and scroll to it
    nextPanel.css({ visibility: "visible" });
    scrollTo(nextPanel);
    // animate things 500 ms after scroll finishes
    setTimeout(nextPanelAnim, scrollDelay + 500);
  });
}

// Music

function updateMusic() {
  const ns = $("#music-welcome")[0];
  const bg = $("#music-background")[0];
  const ls = $("#music-game-over")[0];
  const wn = $("#music-victory")[0];

  if (gameStatus == "not started") {
    if (!bg.paused) bg.pause();
    if (!ls.paused) ls.pause();
    if (!wn.paused) wn.pause();
    ns.volume = 0.2;
    ns.loop = true;
    if (clickedDocumentOnce) {
      ns.play();
    }
  } else if (gameStatus == "playing") {
    if (!ns.paused) ns.pause();
    if (!ls.paused) ls.pause();
    if (!wn.paused) wn.pause();
    bg.volume = 0.2;
    bg.loop = true;
    bg.play();
  } else if (gameStatus == "lost") {
    if (!bg.paused) bg.pause();
    if (!ns.paused) ns.pause();
    if (!wn.paused) wn.pause();
    ls.volume = 0.2;
    ls.play();
  } else if (gameStatus == "won") {
    if (!bg.paused) bg.pause();
    if (!ls.paused) ls.pause();
    if (!ns.paused) ns.pause();
    wn.volume = 0.2;
    wn.play();
  }
}

// In all animations, we
// append mouse to the image container to move
// the mouse in positions relative to the container

function dummyAfterAnimation(afterFn) {
  afterFn();
}

function bedroomAnimation() {
  const mouse = $("#mouse");
  $("#bedroom-panel .panel-image-container").append(mouse);
  // doing this instead of chaining functions prevents 'callback hell'
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "80%",
        left: "1%",
      })
      .animate({ top: "60%", left: "20%" }, 500, f2);
  }
  function f2() {
    mouse
      .css({ transform: "scaleX(1)" })
      .animate({ top: "40%", left: "16%", transform: "scaleX(1)" }, 500, f3);
  }
  function f3() {
    mouse
      .css({ transform: "scaleX(-1)" })
      .animate({ top: "50%", left: "50%" }, 200)
      .animate({ top: "40%", left: "65%" }, 100)
      .animate({ top: "80%", left: "90%" }, 100, f4);
  }
  function f4() {
    mouse
      .css({ transform: "scaleX(1)" })
      .animate({ top: "86%", left: "50%" }, 100, f5);
  }
  function f5() {
    mouse.css({ visibility: "hidden" });
  }
  f1();
}

function bedroomAfterAnimation(afterFn) {
  const mouse = $("#mouse");
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(1)",
        top: "86%",
        left: "50%",
      })
      .animate({ top: "92%", left: "0%" }, 200, f2);
  }
  function f2() {
    mouse.css({ visibility: "hidden" });
    afterFn();
  }
  f1();
}

function kitchenAnimation() {
  const mouse = $("#mouse");
  $("#kitchen-panel .panel-image-container").append(mouse);
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "95%",
        left: "5%",
      })
      .animate({ top: "80%", left: "50%" }, 500, f2);
  }
  function f2() {
    mouse
      .css({ transform: "scaleX(1)" })
      .animate({ top: "53%", left: "13%" }, 200, f3);
  }
  function f3() {
    mouse
      .css({ transform: "scaleX(-1)" })
      .animate({ top: "50%", left: "67%" }, 200, f4);
  }
  function f4() {
    mouse.css({ visibility: "hidden" });
  }
  f1();
}

function kitchenAfterAnimation(afterFn) {
  const mouse = $("#mouse");
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "50%",
        left: "67%",
      })
      .animate({ top: "92%", left: "95%" }, 200, f2);
  }
  function f2() {
    mouse.css({ visibility: "hidden" });
    afterFn();
  }
  f1();
}

function livingRoomAnimation() {
  const mouse = $("#mouse");
  $("#living-room-panel .panel-image-container").append(mouse);
  function circleRun(timesRemaining, afterFn) {
    mouse.animate({ top: "67%", left: "36%" }, 50);
    mouse.animate({ top: "67%", left: "60%" }, 50);
    mouse.animate({ top: "73%", left: "60%" }, 50);
    if (timesRemaining == 1) {
      // this is last time
      mouse.animate({ top: "73%", left: "36%" }, 50, afterFn);
    } else {
      mouse.animate({ top: "73%", left: "36%" }, 50);
      circleRun(timesRemaining - 1, afterFn);
    }
  }
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(1)",
        top: "95%",
        left: "95%",
      })
      .animate({ top: "70%", left: "50%" }, 1000)
      .animate({ top: "70%", left: "48%" }, 1000);
    circleRun(10, f2);
  }
  function f2() {
    mouse.animate({ top: "80%", left: "13%" }, 50, f3);
  }
  function f3() {
    mouse.css({ visibility: "hidden" });
  }
  f1();
}

function livingRoomAfterAnimation(afterFn) {
  const mouse = $("#mouse");
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "80%",
        left: "13%",
      })
      .animate({ top: "95%", left: "17%" }, 200, f2);
  }
  function f2() {
    mouse.css({ visibility: "hidden" });
    afterFn();
  }
  f1();
}

function bathroomAnimation() {
  const mouse = $("#mouse");
  $("#bathroom-panel .panel-image-container").append(mouse);
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "90%",
        left: "5%",
      })
      .animate({ top: "90%", left: "85%" }, 1000, f2);
  }
  function f2() {
    mouse
      .css({ transform: "scaleX(1)" })
      .animate({ top: "68%", left: "85%" }, 500)
      .animate({ top: "55%", left: "60%" }, 1000)
      .animate({ top: "45%", left: "15%" }, 200, f3);
  }
  function f3() {
    mouse
      .css({ transform: "scaleX(-1)" })
      .animate({ top: "42%", left: "35%" }, 200)
      .animate({ top: "55%", left: "42%" }, 60, f4);
  }
  function f4() {
    mouse.css({ visibility: "hidden" });
  }
  f1();
}

function bathroomAfterAnimation(afterFn) {
  const mouse = $("#mouse");
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "70%",
        left: "42%",
      })
      .animate({ top: "95%", left: "70%" }, 200, f2);
  }
  function f2() {
    mouse.css({ visibility: "hidden" });
    afterFn();
  }
  f1();
}

function garageAnimation() {
  const mouse = $("#mouse");
  $("#garage-panel .panel-image-container").append(mouse);
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "90%",
        left: "5%",
      })
      .animate({ top: "85%", left: "45%" }, 1000)
      .animate({ top: "20%", left: "55%" }, 300)
      .animate({ top: "20%", left: "75%" }, 500, f2);
  }
  function f2() {
    mouse
      .css({
        transform: "scaleX(1)",
      })
      .animate({ top: "20%", left: "55%" }, 700)
      .animate({ top: "88%", left: "30%" }, 100, f3);
  }
  function f3() {
    mouse
      .css({
        transform: "scaleX(-1)",
      })
      .animate({ top: "85%", left: "55%" }, 70, f4);
  }
  function f4() {
    mouse.css({ visibility: "hidden" });
  }
  f1();
}

function garageAfterAnimation(afterFn) {
  const mouse = $("#mouse");
  function f1() {
    mouse
      .css({
        visibility: "visible",
        transform: "scaleX(-1)",
        top: "85%",
        left: "55%",
      })
      .animate({ top: "95%", left: "95%" }, 200, f2);
  }
  function f2() {
    mouse.css({ visibility: "hidden" });
    afterFn();
  }
  f1();
}

// Confetti effect

function doConfetti() {
  tsParticles.load("tsparticles", {
    fullScreen: {
      zIndex: 1,
    },
    emitters: {
      position: {
        x: 50,
        y: 100,
      },
      rate: {
        quantity: 5,
        delay: 0.15,
      },
      life: {
        duration: 3,
        count: 1,
      },
    },
    particles: {
      color: {
        value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"],
      },
      move: {
        decay: 0.05,
        direction: "top",
        enable: true,
        gravity: {
          enable: true,
        },
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: {
          min: 50,
          max: 100,
        },
      },
      number: {
        value: 0,
      },
      opacity: {
        value: 1,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 30,
        },
      },
      size: {
        value: 3,
        animation: {
          enable: true,
          startValue: "min",
          count: 1,
          speed: 16,
          sync: true,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enlighten: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 5,
          max: 15,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -7,
          max: 7,
        },
      },
      shape: {
        type: ["circle", "square", "triangle"],
        options: {},
      },
    },
    responsive: [
      {
        maxWidth: 1024,
        options: {
          particles: {
            move: {
              speed: {
                min: 33,
                max: 66,
              },
            },
          },
        },
      },
    ],
  });
}
