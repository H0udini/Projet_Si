const express =require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
let driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687")

let app = express();
app.use(cors());
let port = 8016;

let session = driver.session();
session
    .run('MATCH (pers:Person {name : "Toto"}) RETURN pers.name AS nom')
    .subscribe({
      onKeys: keys => {
        console.log(keys);
      },
      onNext: record => {
        console.log(record.get('nom'))
      },
      onCompleted: () => {
        session.close()
      },
      onError: error => {
        console.log(error)
      }
    })

app.listen(port, () =>  {
    console.log('le serveur ecoute sur le port : '+port);
})
