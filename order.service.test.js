const { OrderService } = require("./order.service");
const orderService = new OrderService();

let product = { brandName: "Apple", name: "iphone 12 pro", ram: 3, price: 10000 };

orderService.addOrder(product).then(response => {
    console.log(response);

}).catch(err => {
    console.log(err);

});