'use strict';

const Sequelize = require('sequelize');
const { QueryInterface } = require('sequelize');

const TABLE_NAME = 'ActivityLog';

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
          UserId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          location: {
            allowNull: false,
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
