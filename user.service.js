const { UserValidator } = require("./user.validator");
const { UserDAO } = require("./user.Dao");

const userDAO = new UserDAO();

class UserService {

    async changeUserStatus(userId, status) {
        try {
            let result = await userDAO.findOne(userId);
            let isActive = result.active == 1;
            if (status == isActive) {
                throw new Error("Already record is " + (isActive ? "Active" : "Inactive"));
            } else {
                return await userDAO.updateStatus(result.id, !result.active);
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


    async AllUsersList() {
        try {
            let result = await userDAO.findAll();
            return result;
        } catch (error) {
            throw new Error("Invaild Table");
        }
    }

    async registerUser(user) {
        try {
            await UserValidator.validateNewUser(user);
            let exists = await userDAO.findByEmail(user.email);
            // console.log("Mail Exists", exists);
            if (exists) {
                throw new Error("Mail Already exists");
            }
            return await userDAO.save(user);
        } catch (error) {
            throw error;
        }
    }


    async userLogin(loginDetails) {
        try {
            await UserValidator.isvalidEmail(loginDetails);
            let usersList = await userDAO.findUser(loginDetails.email);
            let user = usersList.some(u => u.password == loginDetails.password);

            if (!user) {
                throw new Error("Invaild User Detail");
            } else {
                return "Successfully Logined"
            }
        } catch (error) {
            throw error;
        }
    }


    async passwordUpdate(updateUserPassword) {
        try {
            await UserValidator.updatePasswordValid(updateUserPassword);
            let isUserIdExists = await userDAO.findOne(updateUserPassword.id);
            if (!isUserIdExists) {
                throw new Error("Invaild User Id");
            } else {
                await userDAO.updatePassword(updateUserPassword);
                return "Password Successfully Changed"
            }
        } catch (error) {
            throw error;
        }
    }

}

exports.UserService = UserService;