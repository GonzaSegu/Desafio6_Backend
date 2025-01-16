const Auth = require('../models/Auth')

const handleLogin = async (req, res) => {
                        
    const { email, password } = req.body
    console.log(email)
    
   }


   module.exports = {handleLogin}