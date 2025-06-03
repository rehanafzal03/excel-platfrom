const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouters');
const product = require('./Routes/product');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); 
app.use('/auth', AuthRouter);
app.use('/products', product);

app.get('/pings', (req, res) => {
    res.send("PONG");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
