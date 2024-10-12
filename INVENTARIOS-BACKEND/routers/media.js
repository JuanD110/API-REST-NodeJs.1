const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

// Obtener todas las producciones
router.get('/', async function (req, res) {
    
    try {
        
        const media = await Media.find();
        res.send(media);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).send('Media not found');
        }
        res.send(media);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


router.post('/', [
    check('serial', 'El campo serial es obligatorio y debe ser único').not().isEmpty(),
    check('titulo', 'El campo titulo es obligatorio').not().isEmpty(),
    check('url', 'El campo url es obligatorio y debe ser único').not().isEmpty(),
    check('imagenPortada', 'El campo imagenPortada es obligatorio').not().isEmpty(),
    check('añoEstreno', 'El campo añoEstreno es obligatorio y debe ser un número').isNumeric(),
    check('generoPrincipal', 'El campo generoPrincipal es obligatorio y debe ser un ID válido').isMongoId(),
    check('directorPrincipal', 'El campo directorPrincipal es obligatorio y debe ser un ID válido').isMongoId(),
    check('productora', 'El campo productora es obligatorio y debe ser un ID válido').isMongoId(),
    check('tipo', 'El campo tipo es obligatorio y debe ser un ID válido').isMongoId()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Errores de validación: ", errors.array()); // Agregar más detalles de los errores
            return res.status(400).json({ errores: errors.array() });
        }

        // Log para verificar los datos que llegan
        console.log("Datos recibidos: ", req.body);

        let media = new Media({
            serial: req.body.serial,
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            url: req.body.url,
            imagenPortada: req.body.imagenPortada,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date(),
            añoEstreno: req.body.añoEstreno,
            generoPrincipal: req.body.generoPrincipal,
            directorPrincipal: req.body.directorPrincipal,
            productora: req.body.productora,
            tipo: req.body.tipo
        });

        media = await media.save();
        res.status(201).json(media);
    } catch (error) {
        console.error('Error al guardar la media: ', error);  // Log del error
        res.status(500).send('Ocurrió un error al intentar guardar la media');
    }
});

// Actualizar producción existente
router.put('/:id', [
    check('serial', 'El campo serial es obligatorio').not().isEmpty(),
    check('titulo', 'El campo titulo es obligatorio').not().isEmpty(),
    check('url', 'El campo url es obligatorio').not().isEmpty(),
    check('imagenPortada', 'El campo imagenPortada es obligatorio').not().isEmpty(),
    check('añoEstreno', 'El campo añoEstreno es obligatorio y debe ser un número').isNumeric(),
    check('generoPrincipal', 'El campo generoPrincipal es obligatorio y debe ser un ID válido').isMongoId(),
    check('directorPrincipal', 'El campo directorPrincipal es obligatorio y debe ser un ID válido').isMongoId(),
    check('productora', 'El campo productora es obligatorio y debe ser un ID válido').isMongoId(),
    check('tipo', 'El campo tipo es obligatorio y debe ser un ID válido').isMongoId()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).send('Película no encontrada');
        }

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagenPortada = req.body.imagenPortada;
        media.fechaActualizacion = new Date();
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        await media.save();
        res.json(media);
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar la película');
    }
});

// Eliminar producción
router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) {
            return res.status(404).send('Película no encontrada');
        }
        res.send('Película eliminada con éxito');
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).send('Ocurrió un error al intentar eliminar la película');
    }
});

module.exports = router;
