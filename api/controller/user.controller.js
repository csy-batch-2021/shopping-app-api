const { UserService } = require("../services/user.service");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUsersList(req, res) {
    try {
      let usersList = await UserService.allUsersList();
      res.json(usersList);
    } catch (error) {
      res.setStatus(400).json({ message: error.message });
    }
  }

  async getAllActiveUsers(req, res) {
    try {
      let activeUserList = await UserService.activeUsers();
      res.json(activeUserList);
    } catch (error) {
      res.setStatus(400).json({ message: error.message });
    }
  }

  async findOneUser(req, res) {
    try {
      let userId = req.query.id;

      let user = await this.userService.findUserbyId(userId);
      res.json(user);
    } catch (error) {
      res.setStatus(400).json({ message: error.message });
    }
  }

  async newUserRegistration(req, res) {
    try {
      let user = req.body;
      console.log(user);
      let newUser = await UserService.registerUser(user);
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      let loginDetails = req.body;
      let isValidUser = await UserService.userLogin(loginDetails);
      res.json(isValidUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      let userId = req.body.loggedInUserId;
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;
      let updatePassword = await UserService.passwordUpdate(
        userId,
        oldPassword,
        newPassword
      );
      res.json(updatePassword);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async wallet(req, res) {
    try {
      let userId = req.body.loggedInUserId;
      let walletBals = await UserService.walletBalance(userId);
      res.json(walletBals);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUserStatus(req, res) {
    try {
      let userId = req.body.userId;
      let status = req.body.status;
      let updatestatus = await UserService.changeUserStatus(userId, status);
      res.json(updatestatus);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateBalance(req, res) {
    try {
      let balance = req.body.balance;
      let userId = req.body.userId;
      let updatebalance = await UserService.addBalance(balance, userId);
      res.json(updatebalance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async userLists(req, res) {
    try {
      let userLists = await UserService.userLists();
      res.json(userLists);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

exports.UserController = UserController;
