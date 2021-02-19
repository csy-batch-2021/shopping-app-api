// import { UserDAO } from "./user.dao";
const { UserDAO } = require("../dao/user.dao");
const bcrypt = require("bcrypt");
const userDAO = new UserDAO();

class UserValidator {
  static async validateStatusInput(userId, status) {
    // if (userId == null || userId == "") {
    //     throw new Error("userId cannot be empty");
    // }
    if (isNaN(userId)) {
      throw new Error("userId is not a number");
    } else if (isNaN(status)) {
      throw new Error("Status is not a number");
    }
  }

  static async balanceValidator1(bals, id) {
    if (id == null || id == "" || id.trim() == 0) {
      throw new Error("UserId cannot be empty");
    } else if (bals == null || bals == "" || bals.trim() == 0) {
      throw new Error("Balance cannot be empty");
    } else if (isNaN(id)) {
      throw new Error("UserId is not a number");
    }
  }

  static async validateNewUser(user) {
    if (user.name == null || user.name == "" || user.name.trim() == 0) {
      throw new Error("Name cannot be empty");
    } else if (user.name.length < 3) {
      throw new Error("Name should be at least 3 characters");
    } else if (
      user.email == null ||
      user.email == "" ||
      user.email.trim() == 0
    ) {
      throw new Error("Email cannot be empty");
    } else if (
      user.password == null ||
      user.password == "" ||
      user.password.trim() == 0
    ) {
      throw new Error("Password cannot be empty");
    } else if (user.password.length < 8) {
      throw new Error("password length should be at least 8 characters");
    }
  }

  static async balanceValidator(bals, id) {
    if (bals <= 0) {
      throw new Error("Invalid Balance Amount");
    }
  }

  static async passwordValidator(password) {
    let regularExpression = /^[a-zA-Z0-9]+$/;
    let valid = regularExpression.test(password);
    if (valid == false) {
      throw new Error("Password Should Contain Alphanumeric Characters Only");
    }
  }

  static async nameValidator(name) {
    var regularExpression = /^[a-zA-Z]+$/;
    var valid = regularExpression.test(name);
    if (valid == false) {
      throw new Error("Name Must Contain Characters Only");
    }
  }

  static async emailValidator(email) {
    if (email == false) {
      throw new Error("Invalid Email Format");
    }
  }

  static async isEmailExists(usersList) {
    if (usersList == 0) {
      throw new Error("Email Does Not Exist");
    } else {
      return usersList;
    }
  }

  static async isUserLoginExists(userlogin) {
    if (!userlogin) {
      throw new Error("Invalid User Detail");
    } else {
      return userlogin;
    }
  }

  static async isvalidEmail(login) {
    if (login.email == null || login.email == "" || login.email.trim() == 0) {
      throw new Error("Email cannot be empty");
    } else if (
      login.password == null ||
      login.password == "" ||
      login.password.trim() == 0
    ) {
      throw new Error("Password cannot be empty");
    }
  }

  static async updatePasswordValid(oldPassword, newPassword) {
    if (newPassword == null || newPassword == "" || newPassword.trim() == 0) {
      throw new Error("New Password cannot be empty");
    } else if (
      oldPassword == null ||
      oldPassword == "" ||
      oldPassword.trim() == 0
    ) {
      throw new Error("oldPassword cannot be empty");
    } else if (newPassword.length < 8) {
      throw new Error("password length should be at least 8 characters");
    }
    // else if (userId == null || userId == '') {
    //     throw new Error("ID cannot be empty");
    // }
  }

  static async toCheckValidUserId(userId) {
    var result = await UserDAO.findOne(userId);

    if (!result) {
      throw new Error("Please Check User ID");
    }
  }

  static async isAdmin(req, res, next) {
    let userId = req.body.loggedInUserId;
    var result = await UserDAO.findOne(userId);
    try {
      if (result) {
        if (result.role == "ADMIN") {
          next();
        } else {
          throw new Error("You Are Not Authorized");
        }
      } else {
        throw new Error("Please Enter Valid UserID");
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async isUserExists(isUserIdExists) {
    if (!isUserIdExists) {
      throw new Error("Please Enter Valid UserID");
    } else {
      return isUserIdExists;
    }
  }

  static async passwordMatch(hashPassword, userId, newPassword) {
    if (hashPassword == false) {
      throw new Error("Old Password Incorrect");
    } else {
      await bcrypt.hash(newPassword, 10, (err, hash) => {
        UserDAO.updatePassword(hash, userId);
      });
    }
  }
}

exports.UserValidator = UserValidator;
