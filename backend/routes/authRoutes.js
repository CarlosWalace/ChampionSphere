const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// register an user
router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  //verify all the fields
  if (
    name == null ||
    email == null ||
    password == null ||
    confirmpassword == null
  ) {
    return res.status(400).json({ error: "Por favor Preencha todos os dados" });
  }
  //Check the passwords
  if (password != confirmpassword) {
    return res.status(400).json({ error: "As senhas não são iguais" });
  }
  //Check if user exist
  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    return res.status(400).json({ error: "O e-mail informado já está em uso" });
  }

  //create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();

    //create tokken
    const token = jwt.sign(
      {
        name: newUser.name,
        id: newUser._id,
      },
      "secretkey"
    );

    // return token

    res.json({
      error: null,
      msg: "Você realizou o cadastro com sucesso",
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login an user

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if user exixt
  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Não encontramos o e-mail cadastrado na plataforma" });
  }

  // check password
  const checkpassword = await bcrypt.compare(password, user.password);

  if (!checkpassword) {
    return res.status(400).json({ error: "Senha Incorreta" });
  }

  //create tokken
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "secretkey"
  );

  // return token

  res.json({
    error: null,
    msg: "Você realizou o login com sucesso",
    token: token,
    userId: user._id,
  });
});
module.exports = router;
