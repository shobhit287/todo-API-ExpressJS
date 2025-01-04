const CustomErrorHandler = require("../../customErrorHandler");
const bcrypt = require("bcrypt");

const UserService = require("../../service/user.service");
const userService = new UserService();

async function create(req, res) {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    return res.status(201).send(responseDto(await userService.create(user)));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function getAll(req, res) {
  try {
    return res.status(200).send(responseDto(await userService.findAll()));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(responseDto(user));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function update(req, res){
  try {
    const {body} = req;
    const {id} = req.params;
    return res.status(200).json(responseDto(await userService.updateOne(id, body)));
  } catch(error) {
    if(error instanceof CustomErrorHandler) {
        return res.status(error.statusCode).json(error.message);
    } else {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function deleteUser(req, res){
  try {
    const {id} = req.params;
    await userService.delete(id);
    return res.status(200).json({message: "User Deleted Successfully"});
  } catch(error) {
    if(error instanceof CustomErrorHandler) {
        return res.status(error.statusCode).json(error.message);
    } else {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function changePassword(req, res) {
   try {
     const {oldPassword, newPassword} = req.body;
     const {id} = req.params;
     const user = await userService.findOne({ _id: id });
     if (!user) {
        return res.status(404).json({ error: "User not found" });
     }
     await validatePassword(oldPassword, user._doc.password);
     const hashedPassword = await bcrypt.hash(newPassword, 10);
     await userService.updateOne(id, {password: hashedPassword});
     return res.status(200).json({message: "Password changed successfully"})  
   } catch(error) {
    if(error instanceof CustomErrorHandler) {
        return res.status(error.statusCode).json(error.message);
    } else {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
   }
}

async function validatePassword(oldPassword, hashedPassword) {
  if(await bcrypt.compare(oldPassword, hashedPassword)) {
    return;
  } else {
    throw new CustomErrorHandler(400, {error: "Old password is incorrect"});
  }
}

const responseDto = (response) => {
  const userResponse = response == null ? null : Array.isArray(response) ? response.map((user) => user._doc) : response._doc;
  if (Array.isArray(userResponse)) {
    return userResponse.map((user) => {
      return {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  } else if(userResponse){
    return {
      userId: userResponse._id,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      email: userResponse.email,
      createdAt: userResponse.createdAt,
      updatedAt: userResponse.updatedAt,
    };
  }
  return null;
};
module.exports = {
  create,
  getAll,
  getById,
  update,
  changePassword,
  deleteUser
};
