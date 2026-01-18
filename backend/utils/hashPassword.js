
const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    try {
            const salt = await bcrypt.genSalt(10);
    
            if(!salt) {
                throw new Error("salt generation failed")
            }
    
            const hashPassword = await bcrypt.hash(password , salt);
    
            if(!hashPassword) {
                throw new Error(" password generation failed")
            }
            return hashPassword
        } catch (error) {
            throw new Error(`hashing is failed ..${error}`)
        }
}

module.exports = hashPassword;