'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'role_permission',
        {
          role_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'role',
              key: 'id',
            },
          },
          permission_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'permission',
              key: 'id',
            },
          },
          created_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id',
            },
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id',
            },
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.addIndex(
        'role_permission',
        ['role_id', 'permission_id'],
        {
          unique: true,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_permission');
  },
};
