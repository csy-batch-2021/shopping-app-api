const { UserValidator } = require("./user.validator");
const { UserDAO } = require("./user.dao");

class UserService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async changeUserStatus(userId, status) {
    try {
      await UserValidator.validateStatusInput(userId, status);
      let result = await userDAO.findOne(userId);
      if (!result) {
        throw new Error("No User Found");
      }
      let isActive = result.active == 1;
      if (status == isActive) {
        throw new Error(
          "Already record is " + (isActive ? "Active" : "Inactive")
        );
      } else {
        await userDAO.updateStatus(result.id, !result.active);
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

  async allUsersList() {
    try {
      let result = await userDAO.findAll();
      return result;
    } catch (error) {
      throw new Error("Invaild Table");
    }
  }

  async activeUsers() {
    try {
      let result = await userDAO.findActiveUser();
      console.log(result);
      return result;
    } catch (error) {
      throw new Error("No Active Users");
    }
  }

  async registerUser(user) {
    try {
      await UserValidator.validateNewUser(user);
      let exists = await userDAO.findByEmail(user.email);
      // console.log(exists)
      // console.log("Mail Exists", exists);
      // console.log(user.role);
      if (exists) {
        throw new Error("Mail Already exists");
      } else {
        await userDAO.save(user);
        return "User Added Successfully";
      }
    } catch (error) {
      throw error;
    }
  }

  static async userLogin(loginDetails) {
    try {
      await UserValidator.isvalidEmail(loginDetails);
      let usersList = await UserDAO.findUser(loginDetails.email);
      let user = usersList.some((u) => u.password == loginDetails.password);
      if (!user) {
        throw new Error("Invaild User Detail");
      } else {
        return "Successfully Logined";
      }
    } catch (error) {
      throw error;
    }
  }

  async passwordUpdate(updateUserPassword) {
    try {
      await UserValidator.updatePasswordValid(updateUserPassword);
      let isUserIdExists = await userDAO.findOne(updateUserPassword.id);
      // console.log(isUserIdExists)
      if (isUserIdExists) {
        await userDAO.updatePassword(updateUserPassword);
        return "Password Successfully Changed";
      } else {
        throw new Error("Invaild User Id");
      }
    } catch (error) {
      throw error;
    }
  }
}

exports.UserService = UserService;
