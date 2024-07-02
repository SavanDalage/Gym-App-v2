"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const days = document.querySelectorAll(".active-day");

  days.forEach(function (day) {
    day.addEventListener("click", function () {
      this.classList.toggle("clicked");
    });
  });
});

// array dla klawiszy oraz zbiór stron
var buttonsArray = Array.from(
  document.getElementsByClassName("navigation-button")
);
var pages = document.getElementsByClassName("page");

// klawisze
var button1 = document.querySelectorAll(".b1");
var button2 = document.querySelectorAll(".b2");

const kalnedarz = document.querySelector(".kalnedarz");

let i = 0;

button1[0].addEventListener("click", function () {
  if (i > 0) {
    i--;

    document.getElementById(`${i}`).scrollIntoView();
    return;
  }

  if (i == 0) {
    return;
  }
});

button2[0].addEventListener("click", function () {
  if ((i > -1) & (i < 11)) {
    i++;

    document.getElementById(`${i}`).scrollIntoView();
    return;
  }

  if (i == 11) {
    return;
  }
});
