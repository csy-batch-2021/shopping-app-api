const { UserService } = require("./user.service");

class UserController {

    constructor() {
        this.userService = new UserService()
    }

    async getUsersList(req, res) {
        try {
            let usersList = await this.userService.AllUsersList();
            // console.log(users);
            res.json(usersList);
        } catch (error) {
            res.setStatus(400).json({ message: error.message });
        }
    }

    async getAllactiveUsers(req, res) {
        try {
            let activeUserList = await this.userService.activeUsers();
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
            let newUser = await this.userService.registerUser(user);
            res.json(newUser);
        } catch (error) {
            res.setStatus(400).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            let loginDetails = req.body;
            let isValidUser = await this.userService.userLogin(loginDetails);
            res.json(isValidUser);
        } catch (error) {
            res.setStatus(400).json({ message: error.message });
        }
    }

    async userUpdatePassword(req, res) {
        try {
            let updateUserPassword = req.body;
            let updatePassword = await this.userService.passwordUpdate(updateUserPassword);
            res.json(updatePassword);
        } catch (error) {
            res.setStatus(400).json({ message: error.message });
        }
    }

    async updateUserStatus(req, res) {
        try {
            let userId = req.body.userId;
            let status = req.body.status;
            let updatestatus = await this.userService.changeUserStatus(userId, status);
            res.json(updatestatus)
        } catch (error) {
            res.setStatus(400).json({ message: error.message });
        }
    }

}

exports.UserController = UserController;