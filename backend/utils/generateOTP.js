

const generateOTP = (len = 6) => {
    let otp = 0;
    for(let i = 0 ; i < len;  i++) {
        otp = otp * 10 + Math.floor(Math.random() * 10)
    }
    return otp;
}

module.exports = generateOTP