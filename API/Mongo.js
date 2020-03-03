
const mongoose = require('mongoose');
const express = require('express');
const body = require('body-parser');

let app = express();
let port = 8016;

app.use(body());

mongoose.connect('mongodb://localhost:27017/M1_TYBAG_mongo', {useNewUrlParser: true});

app.post('/Projet', async(req, res) => {
	const date = req.body.date; // récupération des variables du body
 
    if (!date ) { 
        res.send('Il manque un argument')
        return
    }
 
    const nouveau_projet = new Projet({ // création d'un objet représentant notre nouveau livre
        date : Date
    })
     
    await nouveau_projet.save() // sauvegarde asynchrone du nouveau livre
    res.json(nouveau_projet)
    return
})

app.get('/', async (req, res) => {
    const logs = await db.logs.find({});
    res.json(logs)
})

app.get('/:date', async (req, res) => {
    const logs = db.logs.findOne({"date" : "12:02:15"});
    res.json(logs)
})

app.listen(port, () => {
    console.log("C'est moi le meilleur serveur");
})
