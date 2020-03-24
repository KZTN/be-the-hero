const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const {ong_id} = req.body;
        const ong = await connection.table('ongs').where('id', ong_id).select('name').first();
        if (!ong) {
            return res.status(400).json({msg: "No ONG found with this ID"});
        }
        return res.json(ong);
    }
};