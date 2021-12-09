require("dotenv").config();
const express = require("express");

app.use(express.json());

const router = require("./app/router");
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, _ => {
    console.log("Serveur démarré sur le port", PORT);
})

