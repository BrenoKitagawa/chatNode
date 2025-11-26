import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não enviado" });
  }

  try {
    const decoded = jwt.verify(token, "minha_chave_super_secreta_987654"); // coloque sua chave
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}
