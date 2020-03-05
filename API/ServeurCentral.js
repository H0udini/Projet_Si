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

app.get('/:id_formation', async(req, res) => {
    const id = req.param.id;
    fetch(mongo + id)
    .then(function(response) {
        res.json(mariaDB + id);
    })
});

app.listen(port, () => {
    console.log("Serveur central ON");
});
