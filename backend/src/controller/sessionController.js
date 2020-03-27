const Ong = require('../models/Ong');

class SessionController {

    async create(req, res) {
        const key_access = req.body;

        const dataValues = await Ong.findOne({ where: key_access })

        if ( !dataValues ) {
            return res.status(400).json({ error: 'No ONG found with this ID' })
        } 

        res.json(dataValues.name)
    }

}

module.exports = new SessionController;