const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const db = require("../database");

// cadastro de usuário
router.post("/", (req, res) => {

    const { email, matricula } = req.body;

    if (!email || !matricula) {
        return res.status(400).json({
            mensagem: "Email e matrícula são obrigatórios."
        });
    }

    // p/ o identificador único do usuário
    const id = crypto.randomUUID();

    const sql = `
        INSERT INTO usuarios (id, email, matricula)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [id, email, matricula], function (err) {

        if (err) {

            return res.status(400).json({
                mensagem: "Erro aop cadastrar usuário.",
                erro: err.message
            });

        }

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            usuario: {
                id,
                email,
                matricula
            }
        });

    });

});


// listando usuários
router.get("/", (req, res) => {

    db.all("SELECT * FROM usuarios", [], (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);

    });

});


// buscar usuário por ID
router.get("/:id", (req, res) => {

    db.get(
        "SELECT * FROM usuarios WHERE id = ?",
        [req.params.id],
        (err, row) => {

            if (err)
                return res.status(500).json(err);

            if (!row)
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });

            res.json(row);

        }
    );

});


// atualizando usuário
router.put("/:id", (req, res) => {

    const { email, matricula } = req.body;

    db.run(
        `UPDATE usuarios
         SET email = ?, matricula = ?
         WHERE id = ?`,
        [email, matricula, req.params.id],
        function (err) {

            if (err)
                return res.status(500).json(err);

            if (this.changes === 0)
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });

            res.json({
                mensagem: "Usuário atualizado com sucesso."
            });

        }
    );

});


// excluindo usuário
router.delete("/:id", (req, res) => {

    db.run(
        "DELETE FROM usuarios WHERE id = ?",
        [req.params.id],
        function (err) {

            if (err)
                return res.status(500).json(err);

            if (this.changes === 0)
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });

            res.json({
                mensagem: "Usuário removido com sucesso."
            });

        }
    );

});

module.exports = router;