const QRCode = require('qrcode')


const generateQR =async (table , res_name) =>{
    try {
    const qrUrl = `http://localhost:5173${res_name}/customer/login/?token=${table.qrCode}`
    const qrImage = await QRCode.toDataURL(qrUrl);
    return qrImage
    } catch (error) {
        throw new Error('error in generat qr')
    }
}

module.exports = generateQR