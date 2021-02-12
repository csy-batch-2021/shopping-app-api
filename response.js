class Response {

    constructor(){
        this.data = null;
        
    this.statusCode = 200;
    }
    json(data) {
        this.data = JSON.stringify(data);
    }
    send(data) {
        this.data = data;
    }

    setStatus(statusCode = 200) {
        this.statusCode = statusCode;
        return this;
    }

    toString() {
        return { "statusCode": this.statusCode, data: this.data };
    }

}
exports.Response = Response;