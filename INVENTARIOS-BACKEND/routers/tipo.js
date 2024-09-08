const { Router } = require('express');
const Generos = require('../models/Tipo');
const { validationResult, check } = require('express-validator');
const Tipo = require('../models/Tipo');

const router = Router();

router.get('/', async function (req, res) {
    
    try {
        
        const tipo = await Tipo.find();
        res.send(tipo);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', [
    check('nombres', 'invalid.nombres').not().isEmpty(),
], async function (req, res) {
        
    
    try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ mensaje: errors.array() });
            }

            
            let tipo = new Tipo();
            tipo.nombres = req.body.nombres;
            tipo.fechaCreacion  = new Date;
            tipo.fechaActualizacion = new Date;
            tipo.descripcion = req.body.descripcion;

            tipo = await tipo.save();
            res.send(tipo);
       
        } catch (error) {
            console.error('Error al guardar el tipo de multimedia:', error);
            res.status(500).send('Ocurrió un error al intentar guardar el tipo de multimedia');
        }
    }
);


// Actualizar un tipo existente
router.put('/:id', [
    check('nombres', 'El campo nombres es obligatorio').not().isEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }

        tipo.nombres = req.body.nombres;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date();

        await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.error('Error al actualizar el tipo:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar el tipo');
    }
});

// Eliminar un tipo
router.delete('/:id', async (req, res) => {
    try {
        const tipo = await Tipo.findByIdAndDelete(req.params.id);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }
        res.send('Tipo eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el tipo:', error);
        res.status(500).send('Ocurrió un error al intentar eliminar el tipo');
    }
});

module.exports = router;