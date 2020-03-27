const Ong = require('../models/Ong');
const Incident = require('../models/Incident');

class ProfileController {

    async index(req, res) {
        const key_access = req.headers.authorization;

        const { dataValues } = await Ong.findOne({ where: { key_access } })

        const idOng = dataValues.id

        const profile = await Incident.findAll({ 
            where: {
                ong_id : idOng 
            }
         })

        return res.json(profile)
    }

}

module.exports = new ProfileController;