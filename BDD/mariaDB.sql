/*---------------Création Base de données---------------*/

drop table IF EXISTS T_COMPTE_FORMATION;
drop table IF EXISTS T_COMPTE_MODULE;
drop table IF EXISTS T_MODULE;
drop table IF EXISTS T_FORMATION;
drop table IF EXISTS T_COMPTE;
drop table IF EXISTS T_NIVEAUX_APPRENTISSAGE;
drop table IF EXISTS T_COMPTE_TYPE;

create table T_COMPTE (
  cpt_id integer NOT NULL ,
  cpt_prenom varchar(128) NOT NULL,
  cpt_nom varchar(128) NOT NULL,
  cpt_pseudo varchar(128) NOT NULL,
  cpt_password varchar(256) NOT NULL,
  cptType_id integer NOT NULL
) CHARACTER SET utf8 ;

create table T_COMPTE_TYPE (
	cptType_id integer NOT NULL,
	cptType_nom varchar(128) NOT NULL
) CHARACTER SET utf8 ;


create table T_FORMATION (
  id_formation integer NOT NULL,
  nom_formation varchar(64) NOT NULL,
  description_formation varchar(1024)
) CHARACTER SET utf8 ;

create table T_MODULE (
	id_module integer NOT NULL,
	nom_module varchar(64) NOT NULL,
	description_module varchar(1024),
	mod_id_referent integer
) CHARACTER SET utf8;

create table T_COMPTE_MODULE (
	cpt_id integer NOT NULL,
	id_module integer NOT NULL,
	niv_apprentissage_id integer NOT NULL
) CHARACTER SET utf8 ;

create table T_NIVEAUX_APPRENTISSAGE (
	niv_apprentissage_id integer NOT NULL,
	niv_apprentissage_niveaux varchar(64) NOT NULL
) CHARACTER SET utf8 ;

create table T_COMPTE_FORMATION (
	cpt_form_id integer NOT NULL,
	cpt_id integer NOT NULL,
	id_formation integer NOT NULL
) CHARACTER set utf8 ;

ALTER TABLE T_COMPTE ADD PRIMARY KEY (cpt_id) ;
ALTER TABLE T_COMPTE MODIFY COLUMN cpt_id INT auto_increment;

ALTER TABLE T_FORMATION ADD PRIMARY	KEY	(id_formation);
ALTER TABLE T_FORMATION MODIFY COLUMN id_formation INT auto_increment;

ALTER TABLE T_COMPTE_TYPE ADD PRIMARY KEY (cptType_id);
ALTER TABLE T_COMPTE_TYPE MODIFY COLUMN cptType_id INT auto_increment;

ALTER TABLE T_MODULE ADD PRIMARY KEY (id_module);
ALTER TABLE T_MODULE MODIFY COLUMN id_module INT auto_increment;

ALTER TABLE T_NIVEAUX_APPRENTISSAGE ADD PRIMARY KEY (niv_apprentissage_id);
ALTER TABLE T_NIVEAUX_APPRENTISSAGE MODIFY COLUMN niv_apprentissage_id INT auto_increment;

ALTER TABLE T_COMPTE ADD FOREIGN KEY (cptType_id) REFERENCES T_COMPTE_TYPE(cptType_id);

ALTER TABLE T_MODULE ADD FOREIGN KEY (mod_id_referent) REFERENCES T_COMPTE(cpt_id);

ALTER TABLE T_COMPTE_MODULE ADD FOREIGN KEY (cpt_id) REFERENCES T_COMPTE(cpt_id);
ALTER TABLE T_COMPTE_MODULE ADD FOREIGN KEY (id_module) REFERENCES T_MODULE(id_module);
ALTER TABLE	T_COMPTE_MODULE ADD FOREIGN KEY (niv_apprentissage_id) REFERENCES T_NIVEAUX_APPRENTISSAGE(niv_apprentissage_id);
ALTER TABLE T_COMPTE_MODULE ADD CONSTRAINT CPT_MOD_UNIQUE UNIQUE (cpt_id,id_module);

ALTER TABLE T_COMPTE_FORMATION ADD FOREIGN KEY (cpt_id) REFERENCES T_COMPTE(cpt_id);
ALTER TABLE T_COMPTE_FORMATION ADD FOREIGN KEY (id_formation) REFERENCES T_FORMATION(id_formation);
ALTER TABLE T_COMPTE_FORMATION ADD CONSTRAINT CPT_FORM_UNIQUE UNIQUE (cpt_id,id_formation);



/*---------------Jeux de données---------------*/

INSERT INTO T_FORMATION(nom_formation,description_formation) VALUES ("Système d'information","La sécurité des systèmes d'information (SSI) recouvre l'ensemble des moyens techniques, organisationnels et humains qui doivent être mis en place dans le but de garantir, au juste niveau requis, la sécurité des informations d'un organisme et des systèmes qui en assurent l'élaboration, le traitement, la transmission ou le stockage.");

INSERT INTO T_COMPTE_TYPE(cptType_nom) VALUES("Formateurs"),("Apprenants");

INSERT INTO T_COMPTE(cpt_prenom, cpt_nom, cpt_pseudo, cpt_password, cptType_id) VALUES ("WOOD","Kevin","kevinWood", "kevinWood123", 2),
																					   ("VALLEE","Sydney","SydenyVallee", "SydenyVallee123", 1),
																					   ("LAPRESSE","Campbell","CampbellLapresse","CampbellLapresse123",2);

INSERT INTO T_MODULE(nom_module, description_module, mod_id_referent) VALUES ("Neo4J","Neo4j est un système de gestion de base de données au code source libre basée sur les graphes, développé en Java3,4 par la société suédo-américaine Neo technology. Le produit existe depuis 2000, la version 1.0 est sortie en février 20105.", 1),
																	   ("MariaDB","MariaDB est un système de gestion de base de données édité sous licence GPL. Il s'agit d'un fork communautaire de MySQL : la gouvernance du projet est assurée par la fondation MariaDB14, et sa maintenance par la société Monty Program AB, créateur du projet15. Cette gouvernance confère au logiciel l’assurance de rester libre.", 3),
																	   ("MongoDB","MongoDB (de l'anglais humongous qui peut être traduit par « énorme ») est un système de gestion de base de données orienté documents, répartissable sur un nombre quelconque d'ordinateurs et ne nécessitant pas de schéma prédéfini des données. Il est écrit en C++. Le serveur et les outils sont distribués sous licence SSPL, les pilotes sous licence Apache et la documentation sous licence Creative Commons4. Il fait partie de la mouvance NoSQL.", null),
																	   ("NodeJS","Node.js est une plateforme logicielle libre en JavaScript orientée vers les applications réseau événementielles hautement concurrentes qui doivent pouvoir monter en charge.", null),
																	   ("React","React (aussi appelé React.js ou ReactJS) est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page (ou portion) HTML à chaque changement d'état.", null),
																	   ("SQL","Nous avons vu beaucoup de théorie dans les chapitres précédents. Il est temps de passer à un peu plus de pratique : nous allons aborder les bases du langage SQL. Pour faire simple, ce langage permet de gérer des bases de données. ", null),
																	   ("JavaScript","JavaScript est un langage de programmation qui permet d’implémenter des mécanismes complexes sur une page web. À chaque fois qu’une page web fait plus que simplement afficher du contenu statique — afficher du contenu mis à jour à des temps déterminés, des cartes interactives, des animations 2D/3D, des menus vidéo défilants, etc... — JavaScript a de bonnes chances d’être impliqué. C’est la troisième couche des technologies standards du web, les deux premières (HTML et CSS) étant couvertes bien plus en détail dans d’autres tutoriels sur MDN.", null),
																	   ("HTML","HTML5 (HyperText Markup Language 5) est la dernière révision majeure du HTML (format de données conçu pour représenter les pages web). Cette version a été finalisée le 28 octobre 2014. HTML5 spécifie deux syntaxes d'un modèle abstrait défini en termes de DOM : HTML5 et XHTML5. Le langage comprend également une couche application avec de nombreuses API, ainsi qu'un algorithme afin de pouvoir traiter les documents à la syntaxe non conforme. Le travail a été repris par le W3C en mars 2007 après avoir été lancé par le WHATWG. Les deux organisations travaillent en parallèle sur le même document afin de maintenir une version unique de la technologie. Le W3C clôt les ajouts de fonctionnalités le 22 mai 2011, annonçant une finalisation de la spécification en 20141, et encourage les développeurs Web à utiliser HTML 5 dès ce moment. Fin 2016, la version 5.1 est officiellement publiée et présente plusieurs nouveautés qui doivent faciliter le travail des développeurs d'applications Web2.", null),
																	   ("CSS","Les feuilles de style en cascade1, généralement appelées CSS de l'anglais Cascading Style Sheets, forment un langage informatique qui décrit la présentation des documents HTML et XML. Les standards définissant CSS sont publiés par le World Wide Web Consortium (W3C). Introduit au milieu des années 1990, CSS devient couramment utilisé dans la conception de sites web et bien pris en charge par les navigateurs web dans les années 2000.", null);																	   

INSERT INTO T_FORMATION(nom_formation,description_formation) VALUES ("Java Database Connectivity","JDBC est une interface de programmation créée par Sun Microsystems — depuis racheté par Oracle Corporation — pour les programmes utilisant la plateforme Java.");

INSERT INTO T_MODULE(nom_module, description_module, mod_id_referent) VALUES ("framework java.sql","un framework désigne un ensemble cohérent de composants logiciels structurels, qui sert à créer les fondations ainsi que les grandes lignes de tout ou d’une partie d'un logiciel.", null),
																	   ("Java","Java est une technique informatique développée initialement par Sun Microsystems puis acquise par Oracle suite au rachat de l'entreprise. Défini à l'origine comme un langage de programmation, Java a évolué pour devenir un ensemble cohérent d'éléments techniques et non techniques.", null),
																	   ("tomcat","Apache Tomcat est un conteneur web libre de servlets et JSP.", null);

INSERT INTO T_FORMATION(nom_formation,description_formation) VALUES ("Serveur Apache sous Linux","Le logiciel libre Apache HTTP Server est un serveur HTTP créé et maintenu au sein de la fondation Apache.");

INSERT INTO T_MODULE(nom_module, description_module, mod_id_referent) VALUES ("Bash","Bash est un interpréteur en ligne de commande de type script. C'est le shell Unix du projet GNU. Fondé sur le Bourne shell, Bash lui apporte de nombreuses améliorations, provenant notamment du Korn shell et du C shell.", null),
																	   ("Commande Linux","", null),
																	   ("Apache","", null),
																	   ("Page Web","", null);
