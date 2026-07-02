// Verificando se a sala já está reservada no horário informado


    const sqlVerifica = `

        SELECT * FROM Agenda

        WHERE id_local = ? AND data_hora = ?

    `;


    db.get(sqlVerifica, [sala, data_hora], (err, row) => {


        if (err) {

            console.error(err);

            return res.status(500).send("Erro ao verificar disponibilidade.");

        }


        // Se encontrou uma reserva


        if (row) {

            return res.status(409).send("Este horário já está reservado.");

        }


        // Inserir a nova reserva

        const sqlInserir = `

            INSERT INTO Agenda (id_local, data_hora, id_usuario)

            VALUES (?, ?, ?)

        `;


        db.run(sqlInserir, [sala, data_hora, id_usuario], function (err) {


            if (err) {

                console.error(err);

                return res.status(500).send("Erro ao registrar reserva.");

            }


            // ID gerado automaticamente 


            return res.status(201).json({

                mensagem: "Reserva realizada com sucesso!",

                idReserva: this.lastID

            });


        });


    });


});



// CANCELAR RESERVA


app.delete("/deletarReserva", (req, res) => {


    const { id_usuario, sala, data_hora } = req.body;


    // os campos foram enviados?

    if (!id_usuario || !sala || !data_hora) {

        return res.status(400).send("Campo obrigatório vazio.");

    }


    // Procurando reserva

    const sqlBusca = `

        SELECT * FROM Agenda

        WHERE id_local = ?

          AND data_hora = ?

          AND id_usuario = ?

    `;


    db.get(sqlBusca, [sala, data_hora, id_usuario], (err, row) => {


        if (err) {

            console.error(err);

            return res.status(500).send("Erro ao procurar reserva.");

        }


        // Não encontrou reserva

        if (!row) {

            return res.status(404).send("Reserva não encontrada.");

        }


        // Remover reserva

        const sqlDelete = `

            DELETE FROM Agenda

            WHERE id_local = ?

              AND data_hora = ?

              AND id_usuario = ?

        `;


        db.run(sqlDelete, [sala, data_hora, id_usuario], function (err) {


            if (err) {

                console.error(err);

                return res.status(500).send("Erro ao cancelar reserva.");

            }


            return res.status(200).json({

                mensagem: "Reserva cancelada com sucesso!"

            });


        });


    });


});