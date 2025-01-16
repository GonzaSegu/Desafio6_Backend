require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { getDate, registrarUsuario, verificarCredenciales, getUsuarios, getUsuario, exists } = require('./consultas')

const PORT = process.env.PORT || 3011
const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running en http://localhost:${PORT}`)
})

app.get('/date', async (req, res) => {
    try {
        const date = await getDate()
        res.send(date)
    } catch (error) {
        console.error('Error en /date:', error)
        res.status(500).send({ error: 'No se pudo obtener la fecha' })
    }
})

app.post("/usuarios", async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body
        await exists(email)
        await registrarUsuario(email, password, rol, lenguage)
        res.status(201).send({ message: "Usuario creado con éxito" })
    } catch (error) {
        console.error('Error en /usuarios:', error)
        res.status(500).send({ error: 'No se pudo registrar el usuario' })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.send( {token} )
    } catch (error) {
        console.error('Error en /login:', error)
        res.status(error.code || 500).send({ error: error.message || 'Error al iniciar sesión' })
    }
})

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await getUsuarios()
        res.send(usuarios)
    } catch (error) {
        console.error('Error en /usuarios:', error)
        res.status(500).send({ error: 'No se pudo obtener la lista de usuarios' })
    }
})

app.get("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params
        const authorization = req.header('Authorization')
        if (!authorization) {
            throw { code: 401, message: "Falta el token de autorización" };
        }
        const token = authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET)
        const usuario = await getUsuario(id);  // Obtener el usuario
        res.send({ email: usuario.email });  // Enviar el email
    } catch (error) {
        console.error('Error en /usuarios/:id:', error)
        res.status(error.code || 500).send({ error: error.message || 'No se pudo obtener el usuario' })
    }
})
