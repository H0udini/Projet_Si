const express =require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
let driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687")

let app = express();
app.use(cors());
let port = 8016;

let session = driver.session();
session
    .run(
       'MATCH (f:TYBAG_FORMATIONS {id_formation : 1}), (m1:TYBAG_MODULES(id_module:5}),(m1)-[:NECESSITE]->(m2:TYBAG_MODULES), (f)-[:NECESSITE]->(m2) RETURN m2 AS identifiant'
    )
    .subscribe({
      onKeys: keys => {
        console.log(keys);
      },
      onNext: record => {
        console.log(record.get('identifiant'))
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
