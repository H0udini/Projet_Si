const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
let driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687")

let app = express();
app.use(cors());
let port = 8320;

let session = driver.session();


session
    .run(

      'MATCH (f:_FORMATIONS {id_formation : 1}), (m1:_MODULES(id_module:5}),(m1)-[:has]->(m2:_MODULES), (f)-[:has]->(m2) RETURN m2 AS identifiant'
    )
    .run(
        'MATCH (f:_FORMATIONS  {id_formation : 1})-[:has]->(m:_MODULES) return m AS je_sais_pas'
    )
    .subscribe({
      onKeys: keys => {
        console.log(keys);
      },
      onNext: record => {
        console.log(record.get('id_Form'))
      },
      onNext: record => {
        console.log(record.get('introuvable'))
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

await driver.close()