'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ongs', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        key_access:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        email:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        whatsapp:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        city:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        uf:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('ongs');

  }
};
