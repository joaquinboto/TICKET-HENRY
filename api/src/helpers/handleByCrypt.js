const bycrypt = require('bcrypt')

//Encriptamos!!
const encrypt = async (password) => { 
    const hash = await bycrypt.hash(password, 10) 
    return hash
}

// Comparamos!!
const compare = async (passwordPlain, hashPassword) => {
    return await bycrypt.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }