const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();


router.get('/', async function (req, res) {
    
    try {
        
        const director = await Director.find();
        res.send(director);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

// Crear director

router.post('/', [
    check('nombres', 'invalid.nombres').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {
        
    
    try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ mensaje: errors.array() });
            }

            
            let director = new Director();
            director.nombres = req.body.nombres;
            director.estado = req.body.estado;
            director.fechaCreacion  = new Date;
            director.fechaActualizacion = new Date;

            director = await director.save();
            res.send(director);
       
        } catch (error) {
            console.error('Error al guardar el director:', error);
            res.status(500).send('Ocurrió un error al intentar guardar el director');
        }
    }

);

// Actualizar director

router.put('/:id', [
    check('nombres', 'El campo nombres es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).send('Director no encontrado');
        }

        director.nombres = req.body.nombres;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date();

        await director.save();
        res.send(director);
    } catch (error) {
        console.error('Error al actualizar el director:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar el director');
    }
});

// Eliminar director

router.delete('/:id', async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) {
            return res.status(404).send('Director no encontrado');
        }
        res.send('Director eliminado');
    } catch (error) {
        console.error('Error al eliminar el director:', error);
        res.status(500).send('Ocurrió un error al intentar eliminar el director');
    }
});


module.exports = router;




