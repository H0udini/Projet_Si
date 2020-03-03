
const mongoose = require('mongoose');
const express = require('express');
const body = require('body-parser');

let app = express();
let port = 8016;

app.use(body());

mongoose.connect('mongodb://localhost:27017/M1_TYBAG_mongo', {useNewUrlParser: true});

app.get('/id_formation:', async (req, res) => {
    const id = req.params.id; // on récupère la valeure dans l'url
    const  = await Gare.findOne({_ : });
    res.json(gare)
 
})

app.listen(port, () => {
    console.log("C'est moi le meilleur serveur");
})
