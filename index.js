const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;


consign()
    .include('./library/passport.js')
    .then('./config/middlewares.js')
    .then('./library')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


const port = 3333;
app.listen(port, () => {
    console.log(`Backend running on ${port}`)
})