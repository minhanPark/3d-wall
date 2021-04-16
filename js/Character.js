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
        console.log("qq");
      }

      self.isScroll = setTimeout(function () {
        self.isScroll = false;
        self.mainElem.classList.remove("running");
      }, 500);
    });
  },
};
