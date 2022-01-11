"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
//import * as zlib from "zlib";
class Decoder {
    constructor() {
        this.secret = Buffer.from(fs.readFileSync(path.resolve(__dirname, "../secret.key")).toString(), "hex"); //ugly...
        this.iv = fs.readFileSync(path.resolve(__dirname, "../iv.txt"));
        this.authTag = fs.readFileSync(path.resolve(__dirname, "../auth.txt"));
    }
    decrypt(filepath) {
        try {
            const read = fs.readFileSync(filepath);
            const decipher = crypto.createDecipheriv('aes-256-gcm', this.secret, this.iv);
            decipher.setAuthTag(this.authTag);
            decipher.update(read);
            fs.writeFileSync(path.resolve(__dirname + "/secret.unenc"), decipher.final());
            // const read = fs.createReadStream(filepath);
            // const unzip = zlib.createUnzip();
            // const write = fs.createWriteStream(path.resolve(__dirname + "/secret.unenc"));
            // read.pipe(decipher)
            //     .pipe(unzip)
            //     .pipe(write);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.Decoder = Decoder;
//# sourceMappingURL=crypto.js.map