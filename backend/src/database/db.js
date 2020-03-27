const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Ong = require('../models/Ong');
const Incident = require('../models/Incident');

const connection = new Sequelize(dbConfig);

Ong.init(connection);
Incident.init(connection);

Incident.associate(connection.models)

module.exports = connection;