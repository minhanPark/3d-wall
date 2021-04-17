function Character(info) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML = `
    <div class="character-face-con character-head">
        <div class="character-face character-head-face face-front"></div>
        <div class="character-face character-head-face face-back"></div>
    </div>
    <div class="character-face-con character-torso">
        <div class="character-face character-torso-face face-front"></div>
        <div class="character-face character-torso-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-right">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-left">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-right">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-left">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
    </div>
    `;
  this.mainElem.style.left = `${info.xPos}%`;
  this.isScroll = false;
  this.lastScrollTop = 0;
  this.speed = Math.random() * 0.3 + 0.2;
  this.xPos = info.xPos;
  this.direction;
  this.isRunning = false;
  this.rafId;
  document.querySelector(".stage").appendChild(this.mainElem);
  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;
    window.addEventListener("scroll", function () {
      clearTimeout(self.isScroll);

      if (!self.isScroll) {
        self.mainElem.classList.add("running");
      }

      self.isScroll = setTimeout(function () {
        self.isScroll = false;
        self.mainElem.classList.remove("running");
      }, 500);

      if (self.lastScrollTop < pageYOffset) {
        //스크롤을 내린다는 거니 앞으로 진행중이라는 뜻
        self.mainElem.setAttribute("data-direction", "forward");
      } else {
        self.mainElem.setAttribute("data-direction", "backward");
      }
      self.lastScrollTop = pageYOffset;
    });

    window.addEventListener("keydown", function (e) {
      if (self.isRunning) return;

      if (e.key === "ArrowLeft") {
        self.mainElem.setAttribute("data-direction", "left");
        self.direction = "left";
        self.mainElem.classList.add("running");
        self.run(self);
        self.isRunning = true;
      } else if (e.key === "ArrowRight") {
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.direction = "right";
        self.run(self);
        self.isRunning = true;
      }
    });

    window.addEventListener("keyup", function () {
      self.mainElem.classList.remove("running");
      cancelAnimationFrame(self.rafId);
      self.isRunning = false;
    });
  },
  run: function (self) {
    if (self.direction === "left") {
      self.xPos -= self.speed;
    } else if (self.direction === "right") {
      self.xPos += self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }

    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = `${self.xPos}%`;

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  },
};
