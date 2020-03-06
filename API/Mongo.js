const mongoose = require('mongoose');
const express = require('express');
const body = require('body-parser');

let app = express();
let port = 8216;

app.use(body());

mongoose.connect('mongodb://localhost:27017/M1_TYBAG_mongo', {useNewUrlParser: true});

const schema  = mongoose.Schema({
    date : Date,
    requete : String,
    idUsr : Number
})


module.exports = mongoose.model('logs', schema);

app.post('/Projet', async(req, res) => {
    const requete = req.body.requete;
    const idUsr = req.body.idUsr;

    if (idUsr == null) {
        idUsr=(-1);
    }

    const nvLog = new log({ // création d'un objet représentant notre log
        date : Date()
        action : String
        idUsr : idUsr
    })
     
    await nvLog.save() // sauvegarde asynchrone du log
    res.json(nvLog)
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
