CREATE TABLE usuarios (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    matricula TEXT NOT NULL UNIQUE
);

