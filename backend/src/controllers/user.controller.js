const userModel = require("../models/user.model");
const axios = require("axios");
const { hashPassword, decodePassword, createJWT, registerSchema, loginSchema, Validation } = require("../utils/index.js");

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

    const { name, bio, password, email, role } = reqest.body;

    const { error, data } = Validation(reqest.body, registerSchema);
    if (error) {
      return response.status(400).send({ error, data });
    }


    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return response.status(400).send({
        message: `User with ${email} is already present so please login`,
      });
    }

    const userInsert = {
      name,
      bio,
      password: await hashPassword(password),
      email
    }

    if(role) {
      userInsert.role = role
    }

    let responseData = await userModel.create(userInsert);

    const jwtToken = createJWT({id : responseData._id})

    const userObj = {
      name,
      token : jwtToken
    }

    return response.status(201).send({message : "successfully registred", user : userObj});
  } catch (error) {
    return response.status(500).send({ error: true, data: error.message });
  }
}


async function guestLogin(reqest, response) {
  try {
     const email = "guest@email.com";
     const password = "guest123";
     const responseLogin = await axios.post('http://localhost:3000/api/login', {email, password});
     return response.status(responseLogin.response.status).send(responseLogin.data);
  } catch (error) {
     if(error.response.status < 500) {
        return response.status(error.response.status).send(error.response.data);
     }
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


    const { error, data } = Validation(request.body, loginSchema);
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

    
    const userObj = {
      name : checkEmail?.name,
      token : jwtToken
    }

    return response.status(200).send({ message: 'Login successfull', user : userObj });

  } catch (error) {
    return response.status(500).send({ error: true, data: error.message });

  }
}

async function profile(reqest, response) {
  const token = reqest.headers.authorization;
  try {
    const userId = reqest.user._id;
    const user = await userModel.findById(userId).select('name email bio -_id');
     const userObj = {
      name : user?.name,
      token : token.split(" ")[1]
    }
    return response.send({ message: 'Login successfull', user : userObj })
  } catch (error) {
     return response.status(500).send({ error: true, data: error.message });
  }
}


module.exports = {
  register,
  login: Login,
  profile,
  guestLogin
};
