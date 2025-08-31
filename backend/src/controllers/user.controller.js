const userModel = require("../models/user.model");
const { hashPassword, registerUserValidation, decodePassword, loginUserValidation, createJWT } = require("../utils/index.js");

async function register(reqest, response) {
  const body = reqest.body;

  try {
    if (
      typeof body === "undefined" ||
      body === null ||
      Object.keys(body).length === 0
    ) {
      return response.status(400).send({ error: true, message: `please fill details before register` });
    }

    const { name, bio, password, email } = reqest.body;

    const { error, data } = registerUserValidation(reqest.body);
    if (error) {
      return response.status(400).send({ error, data });
    }


    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return response.status(400).send({
        message: `User with ${email} is already present so please login`,
      });
    }

    let responseData = await userModel.create({
      name,
      bio,
      password: await hashPassword(password),
      email,
    });
    return response.status(201).send(responseData);
  } catch (error) {
    return response.status(500).send({ error: true, data: error.message });
  }
}


async function Login(request, response) {
  const body = request.body
  try {
    if (
      typeof body === "undefined" ||
      body === null ||
      Object.keys(body).length === 0
    ) {
      return response.status(400).send({ error: true, message: `please fill details before login` });
    }

    const { password, email } = body;


    const { error, data } = loginUserValidation(request.body);
    if (error) {
      return response.status(400).send({ error, data });
    }

    const checkEmail = await userModel.findOne({ email });

    if (!checkEmail) {
      return response.status(400).send({ error: true, message: `${email} is not present please register` });
    }

    const checkPassword = await decodePassword(password, checkEmail.password);

    if (!checkPassword) {
      return response.status(400).send({ error: true, message: `Invalid credentials` });
    }

    const jwtToken = createJWT({id : checkEmail._id})

    return response.status(201).send({ message: 'Login successfull', token : jwtToken });

  } catch (error) {
    return response.status(500).send({ error: true, data: error.message });

  }
}

module.exports = {
  register,
  login: Login
};
