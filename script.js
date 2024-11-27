let counter = {
  value: 0,
};

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $(".percentage").text(progress);
}

let preloaderTl = gsap.timeline({});
preloaderTl.to(counter, {
  onUpdate: updateLoaderText,
  value: 100,
  duration: 5,
})
