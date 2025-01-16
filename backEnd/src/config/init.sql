-- Active: 1729696527596@@127.0.0.1@5434@softjobs

CREATE DATABASE softjobs;
\c softjobs;
CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );


SELECT * FROM usuarios;

INSERT INTO usuarios values
(DEFAULT, 'gonzalo@seguel.cl', 'nosé', 'menos')

DELETE FROM usuarios where id=1;