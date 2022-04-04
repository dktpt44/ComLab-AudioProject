
$(document).ready(() => {
  // hide the loading screen and show the home page
  setTimeout(() => {
    $(".loadingScreen").fadeOut();
    $(".homeScreen").fadeIn("slow", () => {
      //when first screen is displayed

      //preparing the slide show
      var thisSlide = 0;
      var prevSlide = 0;
      var splide = new Splide(".splide", {
        direction: "ltr",
        height: "100vh",
        arrows: true,
        speed: 1500,
      });
      // event listener when its moving
      splide.on("move", () => {
        thisSlide = splide.index;
        console.log(thisSlide);

      });
      // activate the splide
      splide.mount();

    });
  }, 4000);




  // any code write here:





});
