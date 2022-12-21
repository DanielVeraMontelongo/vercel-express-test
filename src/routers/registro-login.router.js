const {Router} = require("express");
const router = Router();
const registroLogin = require("../controllers/registro-login.controller");

router.post("/registro", registroLogin.postRegistro);
router.post("/login", registroLogin.postLogin);

module.exports = router;