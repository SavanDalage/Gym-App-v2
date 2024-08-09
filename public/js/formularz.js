// formularz.js

function sanitizeInput(input) {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = input;
  return tempDiv.innerHTML;
}

const form = document.getElementById("training-form");
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  form.reset();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    const sanitizedValue = sanitizeInput(value);

    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(sanitizedValue);
    } else {
      data[key] = sanitizedValue;
    }
  });

  console.log("Form data:", data);

  const dataJson = JSON.stringify(data);

  console.log(dataJson);

  fetch("/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: dataJson,
  })
    .then(async (response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Network response was not ok: ${response.statusText}, Message: ${errorMessage}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Formularz wysłany.");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});