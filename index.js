const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const alimento = require("./models/alimento")

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/AlimentosIOT")

app.listen(3333, () => console.log("Server running!"))

app.get("/", async (_, res) => {
    const lista = await alimento.find();
    res.send(lista);
})

app.put("/one", async (req, res) => {
    const { produto } = req.body;
    try {
        let info = await alimento.findOne({ produto })
        // res.sendStatus(200)
        return res.json([info])
    } catch (e) {
        res.sendStatus(500)
    }

})

app.post("/", async (req, res) => {
    const { produto, producao, distribuidora, mercado } = req.body;
    try {
        const user = new alimento({ produto, producao, distribuidora, mercado });
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

app.delete("/", async (req, res) => {
    const { produto } = req.body;
    try {
        await alimento.findOneAndRemove({ produto });
        res.send(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})