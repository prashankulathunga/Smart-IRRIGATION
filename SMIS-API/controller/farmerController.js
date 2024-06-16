const connector = require('../model/dbConnector');

const create = async (req, resp) => {
    const {farmer_id, farmer_name, email, contact_number} = req.body;

    try {

        const [result] = await connector.query('INSERT INTO farmer (farmer_id, farmer_name, email, contact_number) VALUES (?, ?, ?, ?)',
            [farmer_id, farmer_name, email, contact_number]);

        if (result) {
            return resp.status(201).json({status: true, message: 'farmer was saved successfully!'});
        } else {
            return resp.status(500).json({status: true, message: 'Farmer save failed!'});
        }


    } catch (error) {
        console.log(error);
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }

};

const findAll = async (req, resp) => {
    try {

        const joinQuery = `SELECT farmer.*, paddyfield.*
                           FROM farmer
                                    INNER JOIN paddyfield ON farmer.farmer_id = paddyfield.farmer_id;
        `;

        const [result] = await connector.query(joinQuery);

        if (result && result.length > 0) {
            return resp.status(200).json(result);
        } else {
            return resp.status(404).json({status: false, message: 'No farmer records found'});
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};

const findByID = async (req, resp) => {
    try {
        const [result] = await connector.query('SELECT * FROM farmer WHERE farmer_id = ?', [req.params.id]);

        if (!result || result.length === 0) {
            return resp.status(404).json({status: false, message: 'farmer was not found!'});
        } else {
            return resp.status(200).json(result);
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};

const deleteById = async (req, resp) => {
    try {
        const [result] = await connector.query('DELETE FROM farmer WHERE farmer_id = ?', [req.params.id]);

        if (result.affectedRows > 0) {
            return resp.status(204).json({status: true, message: 'farmer was successfully deleted!'});
        } else {
            return resp.status(404).json({status: false, message: 'farmer was not found!'});
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};


const update = async (req, resp) => {
    const {farmer_id, farmer_name, email, contact_number} = req.body;

    try {
        const [result] = await connector.query('SELECT * FROM farmer WHERE farmer_id = ?', [req.params.id]);

        if (!result || result.length === 0) {
            return resp.status(404).json({status: false, message: 'farmer record not found'});
        }

        const updateResult = await connector.query(
            'UPDATE farmer SET farmer_name=?, email=?, contact_number=? WHERE farmer_id=?',
            [farmer_name, email, contact_number, farmer_id]
        );

        if (updateResult) {
            return resp.status(200).json({status: true, message: 'farmer record updated successfully'});
        } else {
            return resp.status(500).json({status: false, message: 'Failed to update farmer record'});
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};

module.exports = {
    create,
    findAll,
    findByID,
    deleteById,
    update
}










