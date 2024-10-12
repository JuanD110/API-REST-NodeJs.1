const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

router.get('/', async function (req, res) {
    
    try {
        
        const productora = await Productora.find();
        res.send(productora);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});


// Obtener productora por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Aquí estás obteniendo el ID de los parámetros de la URL
    try {
        const productora = await Productora.findById(id); // Busca la productora por ID
        if (!productora) {
            return res.status(404).send('Productora no encontrada'); // Respuesta si no se encuentra
        }
        res.json(productora); // Responde con los datos de la productora
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor'); // Manejo de errores
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

            
            let productora = new Productora();
            productora.nombres = req.body.nombres;
            productora.estado = req.body.estado;
            productora.fechaCreacion  = new Date;
            productora.fechaActualizacion = new Date;
            productora.slogan = req.body.slogan;
            productora.descripcion = req.body.descripcion;

            productora = await productora.save();
            res.send(productora);
       
        } catch (error) {
            console.error('Error al guardar la productora:', error);
            res.status(500).send('Ocurrió un error al intentar guardar la productora');
        }
    }
);


router.put('/:id', [
    check('nombres', 'El campo nombres es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio y debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).send('Productora no encontrada');
        }

        productora.nombres = req.body.nombres;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaActualizacion = new Date();

        await productora.save();
        res.send(productora);
    } catch (error) {
        console.error('Error al actualizar la productora:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar la productora');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productora = await Productora.findByIdAndDelete(req.params.id);
        if (!productora) {
            return res.status(404).send('Productora no encontrada');
        }
        res.send('Productora eliminada con éxito');
    } catch (error) {
        console.error('Error al eliminar la productora:', error);
        res.status(500).send('Ocurrió un error al intentar eliminar la productora');
    }
});

module.exports = router;
