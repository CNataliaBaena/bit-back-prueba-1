export const validateRegister = (req, res, next) => {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener mínimo 8 caracteres" });
    }

    if (password.length > 12) {
    return res.status(400).json({ message: "La contraseña debe tener maximo 12 caracteres" });
    }

    next();
};