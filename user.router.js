const { UserController } = require("./user.controller");
const { Response } = require("./response");

const userController = new UserController();

async function sendRequest(url, method) {
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
    }
}

const res = new Response();
let body = {};
let req = { body: body, query: {} };

// let results = sendRequest("users", "Get", req, res);

// req.body = { userId: 10, status: 0 };
let results = sendRequest("getActiveUsers", "GET", req, res);

// req.query.userId = 11;
// let results = sendRequest("getUser", "Get", req, res);

// req.body = { name: "kumar", email: "kumar@gmail.com", password: "chainsys", role: "" }
// let results = sendRequest("addUser", "POST", req, res);

results.then(data => {
    // console.table(res);
    console.log(res.toString());
});