'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        dueDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: Sequelize.DATE, 
            allowNull: true,
        },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
}
