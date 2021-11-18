const mongoose = require("mongoose")


const alimento = mongoose.model("alimentos", {
    qr: String,
    produto: String,
    producao: String,
    distribuidora: String,
    mercado: String
})

module.exports = alimento;