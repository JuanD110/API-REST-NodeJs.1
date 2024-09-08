const { Router } = require('express');
const Generos = require('../models/Generos');
const { validationResult, check } = require('express-validator');

const router = Router();

router.get('/', async function (req, res) {
    
    try {
        
        const generos = await Generos.find();
        res.send(generos);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', [
    check('nombres', 'invalid.nombres').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {
        
    
    try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ mensaje: errors.array() });
            }

            
            let generos = new Generos();
            generos.nombres = req.body.nombres;
            generos.estado = req.body.estado;
            generos.fechaCreacion  = new Date;
            generos.fechaActualizacion = new Date;
            generos.descripcion = req.body.descripcion;

            generos = await generos.save();
            res.send(generos);
       
        } catch (error) {
            console.error('Error al guardar el genero de la pelicula:', error);
            res.status(500).send('Ocurrió un error al intentar guardar el genero de la pelicula');
        }
    }
);

// Actualizar un género existente
router.put('/:id', [
    check('nombres', 'El campo nombres es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const generos = await Generos.findById(req.params.id);
        if (!generos) {
            return res.status(404).send('Genero no encontrado');
        }

        generos.nombres = req.body.nombres;
        generos.estado = req.body.estado;
        generos.fechaActualizacion = new Date();

        await generos.save();
        res.send(generos);
    } catch (error) {
        console.error('Error al actualizar el genero:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar el genero');
    }
});


// Eliminar un género

router.delete('/:id', async (req, res) => {
    try {
        const generos = await Generos.findByIdAndDelete(req.params.id);
        if (!generos) {
            return res.status(404).send('Género no encontrado');
        }
        res.send('Género eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el género:', error);
        res.status(500).send('Ocurrió un error al intentar eliminar el género');
    }
});

module.exports = router;
