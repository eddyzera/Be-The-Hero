const Ong = require('../models/Ong');
const crypto = require('crypto');

class OngController {

    async create(req, res) {

        try {
            
            const { key_access, name, email, whatsapp, city, uf } = req.body;

            const ong = await Ong.findOne({ where: {email} })

            if (ong)
                return res.status(404).json({ error: 'Ong already exists' })

            const key = crypto.randomBytes(4).toString('HEX');
            
            await Ong.create({
                key_access: key,
                name,
                email,
                whatsapp,
                city,
                uf
            });
    
            return res.json({ access: key })

        } catch (error) {
            return res.status(400).json({ error: 'Failed Register Ong' })
        }
    }

    async show(req, res) {
        const ong = await Ong.findAll()

        return res.json(ong)
    }

    async update(req, res) {

        try {
            
            const id = req.params.ongId;

            const ongBody = req.body;

            await Ong.update(ongBody, {
                where: { id }
            });

            return res.json({ message: 'Update success' })
        } catch (error) {
            res.json({ error: 'Error in Update Ong' })
        }
    }

    async destroy(req, res) {
        try {
            
            const id = req.params.ongId;

            await Ong.destroy({ where: { id } });

            return res.json({ message: 'Delete success' });
            
        } catch (error) {
            res.json({ error: 'Error in delete Ong' })
        }
    }
}

module.exports = new OngController;