(function () {
  const stageElem = document.querySelector(".stage");
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  const charElem = document.querySelector(".select-character");
  let maxScrollValue = 0;
  let mousePos = { x: 0, y: 0 };

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`;

    //progress bar
    barElem.style.width = `${scrollPer * 100}%`;
  });

  window.addEventListener("resize", resizeHandler);
  window.addEventListener("mousemove", function (e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
      mousePos.x * 5
    }deg)`;
  });
  resizeHandler();

  stageElem.addEventListener("click", function (e) {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
    });
  });

  charElem.addEventListener("click", function (e) {
    const value = e.target.getAttribute("data-char");
    document.querySelector("body").setAttribute("data-char", value);
  });
})();
