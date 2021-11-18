const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const alimento = require("./models/alimento")

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/IoTAlimentos")

app.listen(3333, () => console.log("Server running!"))

app.get("/", async (_, res) => {
    const lista = await alimento.find();
    console.log(lista)
    res.send(lista);
})

app.get("/:qr", async (req, res) => {
    const { qr } = req.params;
    try {
        let info = await alimento.findOne({ qr })
        // res.sendStatus(200)
        console.log(info)
        return res.json(info)
    } catch (e) {
        res.sendStatus(500)
    }
})

app.post("/", async (req, res) => {
    const { id, produto, producao, distribuidora, mercado } = req.body;
    try {
        const user = new alimento({ id, produto, producao, distribuidora, mercado });
        const response = await user.save();
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.put("/", async (req, res) => {
    const { produto, producao, distribuidora, mercado } = req.body;
    console.log(req.body);
    let filter = { produto }
    try {
        if (producao) {
            await alimento.updateOne(filter, { producao });
        }
        if (distribuidora) {
            await alimento.updateOne(filter, { distribuidora });
        }
        if (mercado) {
            await alimento.updateOne(filter, { mercado })
        }
        res.status(200).json("alteração concluida.")
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.delete("/:qr", async (req, res) => {
    const { qr } = req.params;
    try {
        await alimento.findOneAndRemove({ qr });
        res.send(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})
