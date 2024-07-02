// formularz.js

document.addEventListener("DOMContentLoaded", (event) => {
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
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    console.log("Form data:", data);

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error submitting form: ${error.message}`);
      });
  });
});
