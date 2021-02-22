const { UserValidator } = require("../validator/user.validator");
const { UserDAO } = require("../dao/user.dao");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  static async changeUserStatus(userId, status) {
    try {
      await UserValidator.validateStatusInput(userId, status);
      let result = await UserDAO.findOne(userId);
      if (!result) {
        throw new Error("No User Found");
      }
      let isActive = result.active == 1;
      if (status == isActive) {
        throw new Error(
          "Already record is " + (isActive ? "Active" : "Inactive")
        );
      } else {
        await UserDAO.updateStatus(result.id, !result.active);
        return "User Status Changed";
      }
    } catch (error) {
      throw error;
    }
  }

  async findUserbyId(userId) {
    try {
      let result = await userDAO.findOne(userId);
      // console.log(result);
      if (!result) {
        throw new Error("No User Found");
      } else {
        // console.table(result);
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async allUsersList() {
    try {
      let result = await UserDAO.findAll();
      return result;
    } catch (error) {
      throw new Error("Invaild Table");
    }
  }

  static async activeUsers() {
    try {
      let result = await UserDAO.findActiveUser();
      // console.log(result);
      return result;
    } catch (error) {
      throw new Error("No Active Users");
    }
  }

  static async walletBalance(userId) {
    try {
      let result = await UserDAO.findWalletUserId(userId);
      if (!result) {
        throw new Error("Invalid User Detail");
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async addBalance(bals, id) {
    try {
      await UserValidator.balanceValidator(bals, id);
      let wallet = await UserDAO.findWalletUserId(id);
      if (!wallet) {
        throw new Error("User Id Not Found");
      } else {
        await UserValidator.balanceValidator(bals, id);
        await UserDAO.addWalletBalance(bals, id);
        return "Balance Updated";
      }
    } catch (error) {
      throw error;
    }
  }

  static async registerUser(user) {
    try {
      // await UserValidator.emailValidator(email);
      await UserValidator.validateNewUser(user);
      // await UserValidator.nameValidator(user.name);
      // await UserValidator.passwordValidator(user.password);
      let exists = await UserDAO.findByEmail(user.email);
      if (exists) {
        throw new Error("Mail Already exists");
      } else {
        await bcrypt.hash(user.password, 10, (err, hash) => {
          UserDAO.save(user, hash).then((res) => {
            let userID = res.insertId;
            UserDAO.createWalletAccount(userID);
          });
        });
        return "User Added Successfully";
      }
    } catch (error) {
      throw error;
    }
  }

  static async userLogin(loginDetails) {
    try {
      await UserValidator.isvalidEmail(loginDetails);
      console.log(loginDetails);
      let usersList = await UserDAO.findUser(loginDetails.email);
      await UserValidator.isEmailExists(usersList);
      let userRole = loginDetails.role != null ? loginDetails.role : "USER";
      let userlogin = usersList.find((u) => u.role == userRole);
      await UserValidator.isUserLoginExists(userlogin);
      let hashPassword = await bcrypt.compare(
        loginDetails.password,
        userlogin.password
      );
      if (!userlogin || hashPassword == false) {
        throw new Error("Invalid User Detail");
      } else {
        delete userlogin.password;
        return userlogin;
      }
    } catch (error) {
      throw error;
    }
  }

  static async passwordUpdate(userId, oldPassword, newPassword) {
    try {
      // console.log(updateUserPassword, "passs")
      console.log(oldPassword, newPassword);
      await UserValidator.updatePasswordValid(oldPassword, newPassword);
      // await UserValidator.passwordValidator(newPassword);
      let isUserIdExists = await UserDAO.findOne(userId);
      await UserValidator.isUserExists(isUserIdExists);
      let hashPassword = await bcrypt.compare(
        oldPassword,
        isUserIdExists.password
      );
      await UserValidator.passwordMatch(hashPassword, userId, newPassword);
      return "Password Successfully Changed";
    } catch (error) {
      throw error;
    }
  }

  static async userLists() {
    let userList = await UserDAO.userFullList();
    return userList;
  }
}

exports.UserService = UserService;
