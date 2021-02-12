const { UserController } = require("./user.controller");
const { Response } = require("./response");

const userController = new UserController();

class UserRouter {

    async  sendRequest(url, method, req, res) {
        if (url == "users") {
            if (method == "GET") {
                await userController.getUsersList(req, res);
            }
        } else if (url == "getActiveUsers") {
            if (method == "GET") {
                await userController.getAllactiveUsers(req, res);
            }
        } else if (url == "getUser") {
            if (method == "GET") {
                await userController.findOneUser(req, res);
            }
        } else if (url == "addUser") {
            if (method == "POST") {
                await userController.newUserRegistration(req, res);
            }
        } else if (url == "loginUser") {
            if (method == "POST") {
                await userController.loginUser(req, res);
            }
        }
    }
}

exports.UserRouter = UserRouter;
