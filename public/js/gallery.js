"use strict";

// obrazy galerii

function newPath(path, replacement) {
  let firstPart = path.substring(0, path.length - 7);
  let lastPart = path.substring(path.length - 6, path.length);
  return firstPart + replacement + lastPart;
}

function opisSprzętu() {
  const images = document.querySelectorAll(".photo");
  images.forEach((img) => {
    img.addEventListener("click", function () {
      document.getElementById("gallery-image-box").classList.add("equ-visible");

      document
        .getElementById("gallery-image")
        .setAttribute("src", newPath(this.src, "p"));
    });
  });
}

opisSprzętu();
