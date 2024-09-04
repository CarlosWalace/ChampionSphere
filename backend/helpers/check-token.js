const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado!" });
  }

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next(); // continua
    
  } catch (err) {
    res.status(400).json({ error: "O token é invalido" });
  }
};

module.exports = checkToken;
