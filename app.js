/*const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/users");

app.use("/usuarios", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Sevidor redando na porta ${PORT}`);

});*/

const express = require("express");

console.log("App iniciou");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/users");

app.use("/usuarios", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
