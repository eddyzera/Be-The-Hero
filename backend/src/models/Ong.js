const { Model, DataTypes } = require('sequelize');

class Ong extends Model {
    static init(connection) {
        super.init({
            key_access: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            city: DataTypes.STRING,
            uf: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Ong, { foreignKey: 'ong_id', as: 'ongs' })
    }
}

module.exports = Ong;