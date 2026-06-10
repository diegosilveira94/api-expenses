import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/database.js";

class User extends Model {
    static async getAllUsers() {
        return await User.findAll({ include: [{ association: 'categories' }] }); // SELECT * FROM users INNER JOIN categories ON categories.userId = users.id
    }

    static async createUser(email, password, name) {
        return await User.create({ email, password, name }); // INSERT INTO users (email, password, name) VALUES (...)
    }

    static async getUserByEmail(email) {
        return await User.findOne({ where: { email }, include: [{ association: 'categories' }] });
    }

    static async getUserById(id) {
        return await User.findByPk(id, { include: [{ association: 'categories' }] }); // SELECT * FROM users WHERE id = ? com endereços
    }

    static async updateUser(id, email, password, name) {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }

        user.email = email;
        user.password = password;
        user.name = name;

        await user.save();
        return user;
    }

    static async deleteUser(id) {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }

        await user.destroy();
        return null;
    }

}

User.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
    {
        sequelize,
        modelName: 'User'
    }
);

export default User;