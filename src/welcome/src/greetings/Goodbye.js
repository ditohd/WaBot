const Greeting = require("./Base");

module.exports = class Goodbye extends Greeting {
    constructor() {
        super();
        this.textTitle = "SELAMAT TINGGAL";
        this.textMessage = "SELAMAT TINGGAL DARI GRUP {server}";
        this.colorTitle = "#df0909";
    }
};