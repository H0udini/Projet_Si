const express = require('express');
const body = require('body-parser');

const fetch = require('node-fetch');

var mariaDB = "http://obiwan2.univ-brest.fr:8246/";
var mongo = "http://obiwan2.univ-brest.fr:8346/";
let neo = "http://obiwan2.univ-brest.fr:8446/" ;

//let neo = "http://localhost:7001/" ;
var port = 8146;
let cors = require('cors');
let app = express();

app.use(body());
app.use(cors());

// DEFINITION DES ROUTES 
/*
app.post('/verifConnexion/:id_user', async(req, res) => {

});
*/

// Recuperation de toutes les noms des formations
app.get('/consultation_formation', async(req, res) => {
    //res.send(neo.get('/formation'));
    var route=neo+"formationnom";
    let monTab=[];
    console.log(route);
    fetch(route)
    .then((resultat) => resultat.json())
    .then(result => {
        for(let val of result.nom){
            monTab.push(val.properties.nom);
          }
          res.json(monTab);
       // res.json(result.nom[0].properties.nom)
    })
});


// Recuperation des modules associés aux formations ainsi que les modules et sous module
app.get('/consultation_module', async(req,res)=>{
    var route=neo+"formationnom";
    var routeModule=neo+"module/";
    var routeSM=neo+"sousmodule/"
    function laFormation(x){
        let formation = {
            nomFormation : "", 
            module :[]
        };
        formation.nomFormation=x
        return formation
    }    
    function lesModules(i,x){
        let modules = { 
            nomModule  : "", 
            id : null,
            sousmodules : []
        }
        modules.nomModule = x.nom;
        modules.id = x.id.low;
        fetch(routeSM+x.nom)
        .then((resultat) => resultat.json())
        .then(resultTer => {
            let val = []
            if(resultTer.nom != val){
                for(let val1 of resultTer.nom){
                    lesSM(modules,val1.properties)
                } 
            }
        })
        setTimeout(function x (){mesFormations[i].module.push(modules)}, 100);
    }

    function lesSM(m,x){
        let sousmodule = {
            nomSM :"",
            idSM:null
        }
        sousmodule.nomSM=x.nom;
        sousmodule.idSM=x.id.low;
        setTimeout(function x2 (){m.sousmodules.push(sousmodule)}, 50);
        
    }

    var mesFormations=[];
    fetch(route)
    .then((resultat) => resultat.json())
    .then(result => {
        for(let val of result.nom){            
            mesFormations.push(laFormation(val.properties.nom))
        }
    })        
    .then((x) => {
        for(let i = 0; i< mesFormations.length;i++){
            fetch(routeModule+mesFormations[i].nomFormation)
            .then(resultatBis => resultatBis.json())
            .then(resultBis=>{
                for(let val of resultBis.module){
                    lesModules(i,val.properties)
                }                
            })
        }
        setTimeout(function x (){res.send({formation : mesFormations})}, 200);
    })
})

// Recuperation des modules associés aux formations ainsi que les modules et sous module
app.get('/consultation_sousModule', async(req,res)=>{
    var route=neo+"sous";
    var routeModule=neo+"sousmodule/"
    function laFormation(x){
        let formation = {nom : "", module :[]};
        formation.nom=x
        return formation
    }    
    function lesModules(i,x){
        mesFormations[i].module.push(x);
    }
    var mesFormations=[];
    fetch(route)
    .then((resultat) => resultat.json())
    .then(result => {
        for(let val of result.nom){            
            mesFormations.push(laFormation(val.properties.nom))
        }
    })        
    .then((x) => {
        for(let i = 0; i< mesFormations.length;i++){
            fetch(routeModule+mesFormations[i].nom)
            .then(resultatBis => resultatBis.json())
            .then(resultBis=>{
                for(let val of resultBis.module){
                    lesModules(i,val.properties.nom)
                }                
            })
        }
        setTimeout(function x (){res.send(mesFormations)}, 100);
    })
})



//Recuperation d'un cours
/*app.get('/RecuperationCoursModule/:idModule', async(req, res )=>{
    var routeCours=neo+"cours1/";
    var route=mariaDB+"modulePDF/"
    var id_module = req.params.idModule;
    let id= null
    fetch(routeCours+id_module)
    .then((resultat) => resultat.json())
    .then(result => {
        fetch(route+result.nom[0].low)
        .then((resultat) => resultat.json())
        .then(result => res.sendFile(result.chemin))
    })    
    
})*/

app.get('/consultation_logs/:id', async(req,res)=>{
    var suffixe = "Logs/"
    var route = mongo + suffixe + req.params.id;
    appelMango(route, req, res)
})

app.get('/RechercheUser/:id/:recherche', async(req,res)=>{
    var suffixe = "Logs/RechercheUser/"
    var route = mongo + suffixe + req.params.id + '/'+ req.params.recherche;
    appelMango(route, req, res)
});

app.get('/RecherchePage/:id/:page', async(req,res)=>{
    var suffixe = "Logs/RecherchePage/"
    var route = mongo + suffixe + req.params.id + '/'+ req.params.page;
    appelMango(route, req, res)
});

app.get('/RechercheHeure/:id/:heure', async(req,res)=>{
    var suffixe = "Logs/RechercheHeure/"
    var route = mongo + suffixe + req.params.id + '/'+ req.params.heure;
    appelMango(route, req, res)
});

async function appelMango (route, req, res) {
    await fetch(route)
    .then((resultat) => resultat.json())
    .then(result => res.json(result))
}

/*// Recuperation de toutes les noms des formations
app.get('/consultation_formation', async(req, res) => {
    //res.send(neo.get('/formation'));
    var route=neo+"formation";
    console.log(route);
    fetch(route)
    .then((resultat) => resultat.json())
    .then(result => res.json(result.nom[0].low))
});

*/


app.get('/consultation_cours/:id_cours/:id_user', async(req,res) => {

});

app.get('/consultation_allFormations/:id_user', async(req,res)=>{

});


// CONSULTATION LOGS 
app.get('/consultation_logs/:id', async(req,res)=>{
    neo.get()
    
})


app.listen(port, () => {
    console.log("Serveur centrale en écoute sur le port " + port);
});