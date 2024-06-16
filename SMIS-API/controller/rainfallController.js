const connector = require('../model/dbConnector');

const findLatest = async (req, resp)=>{
    try{

        const [result] = await connector.query('SELECT * FROM rainfall ORDER BY rainfall_id DESC LIMIT 1');

        if (result){
            return resp.status(200).json(result);
        }else{
            return resp.status(404).json({status:false, message:'No rainfall record found!'})
        }

    }catch(error){
        return resp.status(500).json({status:false, message:"Internal server error!"});
    }
}

const findByID = async (req, resp) => {
    try {
        const [result] = await connector.query('SELECT * FROM rainfall WHERE rainfall_id = ?', [req.params.id]);

        if (!result || result.length === 0) {
            return resp.status(404).json({status: false, message: 'rainfall record not found!'});
        } else {
            return resp.status(200).json(result);
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};

module.exports = {
    findLatest,
    findByID
}