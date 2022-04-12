$(document).ready(() => {
  // hide the loading screen and show the home page
  $(".loadingScreen").fadeOut();
  $(".homeScreen").fadeIn("slow", () => {
    //when first screen is displayed
    // any code write here:
    var started = false;

    // sound element
    var sound = document.getElementById("sound");
    var soundPlaying = false;
    var pauseButton = document.getElementById("pause");
    var playButton = document.getElementById("play");

    //when user clicks takeoff button
    let takeOffBtn = $("#takeOffBtn");
    takeOffBtn.on("click", () => {
      $(".takeoffclass").fadeOut();
      started = true;
    });

    const playSound = () => {
      sound.play();
      playButton.style.display = "none";
      pauseButton.style.display = "block"
      soundPlaying = true;
    };
    const pauseSound = () => {
      sound.pause();
      soundPlaying = false;
      pauseButton.style.display = "none"
      playButton.style.display = "block";
    };

    pauseButton.addEventListener("click", function (e) {
      pauseSound();
    });
    playButton.addEventListener("click", function (e) {
      playSound();
    });

    //Prevent the user from using the keyboard to engage with the website except for the space bar to start/stop the music

    window.addEventListener("keydown", function (e) {
      // space, page up, page down and arrow keys:
      if ([33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
      if ([32].indexOf(e.keyCode) > -1) {
        e.preventDefault();
        if (soundPlaying && started) {
          pauseSound();
        } else if (!soundPlaying && planeUp) {
          playSound();
        }
      }
    }, false);

    // prevent scroll
    window.addEventListener("wheel", e => e.preventDefault(), { passive: false });

    //audio
    // getting the cloud and audio elements
    var audio = document.getElementById("sound");

    var slow = document.querySelectorAll(".slow");
    var sunimg = document.querySelector(".sunimg");
    var slower = document.querySelectorAll(".slower");
    var slowest = document.querySelectorAll(".slowest");

    var allClouds = [...slow, ...slower, ...slowest];
    var sound2 = document.getElementById("sound2");

    // add click listener
    allClouds.forEach((thisCloud) => {
      thisCloud.addEventListener("click", (event) => {
        clickEffect(event);
        // console.log(event.clientX);
        // console.log(event.clientY)
        const rndnum = Math.floor(Math.random() * 2);
        sound2.play();
        if (rndnum === 0) {
          const myElem = document.createElement("div");
          myElem.className = "lightning1";
          myElem.style.left = `${event.clientX - 200}px`;
          myElem.style.top = `${event.clientY}px`;
          document.body.appendChild(myElem);
          setTimeout(() => {
            document.body.removeChild(myElem);
          }, 1100);
        } else {
          const myElem = document.createElement("div");
          myElem.className = "lightning2";
          myElem.style.left = `${event.clientX - 330}px`;
          myElem.style.top = `${event.clientY}px`;
          document.body.appendChild(myElem);
          var mybool = false;
          var myInterval = setInterval(() => {
            if (mybool) {
              myElem.style.background = "url('../pics/l2.png')";
              mybool = false;
            } else {
              myElem.style.background = "url('../pics/l3.png')";
              mybool = true;
            }
          }, 300);
          setTimeout(() => {
            clearInterval(myInterval);
            document.body.removeChild(myElem);
          }, 1100);
        }
      });
    });

    // click effect
    const clickEffect = (e) => {
      const myEffect = document.createElement("div");
      myEffect.className = "clickeffect";
      myEffect.style.left = `${e.clientX}px`;
      myEffect.style.top = `${e.clientY}px`;
      myEffect.style.animation = `clickeffectanim .4s  linear`;
      document.body.appendChild(myEffect);
      // remove this element
      myEffect.onanimationend = () => {
        document.body.removeChild(myEffect);
      };
    }


    const updatePosition = () => {
      // checking if sound is playing and move the clouds accordingly
      if (soundPlaying) {
        slow.forEach(obj => {
          var position = obj.getBoundingClientRect();
          obj.style.left = position.left - 0.4 + 'px';

          if (position.left + position.width < 0) {
            // element is off to the left of the view
            // console.log("left the screen");
          }
        });
        var pos = sunimg.getBoundingClientRect();
        sunimg.style.left = pos.left - ((0.0002) * (pos.left)) + 'px';
        slower.forEach(obj => {
          var position = obj.getBoundingClientRect();
          obj.style.left = position.left - 0.3 + 'px';
        });

        slowest.forEach(obj => {
          var position = obj.getBoundingClientRect();
          obj.style.left = position.left - 0.25 + 'px';
        });
      }
    };

    setInterval(updatePosition, 10);

    // manipulate the speed and direction of the plane
    var plane = document.getElementById("plane");
    var planeImage = document.getElementById("planeImage");
    var middlesection = $(".homeScreen").innerWidth() * 0.3;
    var planeBottom = 0;
    var planeLeft = -20;
    var planeUp = false;
    var angle = -21;
    var runway = document.getElementById("runway");
    var runwayBottom = 0;
    var runwayLeft = 0;

    // making the plane slide 
    var slideIn = setInterval(() => {
      if (started) {
        planeBottom = planeBottom + 0.1;
        planeLeft = planeLeft + 0.1;
        plane.style.left = planeLeft + '%';
        plane.style.bottom = planeBottom + "%";
        if (plane.getBoundingClientRect().left >= 0) {
          clearInterval(slideIn);
          planeUp = true;
          playSound();
        }
      }
    }, 10);

    // making the plane take off and changing the heading angle
    var takeOff = setInterval(() => {
      if (planeUp && soundPlaying) {
        if (plane.getBoundingClientRect().left <= middlesection) {
          angle = angle + 0.03;
          planeLeft = planeLeft + 0.07;
          planeBottom = planeBottom + 0.05;
          runwayBottom -= 0.15;
          runwayLeft = runwayLeft - 0.05;
          plane.style.left = planeLeft + '%';
          plane.style.bottom = planeBottom + "%";
          planeImage.style.transform = "rotate(" + angle + "deg)";
          runway.style.bottom = runwayBottom + "%";
          runway.style.left = runwayLeft + "%";
        } else {
          clearInterval(takeOff);
        }
      }
    }, 10);

    var goDown = setInterval(() => {
      if (soundPlaying && sound.currentTime > 153.0) { //150.0
        angle = angle + 5;
        planeBottom = planeBottom - 0.05;
        plane.style.bottom = planeBottom + "%";
        planeImage.style.transform = "rotate(" + angle + "deg)";
      } else if (sound.currentTime > 175) {
        $(".homeScreen").fadeOut(2000);
        $(".blackScreen").fadeIn(3000);

      }
    }, 10);
    // 105 and 126

    var goingUp = true;
    var firstTime = true;
    var changeVal = 0.3;
    var planePos = 0;
    var turbulence = setInterval(() => {
      let x = sound.currentTime;
      if ((x > 55 && x < 57) || (x > 80 && x < 85) || (x > 106 && x < 108) || (x > 108 && x < 110) || (x > 120 && x < 121.5) || (x > 122 && x < 123.5) || (x > 130 && x < 131.5) || (x > 130 && x < 131.5) || (x > 130 && x < 131.5) || (x > 135.5 && x < 136) || (x > 136 && x < 137.5) || (x > 138 && x < 139.5) || (x > 150.5 && x < 152)) {
        plane.classList.add("shake");
      } else {
        plane.classList.remove("shake");
      }
      //105 126
      if ((x > 49 && x < 55) || (x > 57 && x < 67) || (x > 85 && x < 105) || (x > 110 && x < 120) || (x > 124 && x < 130) || (x > 132 && x < 135) || (x > 140 && x < 150)) {
        // 126
        if (x > 90) {
          changeVal = 0.7;
        }
        if (x > 126) {
          changeVal = 2;
        }
        // getting the plane position in the air
        if (firstTime) {
          planePos = plane.getBoundingClientRect().top;
          firstTime = false;
        }
        let curpos = plane.getBoundingClientRect().top;
        if (goingUp) {
          curpos -= changeVal;
          plane.style.top = curpos + 'px';
        } else {
          curpos += changeVal;
          plane.style.top = curpos + 'px';

        }
        if (curpos > planePos + 5) {
          goingUp = true;
        } else if (curpos < planePos - 5) {
          goingUp = false;
        }
      }
      if (sound.currentTime > 150) {
        clearInterval(turbulence);
      }
    }, 25);


  });

});
