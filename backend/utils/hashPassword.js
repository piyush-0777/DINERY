
const bcrypt = require('bcrypt')

const hashPasswordGenerater = async (password) => {
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

const hashPasswordChecker = async (password , hash) =>{

    const isMatch = await bcrypt.compare(password , hash);
    return isMatch;
}

module.exports = {hashPasswordGenerater ,hashPasswordChecker};