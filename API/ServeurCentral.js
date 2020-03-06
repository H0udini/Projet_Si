const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

let mariaDB = "http://obiwan2.univ-brest.fr:8116/";
let mongo = "http://obiwan2.univ-brest.fr:8216/";
let neo4j = "http://obiwan2.univ-brest.fr:8316/";

let port = 8016;

let app = express();

app.use(body());
app.use(cors());

app.get('/test', async(req, res) => {
    res.send("test");
})

app.get('/Formations', async(req, res) => {
  fetch(mariaDB + "Formations")
    .then((resultat) => resultat.json())
    .then(result => {
        res.send(result);  

        console.log(mongo + "Logs/");
        fetch(mongo + "Logs",{
            method  : "post",
            header  : {'Content-Type' : 'application/x-www-form-urlencoded'},
            body    : {action : "ListeDesFormations"}
            })
    }).catch(function(req) {
        //console.log("error Formations");
        (mongo +"Logs/") 
        //res.json('error Formations');
    });

})

app.get('/Modules/:id_module',async(req, res)=>{
	const id = req.params.id_module;
    fetch(mariaDB + "Modules/"+id)
    .then((resultat) => resultat.json())
    .then(result => {        
        res.send(result);        
    })
})



app.listen(port, () => {
    console.log("Serveur central ON");
});
