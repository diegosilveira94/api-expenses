"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Expenses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      date: { type: Sequelize.DATEONLY },
      description: { type: Sequelize.STRING },
      status: {
        type: Sequelize.ENUM("PENDENTE", "PAGA"),
        allowNull: false,
        defaultValue: "PENDENTE",
      },
      categoryId: {
        type: Sequelize.UUID,
        references: { model: "Categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Expenses");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Expenses_status";',
    );
  },
};
