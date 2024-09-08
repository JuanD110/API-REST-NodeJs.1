const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para Media
const mediaSchema = new Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    imagenPortada: {
        type: String, // Puedes usar URL o un path de archivo
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
    añoEstreno: {
        type: Number,
        required: true
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero', // Referencia al modelo de Género
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director', // Referencia al modelo de Director
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora', // Referencia al modelo de Productora
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo', // Referencia al modelo de Tipo
        required: true
    }
});

// Crear el modelo para Media
const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;


