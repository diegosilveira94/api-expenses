import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

class UserController {
    static replacePassword(password) {
        return '*'.repeat(password.length);
    }

    static mapUser(user) {
        const userData = user.dataValues || user;

        return {
            ...userData,
            password: UserController.replacePassword(userData.password)
        };
    }

    static mapPublicUser(user) {
        const mapped = UserController.mapUser(user);

        return {
            id: mapped.id,
            email: mapped.email,
            name: mapped.name
        };
    }

    static async getAll() {
        return (await User.getAllUsers())
            .map(u => UserController.mapUser(u));
    }

    static async create(email, password, name) {
        if (password.length < 6) {
            throw new Error('The password must contain at least 6 characters');
        }

        if (email.length < 5 || !email.includes('@')) {
            throw new Error('Email must contain at least 5 characters and include an "@"');
        }

        const user = await User.createUser(email, password, name);
        return { ...user, password: UserController.replacePassword(user.password) };
    }

    static async login(email, password) {
        const user = await User.getUserByEmail(email);

        if (!user || user.password !== password) {
            throw new Error('Invalid credentials.');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );

        return {
            token,
            user: UserController.mapPublicUser(user)
        };
    }

    static async getById(id) {
        const user = await User.getUserById(id);

        return UserController.mapUser(user);
    }

    static async update(id, email, password, name) {
        if (password.length < 6) {
            throw new Error('Password must contain at least 6 characters');
        }

        if (email.length < 5 || !email.includes('@')) {
            throw new Error('Email must contain at least 5 characters and include an "@"');
        }

        const user = await User.updateUser(id, email, password, name);

        return { ...user, password: UserController.replacePassword(user.password) };
    }

    static async delete(id) {
        return await User.deleteUser(id);
    }
}

export default UserController;
