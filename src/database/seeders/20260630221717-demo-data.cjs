"use strict";
const bcrypt = require("bcrypt");
const randomUUID = require("crypto").randomUUID;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const password = await bcrypt.hash("123456", 10);
    const userId = randomUUID();
    await queryInterface.bulkInsert("Users", [
      {
        id: userId,
        email: "demo@demo.com",
        password,
        name: "Demo",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    const foodId = randomUUID();
    const transpId = randomUUID();
    await queryInterface.bulkInsert("Categories", [
      { id: foodId, name: "Alimentação", createdAt: now, updatedAt: now },
      { id: transpId, name: "Transporte", createdAt: now, updatedAt: now },
    ]);

    await queryInterface.bulkInsert("Expenses", [
      {
        id: randomUUID(),
        amount: 50,
        date: "2026-06-01",
        description: "Mercado",
        status: "PAGA",
        categoryId: foodId,
        userId,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        amount: 20,
        date: "2026-06-02",
        description: "Ônibus",
        status: "PENDENTE",
        categoryId: transpId,
        userId,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Expenses", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
