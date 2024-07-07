const email = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Formularz kontaktowy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            width: 50%;
            border: 2px solid rgb(255, 81, 0);
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .container h2 {
            text-align: center;
            color: rgb(255, 81, 0);
        }
        .container p {
            margin: 10px 0;
            text-align: left;
        }
        .container p span {
            font-weight: bold;
            color: rgb(255, 81, 0);
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Dane z Formularza</h2>
        <p><span>Imię:</span> ${data.imie}</p>
        <p><span>Nazwisko:</span> ${data.nazwisko}</p>
        <p><span>E-mail:</span> ${data.email}</p>
        <p><span>Telefon:</span> ${data.phone}</p>
        <p><span>Czas:</span> ${data.czas}</p>
        <p><span>Doświadczenie:</span> ${data.doswiadczenie}</p>
        <p><span>Preferencje treningowe:</span> ${
          data.preferencje_treningu1 ? data.preferencje_treningu1 + " " : ""
        } ${
  data.preferencje_treningu2 ? data.preferencje_treningu2 + " " : ""
} ${data.preferencje_treningu3 ? data.preferencje_treningu3 : ""}</p>
    </div>
</body>
</html>`;

module.exports = email;
