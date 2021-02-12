const { UserService } = require("./user.service");

const userService = new UserService();

let user = { name: "ram", email: "ram@gmail.com", password: "chainsys", role: "ADMIN" };

let loginDetails = { email: "ram@gmail.com", password: "chainsys" };

let updateUserPassword = { id: 10, newPassword: "sschainsys" };

let userId = 10;

let status = 0;

// userService.activeUsers().then(res => {
//     console.table(res);
// }).catch(err => {
//     console.log(err);
// })

// userService.changeUserStatus(userId, status).then(res => {
//     // console.log(res);
//     return res;
// }).catch(err => {
//     // console.log(err)
//     throw err;
// });


// userService.registerUser(user).then(response => {
//     // console.log(response);
//     return "Successfully registered";
// })

// userService.findUserbyId(userId).then(res => {
//     // console.log(res);
//     return res;
// }).catch(err => {
//     // console.log(err.message);
//     throw err;
// });


// userService.AllUsersList().then(res => {
//     // console.table(res);
//     return res;
// }).catch(err => {
//     // console.log(err);
//     throw err;
// });


// userService.userLogin(loginDetails).then(res => {
//     // console.log(res);
//     return res;
// }).catch(err => {
//     // console.log(err);
//     throw err;
// });


// userService.passwordUpdate(updateUserPassword).then(res => {
//     console.log(res);
//     // return res;
// }).catch(err => {
//     console.log(err);
//     throw err;
// });
