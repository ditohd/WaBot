const Greeting = require("./Base");

module.exports = class Welcome extends Greeting {
    constructor() {
        super();
        this.textTitle = "SELAMAT DATANG";
        this.textMessage = "SELAMAT DATANG DI GRUP {server}";
        this.colorTitle = "#03A9F4";
    }
};