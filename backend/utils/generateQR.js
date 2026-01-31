const QRCode = require('qrcode')


const generateQR =async (table , res_name) =>{
    try {
    const qrUrl = `http://10.102.40.29:5173/customer/${res_name}/login/?token=${table.qrCode}`
    const qrImage = await QRCode.toDataURL(qrUrl);
    return qrImage
    } catch (error) {
        throw new Error('error in generat qr')
    }
}

module.exports = generateQR