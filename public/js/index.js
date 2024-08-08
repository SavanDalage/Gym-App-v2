"use strict";

// array dla klawiszy oraz zbiór stron
var buttonsArray = Array.from(
  document.getElementsByClassName("navigation-button")
);
var pages = document.getElementsByClassName("page");

// funkcja podświetlająca klawisze
function highlight(event) {
  buttonsArray.forEach((button) => {
    button.classList.remove("highlighted");
  });
  event.target.classList.add("highlighted");
}

// dla array klawiszy listener kliknięcia. Podświetla klawisze i na podstawie klikniętego klawisza przywołuję odpowiednią stronę
buttonsArray.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    highlight(event);
    document.getElementById(`p${index + 1}`).scrollIntoView();
  });
});

// Intersection Observer callback
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      var index = Array.from(pages).indexOf(entry.target);
      buttonsArray.forEach((button) => {
        button.classList.remove("highlighted");
      });
      buttonsArray[index].classList.add("highlighted");
    }
  });
}

// Intersection Observer callback dla opacity

function handleIntersect(entries) {
  const isSmallScreen = matchMedia(
    "only screen and (max-height: 500px)"
  ).matches;

  const isNarrowScreen = matchMedia(
    "only screen and (max-width: 800px)"
  ).matches;

  entries.forEach((entry) => {
    const ratio = entry.intersectionRatio;
    let opacity;
    if (isSmallScreen) {
      opacity = ratio > 0.1 ? 1 : ratio * 10; // Pełna opacity gdy conajmniej 10% jest widoczne
    } else if (isNarrowScreen) {
      opacity = ratio > 0.05 ? 1 : ratio * 10; // Likwiduje poroblem z opacity na telefonach, gdzie druga strona będzie wąska, ale wysoka
    } else {
      opacity = Math.min(ratio * 2, 1); // Kalkuluje opacity na podstawie intersection ratio
    }
    entry.target.style.opacity = opacity;
  });
}

// Funkcja tworząca Intersection Observer
function createObservers() {
  let threshold;
  if (matchMedia("only screen and (max-height: 500px)").matches) {
    threshold = 0.1; // Trigger kiedy 10% jest widoczne
  } else if (matchMedia("only screen and (max-width: 800px)").matches) {
    threshold = 0.05; // Trigger kiedy 5% jest widoczne; dla wąskich ekranów
  } else {
    threshold = 0.5; // Trigger kiedy 50% jest widoczne
  }

  // Create Intersection Observer dla ustalonego treshold
  const observer = new IntersectionObserver(intersectionCallback, {
    threshold: threshold,
  });

  // Create Intersection Observer dla zmiany opacity
  const observerOpacity = new IntersectionObserver(handleIntersect, {
    threshold: Array.from({ length: 101 }, (v, i) => i * 0.01), // Thresholds od 0% do 100%
  });

  // Observe for each page
  Array.from(pages).forEach((page) => {
    observer.observe(page);
    observerOpacity.observe(page);
  });
}

// Initial observer creation
createObservers();
// sprawdzanie zmiany wysokości strony
window.addEventListener("resize", createObservers);

// SPRZĘT DO ĆWICZEŃ

function newPath(path, replacement) {
  let firstPart = path.substring(0, path.length - 7);
  let lastPart = path.substring(path.length - 6, path.length);

  return firstPart + replacement + lastPart;
}

async function opisSprzętu() {
  try {
    const response = await fetch("json/eq.json");
    const textMapping = await response.json();
    // const textMapping2 = CSSJSON.toCSS(textMapping);
    const images = document.querySelectorAll(".gear-img");
    images.forEach((img) => {
      img.addEventListener("click", function () {
        document.getElementById("equipment").classList.add("equ-visible");

        document
          .getElementById("equipment-img")
          .setAttribute("src", newPath(this.src, "h"));

        const srcSubstring = this.src.substring(
          this.src.length - 7,
          this.src.length - 4
        );
        document.getElementById("eq-des").textContent =
          textMapping[srcSubstring];
        document.getElementById("eq-des-2").textContent =
          textMapping[srcSubstring + 1];
        document.getElementById("eq-des-3").textContent =
          textMapping[srcSubstring + 3];
      });
    });
  } catch (error) {
    console.error("Błąd ładowania opisu sprzętu:", error);
  }
}

opisSprzętu();