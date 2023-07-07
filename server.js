const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path:'config.env'})
const PORT = process.env.PORT || 8080;

//log requets
app.use(morgan('tiny'));

connectDB();

//parse
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine", "ejs")

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

/*
app.get('/', (req, res) => {
    res.send("CRUD Application");
});
*/
//load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {console.log(`listening on http://localhost:${PORT}`)});
