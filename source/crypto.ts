import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import * as zlib from "zlib";

class Decoder {
    iv: Buffer;
    secret: Buffer;
    authTag: Buffer;

    constructor() {
        this.secret = Buffer.from(fs.readFileSync(path.resolve(__dirname, "../secret.key")).toString(), "hex"); //ugly...
        this.iv = fs.readFileSync(path.resolve(__dirname, "../iv.txt"));
        this.authTag = fs.readFileSync(path.resolve(__dirname, "../auth.txt"));
    }

    decrypt(filepath: fs.PathLike) {
        // const read = fs.readFileSync(filepath);
        // decipher.update(read);
        // fs.writeFileSync(path.resolve(__dirname + "/secret.unenc"), decipher.final());       

        const read = fs.createReadStream(filepath);
        const decipher = crypto.createDecipheriv('aes-256-gcm', this.secret, this.iv);
        decipher.setAuthTag(this.authTag);
        const unzip = zlib.createUnzip();
        const write = fs.createWriteStream(path.resolve(__dirname + "/secret.unenc"));

        read.pipe(decipher)
            .pipe(unzip)
            .pipe(write);
    }
}

export { Decoder };