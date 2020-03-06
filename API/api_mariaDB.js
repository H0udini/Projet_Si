const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
var http = require('http');
var fs = require('fs');


let app = express();
let port = 8246;
const path = "/var/www/html/master/m1obiwan_039/projet/pdf/";
app.use(cors());

var server = http.createServer((req, res)=> {
	fs.readFile('index.html',(err, content)=>{
    	res.writeHead(200, {"Content-Type": "text/html;charset=utf-8 "});
  		res.write(content);
    	res.end();
    });
});

function connecter() {
    var connection = mysql.createConnection({
        host: 'obiwan2.univ-brest.fr',
        user: 'zmarquimo',
        password: 'jqic18ks',
        database: 'zfm1-zmarquimo'
    });
    return connection;
}



app.get('/compte', function(req, res) {
    var connection = connecter();
    connection.connect();
      connection.query('SELECT * FROM t_compte_cpt' , function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.send('{[{"val":'+JSON.stringify(results)+' }]}' );
        });
      connection.end();
  });


app.get('/compte/:id', (req, res) => {
    var connection = connecter();
    connection.connect();
    var id = req.params.id;
    var requete = 'SELECT * FROM t_compte_cpt WHERE cpt_id = ' + id;
    console.log(requete);
    connection.query(requete,function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(JSON.stringify(results));
        
    })
    connection.end();
    
    
});


app.get('/modulePDF', function(req, res) {
    var connection = connecter();
    connection.connect();
      connection.query('SELECT * FROM t_modulePDF_mdl' , function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.send(JSON.stringify(results));
        });
      connection.end();
});

//Convention de nomage pdf : /projet/pdf/[mld_pdf].pdf
app.get('/modulePDF/:id', function(req, res) {
    var connection = connecter();
    connection.connect();
    var id = req.params.id;
    var requete =  'SELECT mdl_pdf AS PDF from t_modulePDF_mdl WHERE mdl_id = ' + id;
    var chemin = "";
        connection.query(requete , function (error, results, fields) {
            if (error) throw error;
            chemin = path + results[0].PDF + ".pdf"
            res.send({chemin : chemin});            
        });
      connection.end();
});



app.listen(port, () => console.log('MariaDB api port ' + port));






