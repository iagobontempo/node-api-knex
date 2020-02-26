const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

module.exports = app => {
    app.use(bodyParser.json())
    // app.use(multer({ dest: "storage" }).single('image')) CRIAR UPLOAD
    app.use(cors())
}