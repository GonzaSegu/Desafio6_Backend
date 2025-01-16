require('dotenv').config()
const app = require ('./src/app')

const { PORT } = process.env

app.listen(PORT || 3001, () => {        //asignando puerto en el servidor
    console.log(`Server running en http://localhost:${PORT}`)
    console.log('Server running en el http://localhost:'+ PORT)
})  

