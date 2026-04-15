import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization; //Recibe el token que llega de login por parte de un usuario "Baurer Token"
  const token = authHeader.split(" ")[1]; //Recibe la authenticación del token lo valida y entrega solamente lo que encuentre que sea el "Token" omitiendo el "Baurer"

    if (!token) {
    return res.status(401).json({ message: "No autorizado" });
    }

    try {
    const data = jwt.verify(token, "secretKey");
    req.user = data;
    next();
    } catch {
    return res.status(401).json({ message: "Token inválido", token });
    }
};