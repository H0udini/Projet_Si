const express =require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
let driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687")

let app = express();
app.use(cors());
let port = 8016;

let session = driver.session();
session
.beginTransaction()
  .pipe(
    flatMap(txc =>
      concat(
        txc
          .run(
             'MATCH (i:TYBAG_MODULES {id_formation : 1}) RETURN i AS identifiant'
          )
          .records()
          .pipe(map(r => r.get('name'))),
        of('First query completed'),
        txc
          .run(
            'MATCH (i1:TYBAG_FORMATIONS{id_formation: 1}) -[:NECESSITE]->(i2
          )
          .records()
          .pipe(map(r => r.get('name'))),
        of('Second query completed'),
        txc.commit(),
        of('committed')
      ).pipe(catchError(err => txc.rollback().pipe(throwError(err))))
    )
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
