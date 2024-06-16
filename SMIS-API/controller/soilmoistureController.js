const connector = require('../model/dbConnector');

// const findAll = async (req, resp)=>{
//     try{
//
//         const [result] = await connector.query('SELECT * FROM soilMoisture');
//
//         if (result){
//             return resp.status(200).json(result);
//         }else{
//             return resp.status(404).json({status:false, message:'No soil moisture records found!'})
//         }
//
//     }catch(error){
//         return resp.status(500).json({status:false, message:"Internal server error!"});
//     }
// }

const findByID = async (req, resp) => {
    try {
        const [result] = await connector.query('SELECT * FROM soilmoisture WHERE soil_moisture_id = ?', [req.params.id]);

        if (!result || result.length === 0) {
            return resp.status(404).json({status: false, message: 'soil moisture record not found!'});
        } else {
            return resp.status(200).json(result);
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};

// const soilMoistureLevelAVG = async (req, resp)=>{
//
//     try{
//
//         const query = `
//             SELECT AVG(soil_moisture_level) AS average_data
//             FROM (
//                 SELECT soil_moisture_level
//                 FROM soilmoisture
//                 ORDER BY soil_moisture_id DESC
//                 LIMIT 10
//             ) AS last_10_recordsAVG
//         `;
//
//         const result = await connector.query(query);
//
//         if (result){
//             return resp.status(200).json(result);
//         }else{
//             return resp.status(404).json({status:false, message:'No soil moisture records AVG found!'})
//         }
//
//     }catch (error){
//         return resp.status(500).json({status:false, message:'internal server error!'});
//     }
//
// }

module.exports ={
    // findAll,
    findByID,
    // soilMoistureLevelAVG
}








