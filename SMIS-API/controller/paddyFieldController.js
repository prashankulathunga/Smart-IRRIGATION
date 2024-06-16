const connector = require('../model/dbConnector');

const create = async (req, resp) => {
    const {paddy_field_id, location, area, farmer_id} = req.body;

    try {

        const [result] = await connector.query('INSERT INTO paddyField (paddy_field_id, location, area, farmer_id) VALUES (?, ?, ?, ?)',
            [paddy_field_id, location, area, farmer_id]);

        if (result) {
            return resp.status(201).json({status: true, message: 'paddy field was saved successfully!'});
        } else {
            return resp.status(500).json({status: true, message: 'paddy field save failed!'});
        }


    } catch (error) {
        console.log(error);
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }

};

// const findAll = async (req, resp) => {
//     try {
//         const [result] = await connector.query('SELECT * FROM paddyField');
//
//         if (result && result.length > 0) {
//             return resp.status(200).json(result);
//         } else {
//             return resp.status(404).json({status: false, message: 'No paddy field records found'});
//         }
//     } catch (error) {
//         return resp.status(500).json({status: false, message: 'Internal server error'});
//     }
// };

const findByID = async (req, resp) => {
    try {
        const [result] = await connector.query('SELECT * FROM paddyField WHERE paddy_field_id = ?', [req.params.id]);

        if (!result || result.length === 0) {
            return resp.status(404).json({status: false, message: 'paddy field was not found!'});
        } else {
            return resp.status(200).json(result);
        }
    } catch (error) {
        return resp.status(500).json({status: false, message: 'Internal server error'});
    }
};

// const deleteById = async (req, resp) => {
//     try {
//         const [result] = await connector.query('DELETE FROM paddyField WHERE paddy_field_id = ?', [req.params.id]);
//
//         if (result.affectedRows > 0) {
//             return resp.status(204).json({ status: true, message: 'paddy field was successfully deleted!' });
//         } else {
//             return resp.status(404).json({ status: false, message: 'paddy field was not found!' });
//         }
//     } catch (error) {
//         return resp.status(500).json({ status: false, message: 'Internal server error' });
//     }
// };


// const update = async (req, resp) => {
//     const {paddy_field_id, location,area, farmer_id} = req.body;
//
//     try {
//         const [result] = await connector.query('SELECT * FROM paddyField WHERE farmer_id = ?', [req.params.id]);
//
//         if (!result || result.length === 0) {
//             return resp.status(404).json({ status: false, message: 'paddy field record not found' });
//         }
//
//         const updateResult = await connector.query(
//             'UPDATE paddyField SET location=?, area=?, farmer_id=? WHERE paddy_field_id=?',
//             [location,area, farmer_id, paddy_field_id]
//         );
//
//         if (updateResult) {
//             return resp.status(200).json({ status: true, message: 'paddy field record updated successfully' });
//         } else {
//             return resp.status(500).json({ status: false, message: 'Failed to update paddy field record' });
//         }
//     } catch (error) {
//         return resp.status(500).json({ status: false, message: 'Internal server error' });
//     }
// };

module.exports = {
    create,
    // findAll,
    findByID,
    // deleteById,
    // update
}










