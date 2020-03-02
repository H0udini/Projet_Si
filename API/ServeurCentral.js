const express = require('express');
const body = require('body-parser');
const cors = require('cors');

let mariaDB = "obiwan2.univ-brest.fr:8116/";
let mongo = "obiwan2.univ-brest.fr:8216/";
let neo4j = "obiwan2.univ-brest.fr:8236/";

let port = 8016;

let app = express();

app.use(body());
app.use(cors());

app.get('/:nom/:code', async(req, res) => {
    const nom = req.param.nom;
    const code = req.param.code;
    fetch(mongo + nom + "/" + code)
    .then(function(response) {
        res.json(mariaDB + response.id_train);
    })
});

app.listen(port, () => {
    console.log("Serveur central ON");
});
