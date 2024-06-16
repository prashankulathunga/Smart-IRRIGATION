const connector = require('../model/dbConnector');

const findAll = async (req, resp) => {
    try {

        const joinQuery = `SELECT pf.paddy_field_id,
        (SELECT water_level FROM waterLevels WHERE waterLevels.paddy_field_id = pf.paddy_field_id ORDER BY water_level_id DESC LIMIT 1) AS water_level,
        (SELECT soil_moisture_level FROM soilMoisture WHERE soilMoisture.paddy_field_id = pf.paddy_field_id ORDER BY soil_moisture_id DESC LIMIT 1) AS soil_moisture,
        (SELECT rainfall_status FROM rainfall WHERE rainfall.paddy_field_id = pf.paddy_field_id ORDER BY rainfall_id DESC LIMIT 1) AS rainfall_status
        FROM paddyField pf;
 
        `;


        const [result] = await connector.query(joinQuery);

        if (result) {
            return resp.status(200).json(result);
        } else {
            return resp.status(404).json({status: false, message: 'No water level records found!'})
        }

    } catch (error) {
        console.log(error);
        return resp.status(500).json({status: false, message: "Ïnternal server error!"});
    }
}


const findByID = async (req, resp) => {
    try {
        const [result] = await connector.query('SELECT * FROM waterlevels WHERE water_level_id = ?', [req.params.id]);

        if (!result || result.length === 0) {
            return resp.status(404).json({status: false, message: 'water level record not found!'});
        } else {
            return resp.status(200).json(result);
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};


const waterLevelAVG = async (req, resp) => {

    try {

        const query = `
            SELECT AVG(water_level) AS average_data
            FROM (SELECT water_level
                  FROM waterlevels
                  ORDER BY water_level_id DESC
                  LIMIT 10) AS last_10_recordsAVG
        `;

        const result = await connector.query(query);

        if (result) {
            return resp.status(200).json(result);
        } else {
            return resp.status(404).json({status: false, message: 'No water level records AVG found!'})
        }

    } catch (error) {
        return resp.status(500).json({status: false, message: 'internal server error!'});
    }


}


module.exports = {
    findAll,
    findByID,
    waterLevelAVG,

}















