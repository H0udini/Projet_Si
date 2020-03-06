const mongoose = require('mongoose');
const express = require('express');
const body = require('body-parser');
const logs = require('./logs.js');

let app = express();
let port = 8216;

app.use(body());

mongoose.connect('mongodb://obiwan2.univ-brest.fr:27017/TYBAG_MONGO', {useNewUrlParser: true});



app.post('/Logs', async(req, res) => {
    console.log("copuouc")
    var action1 = req.body.action;
    console.log(req.body.action);
    if(!action1) {
        res.send('il manque un arguement')
        return
    }

    const nvLog = new logs({ // création d'un objet représentant notre log
        date : Date(),
        action : action1
    })
     
    await nvLog.save() // sauvegarde asynchrone du log
    res.json(nvLog)
    return
})


/*app.get('/', async (req, res) => {
    const logs = await db.logs.find({});
    res.json(logs)
})

app.get('/:date', async (req, res) => {
    const logs = db.logs.findOne({"date" : "12:02:15"});
    res.json(logs)
})*/

app.listen(port, () => {
    console.log("C'est moi le meilleur serveur");
})