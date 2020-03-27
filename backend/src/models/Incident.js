const { Model, DataTypes } = require('sequelize');

class Incident extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            value: DataTypes.FLOAT,
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.Ong, {foreignKey: 'ong_id', as: 'ongs'})
    }
}

module.exports = Incident;