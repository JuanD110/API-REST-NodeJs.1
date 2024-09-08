const {Schema, model} = require('mongoose')


const TipoSchema = Schema ({
    nombres: { type: String, required: true },
    fechaCreacion: { type: Date, required: true},
    fechaActualizacion: { type: Date, required: true},
    descripcion: {type: String, required: true}
})

module.exports = model('Tipo', TipoSchema);