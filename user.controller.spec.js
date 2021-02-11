const { UserController } = require("./user.controller");
const { Response } = require("./response");

const userController = new UserController();



function userRegistration() {
    const res = new Response();
    let body = { name: "rj", email: "kumae@gmail.com", password: "chainsys", role: "USER" };
    let req = { body: body, query: {} };

    userController.newUserRegistration(req, res).then(data => {
        // console.log(res);
        console.log(res.toString());
    })
}


function userLogin() {
    const res = new Response();
    let body = { email: "raj@gmail.com", password: "sschainsys" };
    let req = { body: body, query: {} };

    userController.loginUser(req, res).then(data => {
        console.log(res.toString());
    })

}


function getUsersList() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: {} };

    userController.getUsersList(req, res).then(data => {
        console.log(res.toString());
    })

}


function getUserById() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { id: 10 } };

    userController.findOneUser(req, res).then(data => {
        console.log(res.toString());
    })
}



function updateUserPassword() {
    const res = new Response();
    let body = { id: 1, newPassword: "sschainsys" };
    let req = { body: body, query: {} };

    userController.userUpdatePassword(req, res).then(data => {
        console.log(res.toString());
    })

}


function activeInactiveUser() {
    const res = new Response();
    let body = { userId: 1, status: 0 };
    let req = { body: body, query: {} };

    userController.updateUserStatus(req, res).then(data => {
        console.log(res.toString());
    })
}


// getUserById()
// getusersList();
// userRegistration();
// userLogin();
// updateUserPassword();
// activeInacitveUser();