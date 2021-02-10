const { UserValidator } = require("./user.validator");
const { UserDAO } = require("./user.Dao");

const userDAO = new UserDAO();

let user = { name: "Raja", email: "raja@gmail.com", password: "chainsys", role: "" };

let login = { email: "guru@gmail.com", password: "Chainsys" };

let update = { id: 1, newPassword: "Chainsys" };

let user_id = 1;

try {
    userDAO.findOne(user_id).then(res => {
        if (!res) {
            throw new Error("No User Found");
        } else {
            console.table(res);
    //        return res;
        }
    }).catch(err => {
        throw err;
    });
} catch (error) {
    // console.log(error);
    throw error;
}


try {
    userDAO.findAll().then(res => {
        console.table(res);
        return res;
    }).catch(err => {
        throw new Error("Invaild Table");
    });
} catch (error) {
    // console.log(error);
    throw error;
}

async function registerUser(user) {

    await UserValidator.validateNewUser(user);
    let exists = await userDAO.findByEmail(user.email);
    // console.log("Mail Exists", exists);
    if (exists) {
        throw new Error("Mail Already exists");
    }
    // console.log(role)
    return await userDAO.save(user);
}

try {
    registerUser(user).then(response => {
        console.log(response);
        return "Successfully registered";
        // console.log("Successfully registered");
    }).catch(err => {
        console.error(err);
        console.log("User Registration Error Message:", err.message);
        throw err;
    });
}
catch (error) {
    console.error(err);
    throw error;
}

async function UserLogin(login) {
    await UserValidator.isvalidEmail(login);
    let usersList = await userDAO.findUser(login.email);
    let user = usersList.some(u => u.password == login.password);

    if (!user) {
        throw new Error("Invaild User Detail");
    } else {
        return "Successfully Logined"
    }
}

try {
    UserLogin(login).then(res => {
        console.log(res);
        return res;
    }).catch(err => {
        // console.log(err);
        throw err;
    });
}
catch (error) {
    // console.log(error);
    throw error;
}

async function passwordUpdate(update) {
    await UserValidator.updatePasswordValid(update);

    let rowsUpdated = await userDAO.updatePassword(update);
    console.log(rowsUpdated);
    if (rowsUpdated == 0) {
        throw new Error("Invaild User Id");
    } else {
        return "Password Successfully Changed"
    }
}

try {
    passwordUpdate(update).then(res => {
        console.log(res);
        return res;
    }).catch(err => {
        throw err;
    })
} catch (error) {
    console.log(error);
    throw error;
}

