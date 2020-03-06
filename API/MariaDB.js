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
let port = 8116;


app.use(body());
app.use(cors());

app.get('/Formations', async (req, res) => {
    //connection.connect();
    connection.query('SELECT id_formation, nom_formation, description_formation FROM T_FORMATION', function (error, results, fields) {
        if (error) throw error;  
        res.json(results);   
    })
    //connection.end();
})

app.get('/Modules/:id_module', async (req, res) => {
    const id_module = req.params.id_module;
    //connection.connect();
    const query='SELECT id_module, nom_module, description_module FROM T_MODULE WHERE id_module = '+id_module;
    //console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;   
        res.json(results[0]);   
    })
    //connection.end();
})

app.listen(port, () => {
    console.log("Serveur MariaDB On");
})
