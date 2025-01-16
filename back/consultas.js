const pool = require('./db')
const bcrypt = require('bcryptjs')

const getDate = async () => {
    try {
        const response = await pool.query('SELECT NOW()')
        return response.rows[0]
    } catch (error) {
        console.error('Error en getDate:', error)
        throw error
    }
}

const registrarUsuario = async (email, password, rol, lenguage) => {
    try {
        const passwordEncriptada = bcrypt.hashSync(password)
        const values = [email, passwordEncriptada, rol, lenguage]
        const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
        await pool.query(consulta, values)
    } catch (error) {
        console.error('Error en registrarUsuario:', error)
        throw error
    }
}

const verificarCredenciales = async (email, password) => {
    try {
        const values = [email]
        const consulta = "SELECT * FROM usuarios WHERE email = $1"
        const { rows: [usuario], rowCount } = await pool.query(consulta, values)
        if (!rowCount) throw { code: 401, message: "Email o contraseña incorrecta" }
        const { password: passwordEncriptada } = usuario
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
        if (!passwordEsCorrecta) throw { code: 401, message: "Email o contraseña incorrecta" }
    } catch (error) {
        console.error('Error en verificarCredenciales:', error)
        throw error
    }
}

const getUsuarios = async () => {
    try {
        const { rows: usuarios } = await pool.query("SELECT * FROM usuarios")
        return usuarios
    } catch (error) {
        console.error('Error en getUsuarios:', error)
        throw error
    }
}

const getUsuario = async (id) => {
    try {
        const values = [id]
        const consulta = 'SELECT * FROM usuarios WHERE id = $1'
        const { rows, rowCount } = await pool.query(consulta, values)
        if (!rowCount)  throw { code: 404, message: "Usuario no encontrado" }
        return rows[0]
    } catch (error) {
        console.error('Error en getUsuario:', error)
        throw error
    }
}

const exists = async (email) => {
    try {
        const values = [email]
        const consulta = "SELECT * FROM usuarios WHERE email = $1"
        const { rowCount } = await pool.query(consulta, values)
        return rowCount ? true : false
    } catch (error) {
        console.error('Error en exists:', error)
        throw error
    }
}

module.exports = { getDate, registrarUsuario, verificarCredenciales, getUsuarios, getUsuario, exists }
