const express = require ('express')
const { getConnection} = require ('./db/db-connect-mongo') 
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

// Implementamos cors
app.use(cors());

getConnection();

// Parseo JSON
app.use(express.json());
app.use('/director', require('./routers/director'));
app.use('/media', require('./routers/media'));
app.use('/generos', require('./routers/generos'));
app.use('/productora', require('./routers/productora'));
app.use('/tipo', require('./routers/tipo'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})





