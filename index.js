console.log("Hello world from script hosted on github repo and deliverd through jsDelivr");

const API_ENDPOINT = "https://smit-ux.webflow.io/";
  
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTION",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
  };

  exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => ({
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
         },
        statusCode: 200,
        body: JSON.stringify({
            "test": "test"
          })
        //body: data.joke,
      }))
      .catch((error) => ({ statusCode: 422, body: String(error) }));
  };

console.log("JavaScript file is loaded successfully!");
gsap.registerPlugin(ScrollSmoother);
  ScrollSmoother.create({
  smooth: 1,
  effects: true,
});

// PERCENTAGE COUNTER
let counter = {
    value: 0,
  };
let percentEase =  "M0,0 C0.04,0.079 0.143,0.365 0.343,0.44 0.541,0.514 0.586,0.582 0.657,0.701 0.75,0.859 0.822,1 1,1 ";
let loaderDuration = 4;
  
// SECOND TIME LOADING
if (sessionStorage.getItem("visited") != null) {
  loaderDuration = 2;
  counter = {
    value: 40
  }
}
sessionStorage.setItem("visited", "true")

// PRELOADER ANIMATION LOGIC
  function updateLoaderText() {
    let progress = Math.round(counter.value);
    $("[preloader='percentage']").text(progress);
  }

  function endLoaderAnimation() {
    $("#preloader-trigger").click();
  }
  
  let preloaderTl = gsap.timeline({onComplete: endLoaderAnimation});
  preloaderTl.to(counter, {
    onUpdate: updateLoaderText,
    value: 100,
    duration: loaderDuration,
    ease: CustomEase.create ("custom", percentEase)
  });


// SMOOTH SCROLL LENIS
let lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 } });
    createScrollTrigger($(this), tl);
  });

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, x: "1em", duration: 0.6, ease: "power2.out", stagger: { amount: 0.2 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, yPercent: 50, duration: 0.35, ease: "power1.out", stagger: { amount: 0.5 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
    createScrollTrigger($(this), tl);
  });

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
