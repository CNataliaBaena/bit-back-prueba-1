import User from "../models/users.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear usuario
        const newUser = new User({
            name,
            lastname,
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar usuario
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Verificar contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar token
        const token = jwt.sign(
            { id: user._id },
            "secretKey", // usa variables de entorno en producción
            { expiresIn: "10h" },
        );

        res.json({
            message: "Login exitoso",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const usersController = {
    // create: async (req, res) => {
    //     try {
    //         const { name, email, age, password } = req.body;
    //         const newUser = new User({
    //         name,
    //         email,
    //         age,
    //         password
    //         });
    //         await newUser.save();
    //         res.status(201).json({ message: 'User created successfully'});
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error creating user'});
    //     }
    // },
    readAll: async (req, res) => {
        try {
            const users = await User.find();
            res
                .status(200)
                .json({ message: "Users retrieved successfully", data: users });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users" });
        }
    },
    read: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res
                .status(200)
                .json({ message: "User retrieved successfully", data: user });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user" });
        }
    },
    update: async (req, res) => {
        try {
            const { name, email, age, password } = req.body;
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                name,
                email,
                age,
                password,
            });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User updated successfully" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating user" });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user" });
        }
    },
};

export default usersController;
