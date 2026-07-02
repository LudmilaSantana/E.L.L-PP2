CREATE TABLE Objetos (
    id_objetos INT PRIMARY KEY,
    mesas INT NOT NULL,
    cadeiras INT NOT NULL,
    pc INT NOT NULL,
    ar_condicionado INT NOT NULL,
    projetor INT NOT NULL,
    quadros INT NOT NULL,
    apagador INT NOT NULL
);

INSERT INTO Objetos (id_objetos, mesas, cadeiras, pc, ar_condicionado, projetor, quadros, apagador) VALUES (1, 20, 40, 10, 2, 1, 2, 2), (2, 15, 30, 8, 1, 1, 1, 1);

SELECT * FROM Objetos;

UPDATE Objetos SET mesas = 25, cadeiras = 45 WHERE id_objetos = 1;

DELETE FROM Objetos WHERE id_objetos = 1;


CREATE TABLE Espacos (
    id_espaco INT PRIMARY KEY,
    nome VARCHAR(15) NOT NULL UNIQUE,
    id_objetos INT NOT NULL,
    FOREIGN KEY (id_objetos) REFERENCES Objetos(id_objetos)
);

INSERT INTO Espacos (id_espaco, nome, id_objetos) VALUES (1, 'Laboratorio', 1), (2, 'Sala Aula', 2);

SELECT * FROM Espacos;

UPDATE Espacos SET nome = 'Lab 2' WHERE id_espaco = 2;

DELETE FROM Espacos WHERE id_espaco = 1;


CREATE TABLE Agenda (
    id_agenda INT PRIMARY KEY,
    id_espaco INT NOT NULL,
    data_hora DATETIME NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_espaco) REFERENCES Espacos(id_espaco)
);

INSERT INTO Agenda (id_agenda, id_espaco, data_hora, id_usuario) VALUES (1, 1, '2026-07-02 08:00:00', 101),(2, 2, '2026-07-03 14:00:00', 102);

SELECT * FROM Agenda;

UPDATE Agenda SET data_hora = '2026-07-03 15:30:00' WHERE id_agenda = 1;

DELETE FROM Agenda WHERE id_agenda = 1;