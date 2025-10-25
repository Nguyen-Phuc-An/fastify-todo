import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Todo.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user', // alias để gọi include
            });
        }
    }
    Todo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,       // tự định nghĩa khóa chính
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Todo',
        paranoid: true,         // ✅ bật soft delete
        deletedAt: 'deletedAt', // ✅ Sequelize tự tạo cột này
    });
    return Todo;
};