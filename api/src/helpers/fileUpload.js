const fileUpload = require('express-fileupload');

module.exports = {
    fileUpload: (fileUpload({
        useTempFiles : true,
        tempFileDir : './tempImg'
    }))
}