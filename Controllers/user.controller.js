import User from "../Models/user.model.js";

let cookieOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

async function generateToken(currUser) {
  return await currUser.generateToken();
}

let signup = async (req, res) => {
  let { email } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(409)
        .send({ result: false, messgae: "User already Exist  " });
    }

    let newUser = new User(req.body);
    let { accessToken, refreshToken } = await generateToken(newUser);

    newUser.refreshToken = refreshToken;

    let newUserData = await newUser.save();



    return res
      .status(201)
      .cookie("AccessToken", accessToken, cookieOption)
      .cookie("RefreshToken", refreshToken, cookieOption)
      .send({
        result: true,
        message: "User Created succesfully",
        data: newUserData,
      });
  } catch (err) {
    console.log({ result: false, message: err.message });
  }
};
let login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .send({ result: false, messgae: "User not found " });
    }

    let passwordCheck = await user.comparePassword(password);

    if (passwordCheck == true) {
      let { accessToken, refreshToken } = await generateToken(user);

      let updatedUser = await User.findByIdAndUpdate(
        user._id,
        { refreshToken: refreshToken },
        { new: true }
      );

      console.log(updateUser);
      return res
        .status(200)
        .cookie("AccessToken", accessToken, cookieOption)
        .cookie("RefreshToken", refreshToken, cookieOption)
        .send({
          result: true,
          message: "User Login sucessfully",
          data: updatedUser
        });
    } else {
      return res
        .status(401)
        .send({ result: false, messgae: "email/password is incorrect" });
    }
  } catch (err) {
    console.log({ result: false, message: err.message });
  }
};

let getUser = (req, res) => {};
let updateUser = (req, res) => {};
let logout = (req, res) => {};

export {signup , login , updateUser , logout , getUser}

// signup login getuser updateuser logout
