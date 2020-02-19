const mysql = require('mysql');
const express = require('express');
const body = require('body-parser');

var cors = require('cors');

let connection = mysql.createConnection({
        host     : 'obiwan2.univ-brest.fr',
        user     : 'zprigengu',
        password : 'xcp7x4tm',
        database : 'zfm1-zprigengu'
});

let app = express();
let port = 8016;


app.use(body());
app.use(cors());

app.get('/:nom', async (req, res) => {
    const nom = req.params.nom;
    connection.connect();
    connection.query('SELECT idFormation FROM t_formation where nom_formation = '+nom , function (error, results, fields) {
        if (error) throw error;   
        res.json(results);   
    })
    connection.end();
})

app.listen(port, () => {
    console.log("Serveur MariaDB On");
})
