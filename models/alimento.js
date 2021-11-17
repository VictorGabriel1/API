const mongoose = require("mongoose")


const alimento = mongoose.model("alimentos", {
    produto: String,
    producao: String,
    distribuidora: String,
    mercado: String
})

module.exports = alimento;