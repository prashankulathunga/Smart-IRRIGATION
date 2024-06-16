const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const connection = require('./model/dbConnector');

const farmerRoute = require('./route/farmerRoute');
const paddyFieldRoute = require('./route/paddyFieldRoute');
const soilMoistureRoute = require('./route/soilmoistureRoute');
const waterLevelRoute = require('./route/waterLevelRoute');
const rainfallRoute = require('./route/rainfallRoute');

require('express-async-errors');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.SERVICE_PORT || 3000;

try {
    app.listen(port, () => {
        console.log(`server is running port ${port}`);
    })

} catch (error) {
    console.log(error);
}

app.get('/test-api', async (req, resp) => {
    // return resp.json({message: 'server is running perfectly!'});

    connection.query('SELECT * FROM farmer', (err, result, fields)=>{
        console.log(result);
        console.log(fields);

        return resp.status(200).json(result);
    });

});

//routes section

app.use('/api/v1/farmer', farmerRoute);
app.use('/api/v1/paddy', paddyFieldRoute);
app.use('/api/v1/soil-moisture', soilMoistureRoute);
app.use('/api/v1/water-level', waterLevelRoute);
app.use('/api/v1/rainfall', rainfallRoute);
