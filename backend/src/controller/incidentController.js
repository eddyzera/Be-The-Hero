const Ong = require('../models/Ong');
const Incident = require('../models/Incident');

class IncidentController {
    async create(req, res) {
        try {
            
            const key_access =  req.headers.authorization;

            const { dataValues } = await Ong.findOne({ where: { key_access } });

            const { title, description, value } = req.body;

            const result = await Incident.create({
                ong_id: dataValues.id,
                title,
                description,
                value,  
            })

            res.json( result.id )

        } catch (error) {
            console.error(error)
        }
    }

    async index(req, res) {

        const { page = 1 } = req.query;

        const pagination = (page - 1) * 5;

        const incident = await Incident.findAll({ limit: 5, offset: pagination, include: { association: 'ongs' } });

        const count = incident.length;

        res.header('X-Total-Count', count)
        res.json(incident)
    }

    async destroy(req, res) {

        try {
            
            const id = req.params.incidentId;

            const key_access =  req.headers.authorization;

            const key_ong = await Ong.findOne({ where: { key_access } });

            const { dataValues } = await Incident.findByPk(id);

            const idOng = key_ong.dataValues.id;

            if ( dataValues.ong_id !== idOng ) {
                return res.status(401).json({ error: 'Not authorization' });
            }

            await Incident.destroy({ where: {id}})

            return res.status(204).json()

        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Failed in delete incident' })
        }

    }
}

module.exports = new IncidentController;