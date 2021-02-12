// import { UserDAO } from "./user.dao";
const { UserDAO } = require("./user.dao");
const userDAO = new UserDAO();

class UserValidator {

    static async validateStatusInput(userId, status) {
        // if (userId == null || userId == "") {
        //     throw new Error("userId cannot be empty");
        // }
        if (isNaN(userId)) {
            throw new Error("userId is not a number");
        }
        else if (isNaN(status)) {
            throw new Error("Status is not a number");
        }
    }

    static async validateNewUser(user) {
        if (user.name == null || user.name == "" || user.name.trim() == 0) {
            throw new Error("Name cannot be empty");
        }
        else if (user.email == null || user.email == "" || user.email.trim() == 0) {
            throw new Error("Email cannot be empty");
        }
        else if (user.password == null || user.password == "" || user.password.trim() == 0) {
            throw new Error("Password cannot be empty");
        }
        else if (user.password.length < 8) {
            throw new Error("password length should be least 8 characters");
        }
    }

    static async isvalidEmail(login) {
        if (login.email == null || login.email == "" || login.email.trim() == 0) {
            throw new Error("Email cannot be empty");
        }
        else if (login.password == null || login.password == "" || login.password.trim() == 0) {
            throw new Error("Password cannot be empty");
        }
    }

    static async updatePasswordValid(update) {
        if (update.newPassword == null || update.newPassword == "" || update.newPassword.trim() == 0) {
            throw new Error("Password cannot be empty");
        }
        else if (update.newPassword.length < 8) {
            throw new Error("password length should be least 8 characters");
        }
        else if (update.id == null || update.id == '') {
            throw new Error("ID cannot be empty");
        }
    }
    static async toCheckValidUserId(userId) {
        var result = await userDAO.findOne(userId);

        if (!result) {
            throw new Error("Please Check User ID");
        }
    }




}

exports.UserValidator = UserValidator;