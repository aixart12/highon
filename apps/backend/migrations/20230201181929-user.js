'use strict';

const Sequelize = require('sequelize');
const { QueryInterface } = require('sequelize');

const TABLE_NAME = 'Users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */

  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          isAdmin: {
            allowNull: true,
            defaultValue: false,
            type: Sequelize.BOOLEAN,
          },
          uuid: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
          },
          location: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          deletedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.dropAllTables(TABLE_NAME, { transaction });
    });
  },
};
