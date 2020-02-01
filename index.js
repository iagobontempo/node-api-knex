const app = require('express')();
const consign = require('consign');


consign()
    .then('./config/middlewares.js')
    .into(app)


const port = 3000;
app.listen(port, () => {
    console.log(`Backend running on ${port}`)
})