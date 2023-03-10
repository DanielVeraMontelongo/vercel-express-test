const {Router} = require("express");
const router = Router();
const librosCtrl = require('../controllers/libros.controller')

router.get('/', (req,res)=>{
    res.send("API DESPLEGADA")
});
router.get('/libros', librosCtrl.getLibro);
router.post('/libros', librosCtrl.postLibro);
router.put('/libros', librosCtrl.putLibro);
router.delete('/libros', librosCtrl.deleteLibro);

module.exports = router;