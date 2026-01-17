const errorMiddleware = (err ,req , res , next) =>{
    console.log('error:' , err.stack || err);

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false ,
        Error: err.massage || 'Internal server error'
    })
}

module.exports = errorMiddleware