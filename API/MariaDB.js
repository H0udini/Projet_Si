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

app.get('/Formations', async (req, res) => {
    connection.connect();
    connection.query('SELECT nom_formation, description_formation FROM t_formation, function (error, results, fields) {
        if (error) throw error;   
        res.json(results);   
    })
    connection.end();
})

app.get('/:id_module', async (req, res) => {
    const id_module = req.param.id_module;
    connection.connect();
    connection.query('SELECT nom_module, description_module FROM t_module Where id_module = +id_module, function (error, results, fields) {
        if (error) throw error;   
        res.json(results);   
    })
    connection.end();
})

app.listen(port, () => {
    console.log("Serveur MariaDB On");
})
