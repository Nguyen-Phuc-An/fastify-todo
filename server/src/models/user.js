import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Todo, {
                foreignKey: 'userId',   
                as: 'todos',           
                onDelete: 'CASCADE',    
            });
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,       // tự định nghĩa khóa chính
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,           // đảm bảo email không trùng
            validate: {
                isEmail: true,
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        paranoid: true,         // ✅ bật soft delete
        deletedAt: 'deletedAt', // ✅ Sequelize tự tạo cột này
    });
    return User;
};