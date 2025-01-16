const express = require('express') // importar paquete express
const morgan = require ('morgan') //importa middleware
const APIRoutes = require('./routes/routes')

const app = express() // instanciar – enrutador
//middlewares
app.use(morgan('dev')) //pasame los formatos que te pase los logs en consola
app.use(express.json())  //parsear solicitudes json a objeto javascript accesible a través de req.body
 

app.use('/', APIRoutes)


module.exports = app 