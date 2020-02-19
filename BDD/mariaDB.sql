/*---------------Création Base de données---------------*/

delete * from T_COMPTE_FORMATION;
delete * from T_COMPTE_MODULE;
delete * from T_MODULE;
delete * from T_FORMATION;
delete * from T_COMPTE;
delete * from T_NIVEAUX_APPRENTISSAGE;
delete * from T_COMPTE_TYPE;


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
  formation_id integer NOT NULL,
  formation_nom varchar(64) NOT NULL,
  formation_description varchar(128)
) CHARACTER SET utf8 ;

create table T_MODULE (
	mod_id integer NOT NULL,
	mod_nom varchar(64) NOT NULL,
	mod_description varchar(64),
	mod_id_referent varchar(64) NOT NULL
) CHARACTER SET utf8;

create table T_COMPTE_MODULE (
	cpt_id integer NOT NULL,
	mod_id integer NOT NULL,
	niv_apprentissage_id integer NOT NULL
) CHARACTER SET utf8 ;

create table T_NIVEAUX_APPRENTISSAGE (
	niv_apprentissage_id integer NOT NULL,
	niv_apprentissage_niveaux varchar(64) NOT NULL
) CHARACTER SET utf8 ;

create table T_COMPTE_FORMATION (
	cpt_form_id integer NOT NULL,
	cpt_id integer NOT NULL,
	formation_id integer NOT NULL
) CHARACTER set utf8 ;

ALTER TABLE T_COMPTE ADD PRIMARY KEY (cpt_id) ;
ALTER TABLE T_COMPTE MODIFY COLUMN cpt_id INT auto_increment;

ALTER TABLE T_FORMATION ADD PRIMARY	KEY	(formation_id);
ALTER TABLE T_FORMATION MODIFY COLUMN formation_id INT auto_increment;

ALTER TABLE T_COMPTE_TYPE ADD PRIMARY KEY (cptType_id);
ALTER TABLE T_COMPTE_TYPE MODIFY COLUMN cptType_id INT auto_increment;

ALTER TABLE T_MODULE ADD PRIMARY KEY (mod_id);
ALTER TABLE T_MODULE MODIFY COLUMN mod_id INT auto_increment;

ALTER TABLE T_NIVEAUX_APPRENTISSAGE ADD PRIMARY KEY (niv_apprentissage_id);
ALTER TABLE T_NIVEAUX_APPRENTISSAGE MODIFY COLUMN niv_apprentissage_id INT auto_increment;

ALTER TABLE T_COMPTE ADD FOREIGN KEY (cptType_id) REFERENCES T_COMPTE_TYPE(cptType_id);

ALTER TABLE T_COMPTE_MODULE ADD FOREIGN KEY (cpt_id) REFERENCES T_COMPTE(cpt_id);
ALTER TABLE T_COMPTE_MODULE ADD FOREIGN KEY (mod_id) REFERENCES T_MODULE(mod_id);
ALTER TABLE	T_COMPTE_MODULE ADD FOREIGN KEY (niv_apprentissage_id) REFERENCES T_NIVEAUX_APPRENTISSAGE(niv_apprentissage_id);
ALTER TABLE T_COMPTE_MODULE ADD CONSTRAINT CPT_MOD_UNIQUE UNIQUE (cpt_id,mod_id);

ALTER TABLE T_COMPTE_FORMATION ADD FOREIGN KEY (cpt_id) REFERENCES T_COMPTE(cpt_id);
ALTER TABLE T_COMPTE_FORMATION ADD FOREIGN KEY (formation_id) REFERENCES T_FORMATION(formation_id);
ALTER TABLE T_COMPTE_FORMATION ADD CONSTRAINT CPT_FORM_UNIQUE UNIQUE (cpt_id,formation_id);



/*---------------Jeux de données---------------*/

INSERT INTO T_FORMATION 
