import UserController from "../controllers/userController.js";

class UserView {
    static async login(req, res) {
        try {
            const { email, password } = req.body || {};

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const auth = await UserController.login(email, password);
            return res.json(auth);
        } catch (error) {
            console.error('Error in login:', error);
            return res.status(401).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const users = await UserController.getAll();
            res.json(users);
        } catch (error) {
            console.error('Error in getAll users:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { email, password, name } = req.body || {};

            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Email, password and name are required' });
            }

            const newUser = await UserController.create(email, password, name);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error in create user:', error);
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await UserController.getById(id);

            res.json(user);
        } catch (error) {
            console.error('Error in getById user:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { email, password, name } = req.body || {};

            const updatedUser = await UserController.update(id, email, password, name);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(updatedUser);
        } catch (error) {
            console.error('Error in update user:', error);
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await UserController.delete(id);
            if (result === null) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error in delete user:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserView;