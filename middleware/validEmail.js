module.exports = (req, res, next) => {
  const {
    username,
    email,
    password,
    age,
    degree,
    experience,
    location,
  } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (
      ![
        username,
        email,
        password,
        age,
        degree,
        experience,
        location,
      ].every(Boolean)
    ) {
      return res
        .status(401)
        .json({ error: "Missing Credentials. All fields are required" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ error: "Invalid Email" });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res
        .status(401)
        .json({ error: "Missing Credentials. All fields are required" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ error: "Invalid Email" });
    }
  }

  next();
};
