const {Router} = require('express') //desestructura solo metodo de Express que crea instancias de enrutadores
const {handleLogin, handleRegister} = require('../controllers/auth.controller')
const router = Router()




module.exports = router;
